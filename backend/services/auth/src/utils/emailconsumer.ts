import {consumeMessages} from "@gothalo/shared"
import transporter from "./nodemailer.js"

interface Sende{
    email:string
}

const receiveemail=async()=>{
    

    await consumeMessages<Sende>("email-ex","email123","email-que",async(data)=>{

const mailoption = {
  from: process.env.SENDER_EMAIL,
  to: data.email,
  subject: "Welcome to Gothalo AI 🚀 — Your Multi-Agent Workspace is Ready",
  html: `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body style="margin:0; padding:0; background-color:#f4f5f7; font-family: 'Segoe UI', Arial, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f5f7; padding: 32px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.06);">

            <!-- Header -->
            <tr>
              <td style="background: linear-gradient(135deg,#6366f1,#8b5cf6,#ec4899); padding: 40px 32px; text-align:center;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                  <tr>
                    <td style="background:#ffffff; width:56px; height:56px; border-radius:14px; text-align:center; vertical-align:middle; font-size:26px;">
                      🤖
                    </td>
                  </tr>
                </table>
                <h1 style="color:#ffffff; font-size:26px; margin: 18px 0 6px; font-weight:700;">
                  Gothalo AI
                </h1>
                <p style="color:#ede9fe; font-size:14px; margin:0; letter-spacing:0.5px;">
                  Your all-in-one multi-agent workspace
                </p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding: 36px 32px 8px;">
                <h2 style="color:#111827; font-size:20px; margin:0 0 12px;">Welcome aboard! 🎉</h2>
                <p style="color:#4b5563; font-size:15px; line-height:1.6; margin:0 0 8px;">
                  Your account has been created with email:
                </p>
                <p style="background:#f3f4f6; border-radius:8px; padding:10px 14px; font-size:14px; color:#111827; font-weight:600; display:inline-block; margin:4px 0 20px;">
                  ${data.email}
                </p>
                <p style="color:#4b5563; font-size:15px; line-height:1.6; margin:0 0 24px;">
                  You now have access to a full team of specialized AI agents, ready to help you think, create, and get things done faster.
                </p>
              </td>
            </tr>

            <!-- Agent Grid -->
            <tr>
              <td style="padding: 0 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td width="50%" style="padding:6px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb; border:1px solid #eef0f3; border-radius:12px;">
                        <tr>
                          <td style="padding:16px;">
                            <div style="font-size:22px;">💬</div>
                            <div style="font-size:14px; font-weight:700; color:#111827; margin-top:6px;">Chat Agent</div>
                            <div style="font-size:12px; color:#6b7280; margin-top:2px;">Conversational assistant for any task</div>
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td width="50%" style="padding:6px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb; border:1px solid #eef0f3; border-radius:12px;">
                        <tr>
                          <td style="padding:16px;">
                            <div style="font-size:22px;">🔍</div>
                            <div style="font-size:14px; font-weight:700; color:#111827; margin-top:6px;">Search Agent</div>
                            <div style="font-size:12px; color:#6b7280; margin-top:2px;">Real-time web research & answers</div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td width="50%" style="padding:6px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb; border:1px solid #eef0f3; border-radius:12px;">
                        <tr>
                          <td style="padding:16px;">
                            <div style="font-size:22px;">📊</div>
                            <div style="font-size:14px; font-weight:700; color:#111827; margin-top:6px;">PPT Agent</div>
                            <div style="font-size:12px; color:#6b7280; margin-top:2px;">Generates polished presentations</div>
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td width="50%" style="padding:6px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb; border:1px solid #eef0f3; border-radius:12px;">
                        <tr>
                          <td style="padding:16px;">
                            <div style="font-size:22px;">📄</div>
                            <div style="font-size:14px; font-weight:700; color:#111827; margin-top:6px;">PDF Agent</div>
                            <div style="font-size:12px; color:#6b7280; margin-top:2px;">Reads, edits & creates documents</div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td width="50%" style="padding:6px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb; border:1px solid #eef0f3; border-radius:12px;">
                        <tr>
                          <td style="padding:16px;">
                            <div style="font-size:22px;">👁️</div>
                            <div style="font-size:14px; font-weight:700; color:#111827; margin-top:6px;">Vision Agent</div>
                            <div style="font-size:12px; color:#6b7280; margin-top:2px;">Understands & analyzes images</div>
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td width="50%" style="padding:6px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#6366f1,#8b5cf6); border-radius:12px;">
                        <tr>
                          <td style="padding:16px;">
                            <div style="font-size:22px;">✨</div>
                            <div style="font-size:14px; font-weight:700; color:#ffffff; margin-top:6px;">More Coming</div>
                            <div style="font-size:12px; color:#ede9fe; margin-top:2px;">New agents added regularly</div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- CTA -->
            <tr>
              <td style="padding: 28px 32px 8px; text-align:center;">
                <a href="https://gothalo.ai/dashboard" target="_blank"
                   style="display:inline-block; background: linear-gradient(135deg,#6366f1,#8b5cf6); color:#ffffff; text-decoration:none; font-size:15px; font-weight:600; padding:14px 36px; border-radius:10px;">
                  Discover agents →
                </a>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding: 32px 32px 36px; text-align:center; border-top:1px solid #f0f0f2; margin-top:20px;">
                <p style="font-size:12px; color:#9ca3af; margin:20px 0 4px;">
                  Need help? Just reply to this email — we're happy to assist.
                </p>
                <p style="font-size:12px; color:#c1c5cb; margin:0;">
                  © ${new Date().getFullYear()} Gothalo AI. All rights reserved.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `,
};


  console.log('Email message received for:', data.email)
  await transporter.sendMail(mailoption)
    })
}

export {receiveemail}