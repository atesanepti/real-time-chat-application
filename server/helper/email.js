import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "epti060@gmail.com",
    pass: "dowtaevuxpoxgtpx",
  },
});

export const sendEmail = async (data) => {
  try {
    const info = await transporter.sendMail(data);
    console.log(info.response);
  } catch (error) {
    throw error;
  }
};
