import {consumeMessages} from "@gothalo/shared"
import transporter from "./nodemailer.js"

interface Sende{
    email:string
}

const receiveemail=async()=>{
    

    await consumeMessages<Sende>("email-ex","email-123","email-que",async(data)=>{

const mailoption = {
    from: process.env.SENDER_EMAIL,
    to: data.email,
    subject: "Welcome to Monato",
    // text: `Welcome to Blog app.Your account has been created with email Id:${user.email}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
    <h1 style="color: #4CAF50;">Welcome to Gothalo AI!</h1>
    <p style="font-size: 16px;">
      Your account has been created with email Id: 
      <strong style="color: #000;">${data.email}</strong>
    </p>
    <p style="font-size: 14px; color: #777;">
      We're excited to have you onboard. Get started by using the agents!
    </p>`,
  };
  await transporter.sendMail(mailoption)
    })
}

export {receiveemail}