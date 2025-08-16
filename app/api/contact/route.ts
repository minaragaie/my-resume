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

      console.log("Email sent successfully:", emailData)
      return NextResponse.json({ message: "Message sent successfully" }, { status: 200 })
    } catch (emailError) {
      console.error("Email sending failed:", emailError)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
