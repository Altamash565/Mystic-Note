import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";

import { Apiresponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<Apiresponse> {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: 'Mystic-Note | Verification code',
      react: VerificationEmail({username, otp: verifyCode}),
    });
    return { success: true, message: "Verification email send successfully" };
  } catch (emailError) {
    console.error("Error sending verification email", emailError);
    // Fallback for development if RESEND_API_KEY is missing
    console.log(`[DEVELOPMENT] Verification code for ${username} is: ${verifyCode}`);
    return { success: true, message: "Verification email failed, but code logged to console for development." };
  }
}
