// modules/mpesa.ts
import fetch from "node-fetch";

type MpesaEnv = "sandbox" | "production";

const ENV: MpesaEnv = (process.env.MPESA_ENV as MpesaEnv) || "sandbox";

const ENDPOINTS = {
  sandbox: {
    oauth: "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    stkPush: "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
  },
  production: {
    oauth: "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    stkPush: "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
  },
}[ENV];

const CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY!;
const CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET!;
const MPESA_SHORTCODE = process.env.MPESA_SHORTCODE!;
const MPESA_PASSKEY = process.env.MPESA_PASSKEY!;
const CALLBACK_BASE = process.env.MPESA_CALLBACK_BASE_URL!;

if (!CONSUMER_KEY || !CONSUMER_SECRET || !MPESA_SHORTCODE || !MPESA_PASSKEY || !CALLBACK_BASE) {
  // For safety, don't crash the server at import time in dev if env not set.
  // But production must set them.
  console.warn("MPESA env variables not fully set. Ensure MPESA_CONSUMER_KEY, MPESA_CONSUMER_SECRET, MPESA_SHORTCODE, MPESA_PASSKEY, MPESA_CALLBACK_BASE_URL are set.");
}

let cachedToken: { token: string; expiresAt: number } | null = null;

/**
 * Get OAuth token from Daraja, with simple in-memory caching.
 */
export async function getAccessToken(): Promise<string> {
  const now = Date.now();
  if (cachedToken && cachedToken.expiresAt > now + 5000) {
    return cachedToken.token;
  }

  const creds = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString("base64");
  const res = await fetch(ENDPOINTS.oauth, {
    method: "GET",
    headers: {
      Authorization: `Basic ${creds}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to get access token: ${res.status} ${text}`);
  }

  const json = await res.json();
  // API returns { access_token, expires_in }
  const expiresIn = json.expires_in ? Number(json.expires_in) : 3600;
  cachedToken = {
    token: json.access_token,
    expiresAt: Date.now() + expiresIn * 1000,
  };
  return cachedToken.token;
}

/**
 * Create the STK push password per Daraja: Base64(shortcode + passkey + timestamp)
 */
function generateStkPassword(timestamp: string) {
  const str = `${MPESA_SHORTCODE}${MPESA_PASSKEY}${timestamp}`;
  return Buffer.from(str).toString("base64");
}

/**
 * Returns timestamp in Daraja required format: YYYYMMDDHHmmss
 */
function getDarajaTimestamp() {
  const d = new Date();
  const YYYY = d.getFullYear();
  const MM = String(d.getMonth() + 1).padStart(2, "0");
  const DD = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  return `${YYYY}${MM}${DD}${hh}${mm}${ss}`;
}

export interface StkPushOptions {
  amount: number;
  phone: string; // must be in 2547XXXXXXXX format
  accountReference?: string;
  transactionDesc?: string;
}

/**
 * Initiates STK Push via Daraja STK push endpoint.
 * Returns the raw Daraja response and the CheckoutRequestID (if available).
 */
export async function requestStkPush(opts: StkPushOptions) {
  const token = await getAccessToken();
  const timestamp = getDarajaTimestamp();
  const password = generateStkPassword(timestamp);

  const body = {
    BusinessShortCode: MPESA_SHORTCODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: opts.amount,
    PartyA: opts.phone,
    PartyB: MPESA_SHORTCODE,
    PhoneNumber: opts.phone,
    CallBackURL: `${CALLBACK_BASE}`,
    AccountReference: opts.accountReference || "Account",
    TransactionDesc: opts.transactionDesc || "Payment",
  };

  const res = await fetch(ENDPOINTS.stkPush, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(`STK push failed: ${res.status} ${JSON.stringify(json)}`);
  }

  // Expected response contains CheckoutRequestID and ResponseDescription
  return json;
}
