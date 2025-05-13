import axios from "axios"
import { v4 as uuidv4 } from "uuid"

// MPesa API URLs
const MPESA_BASE_URL =
  process.env.MPESA_ENV === "production" ? "https://api.safaricom.co.ke" : "https://sandbox.safaricom.co.ke"

const MPESA_AUTH_URL = `${MPESA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials`
const MPESA_STK_PUSH_URL = `${MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest`

// MPesa credentials
const CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY!
const CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET!
const SHORTCODE = process.env.MPESA_SHORTCODE!
const PASSKEY = process.env.MPESA_PASSKEY!
const CALLBACK_URL = process.env.MPESA_CALLBACK_URL!

// Get OAuth token
async function getAccessToken() {
  try {
    const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString("base64")
    const response = await axios.get(MPESA_AUTH_URL, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    })
    return response.data.access_token
  } catch (error) {
    console.error("Error getting MPesa access token:", error)
    throw new Error("Failed to get MPesa access token")
  }
}

// Generate timestamp in the format YYYYMMDDHHmmss
function getTimestamp() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  const hours = String(now.getHours()).padStart(2, "0")
  const minutes = String(now.getMinutes()).padStart(2, "0")
  const seconds = String(now.getSeconds()).padStart(2, "0")

  return `${year}${month}${day}${hours}${minutes}${seconds}`
}

// Generate password for STK Push
function getPassword(timestamp: string) {
  return Buffer.from(`${SHORTCODE}${PASSKEY}${timestamp}`).toString("base64")
}

// Initiate STK Push
export async function initiateSTKPush(
  phoneNumber: string,
  amount: number,
  accountReference: string,
  transactionDesc: string,
) {
  try {
    // Format phone number (remove leading 0 or +254 and add 254)
    let formattedPhone = phoneNumber.replace(/^(0|\+254)/, "")
    if (!formattedPhone.startsWith("254")) {
      formattedPhone = `254${formattedPhone}`
    }

    const timestamp = getTimestamp()
    const password = getPassword(timestamp)
    const token = await getAccessToken()

    const requestBody = {
      BusinessShortCode: SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: formattedPhone,
      PartyB: SHORTCODE,
      PhoneNumber: formattedPhone,
      CallBackURL: CALLBACK_URL,
      AccountReference: accountReference || "ACCGK Payment",
      TransactionDesc: transactionDesc || "Payment for services",
    }

    const response = await axios.post(MPESA_STK_PUSH_URL, requestBody, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    return {
      success: true,
      data: response.data,
      checkoutRequestID: response.data.CheckoutRequestID,
    }
  } catch (error: any) {
    console.error("Error initiating MPesa STK Push:", error.response?.data || error.message)
    return {
      success: false,
      error: error.response?.data || error.message,
    }
  }
}

// Process STK Push callback
export function processSTKPushCallback(callbackData: any) {
  try {
    const resultCode = callbackData.Body.stkCallback.ResultCode
    const resultDesc = callbackData.Body.stkCallback.ResultDesc
    const checkoutRequestID = callbackData.Body.stkCallback.CheckoutRequestID

    if (resultCode === 0) {
      // Payment successful
      const callbackMetadata = callbackData.Body.stkCallback.CallbackMetadata.Item
      const amount = callbackMetadata.find((item: any) => item.Name === "Amount")?.Value
      const mpesaReceiptNumber = callbackMetadata.find((item: any) => item.Name === "MpesaReceiptNumber")?.Value
      const transactionDate = callbackMetadata.find((item: any) => item.Name === "TransactionDate")?.Value
      const phoneNumber = callbackMetadata.find((item: any) => item.Name === "PhoneNumber")?.Value

      return {
        success: true,
        checkoutRequestID,
        amount,
        mpesaReceiptNumber,
        transactionDate,
        phoneNumber,
      }
    } else {
      // Payment failed
      return {
        success: false,
        checkoutRequestID,
        resultCode,
        resultDesc,
      }
    }
  } catch (error) {
    console.error("Error processing MPesa callback:", error)
    return {
      success: false,
      error: "Failed to process callback data",
    }
  }
}

// Generate a payment reference
export function generatePaymentReference(prefix = "ACCGK") {
  const randomPart = uuidv4().substring(0, 8).toUpperCase()
  return `${prefix}-${randomPart}`
}
