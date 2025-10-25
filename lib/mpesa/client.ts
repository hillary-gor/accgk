import axios from "axios";

/**
 * Base URL (auto switch between sandbox and live)
 */
const DARAJA_BASE_URL =
  process.env.MPESA_ENV === "sandbox"
    ? "https://sandbox.safaricom.co.ke"
    : "https://api.safaricom.co.ke";

/**
 * Generate M-PESA access token
 */
async function getAccessToken(): Promise<string> {
  const key = process.env.MPESA_CONSUMER_KEY!;
  const secret = process.env.MPESA_CONSUMER_SECRET!;
  const auth = Buffer.from(`${key}:${secret}`).toString("base64");

  const res = await axios.get<{ access_token: string }>(
    `${DARAJA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials`,
    {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    }
  );

  return res.data.access_token;
}

/**
 * Interfaces
 */
export interface StkPushRequestParams {
  phone: string;
  amount: number;
  accountReference: string;
  transactionDesc?: string;
}

export interface StkPushResponse {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResponseCode: string;
  ResponseDescription: string;
  CustomerMessage: string;
}

export interface StkPushErrorResponse {
  errorCode?: string;
  errorMessage?: string;
  requestId?: string;
}

/**
 * STK Push Request
 */
export async function stkPushRequest({
  phone,
  amount,
  accountReference,
  transactionDesc = "Caregiver Application Payment",
}: StkPushRequestParams): Promise<StkPushResponse> {
  try {
    const token = await getAccessToken();

    // Format timestamp correctly (yyyyMMddHHmmss)
    const timestamp = new Date()
      .toISOString()
      .replace(/[-T:.Z]/g, "")
      .slice(0, 14);

    const shortcode = process.env.MPESA_SHORTCODE!;
    const passkey = process.env.MPESA_PASSKEY!;
    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString(
      "base64"
    );

    // Validate callback URL
    const callbackUrl = process.env.MPESA_CALLBACK_URL!;
    if (!callbackUrl || !callbackUrl.startsWith("https://")) {
      throw new Error(
        `Invalid MPESA_CALLBACK_URL. Must be HTTPS. Current: ${callbackUrl}`
      );
    }

    console.log("Using callback URL:", callbackUrl);

    const payload = {
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: shortcode,
      PhoneNumber: phone,
      CallBackURL: callbackUrl,
      AccountReference: accountReference,
      TransactionDesc: transactionDesc,
    };

    // Ensure correct endpoint path (includes /mpesa/)
    const res = await axios.post<StkPushResponse>(
      `${DARAJA_BASE_URL}/mpesa/stkpush/v1/processrequest`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.data.ResponseCode) {
      throw new Error("Invalid Safaricom API response");
    }

    return res.data;
  } catch (error) {
    const isAxiosError = (
      err: unknown
    ): err is { response?: { data?: StkPushErrorResponse } } =>
      typeof err === "object" && err !== null && "response" in err;

    if (isAxiosError(error)) {
      const apiError = error.response?.data;
      console.error("STK Push API Error:", apiError || error);
      throw new Error(apiError?.errorMessage || "Failed to initiate STK push");
    }

    console.error("Unexpected Error:", error);
    throw new Error("Failed to initiate STK push");
  }
}
