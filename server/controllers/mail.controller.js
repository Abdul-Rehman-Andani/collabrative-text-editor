import { ErrorHandler } from "../utils/error.js";
import { sendMail } from "../config/nodemailer.js";

export const sendInvite = async (req, res, next) => {
  const { user, link } = req.body;
  try {
    sendMail(user, "Invite Link", `This is your link `, `<a href=${link}>${link}</a>`);
    return res.status(200).json({ message: "invite sent" });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
