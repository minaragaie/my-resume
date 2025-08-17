import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  console.log("[v0] API Route called - Contact form submission")
  console.log("[v0] Environment check - RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY)
  console.log("[v0] RESEND_API_KEY value:", process.env.RESEND_API_KEY?.substring(0, 10) + "...")

  try {
    const { name, email, message } = await request.json()
    console.log("[v0] Request data received:", { name, email, messageLength: message?.length })

    // Validate required fields
    if (!name || !email || !message) {
      console.log("[v0] Validation failed - missing fields:", { name: !!name, email: !!email, message: !!message })
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    console.log("[v0] Validation passed - attempting to send email")

    try {
      const emailData = await resend.emails.send({
        from: "Contact Form <noreply@yourdomain.com>", // Replace with your verified domain
        to: ["your-email@gmail.com"], // Replace with your actual email
        subject: `New Contact Form Message from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #007acc;">New Contact Form Submission</h2>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Message:</strong></p>
              <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
                ${message.replace(/\n/g, "<br>")}
              </div>
            </div>
            <p style="color: #666; font-size: 12px;">
              This message was sent from your portfolio contact form.
            </p>
          </div>
        `,
        reply_to: email,
      })

      console.log("[v0] Email sent successfully:", emailData)
      console.log("[v0] Email ID:", emailData.data?.id)
      return NextResponse.json({ message: "Message sent successfully" }, { status: 200 })
    } catch (emailError) {
      console.error("[v0] Email sending failed:", emailError)
      console.error("[v0] Error details:", {
        message: emailError.message,
        name: emailError.name,
        stack: emailError.stack,
      })
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }
  } catch (error) {
    console.error("[v0] Contact form error:", error)
    console.error("[v0] Request parsing failed:", {
      message: error.message,
      name: error.name,
    })
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
