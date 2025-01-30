import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendMail = async (user, subject, text, link) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: user, 
      subject: subject,
      text: text,
      html: `<b>${link}</b>`
    });

    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
