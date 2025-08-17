import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  
  try {
    const { name, email, message } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    console.log("[v0] Validation passed - attempting to send email")

    try {
      const emailData = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'minaragaie@hotmail.com',
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
        replyTo: email,
      })
      return NextResponse.json({ message: "Message sent successfully" }, { status: 200 })
    } catch (emailError: any) {
      console.error("[v0] Email sending failed:", emailError)
     
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }
  } catch (error:any) {

    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
