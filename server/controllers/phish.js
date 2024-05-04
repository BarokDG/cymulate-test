import nodemailer from "nodemailer";
import { Phish } from "../models/Phish.js";

export async function getAllPhishes(_, res, next) {
  try {
    const phishes = await Phish.find();

    res.json({
      count: phishes.length,
      data: phishes,
    });
  } catch (error) {
    next(error);
  }
}

export async function getPhishById(req, res, next) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({});
  }

  try {
    const phish = await Phish.findById(id);

    return res.json({ phish });
  } catch (error) {
    next(error);
  }
}

export async function phishEmployee(req, res, next) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({});
  }

  try {
    const phish = new Phish({
      recipient: email,
      content: "Hello child",
      status: "Pending",
    });

    await phish.save();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: "Hello",
      html: `<a href="http://localhost:5000/phishes/clicked/${phish._id}" target="_blank">Click here</a>`,
    });

    res.status(201).json({});
  } catch (error) {
    next(error);
  }
}

export async function updatePhishStatus(req, res, next) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({});
  }

  try {
    await Phish.findByIdAndUpdate(id, { status: "Successful" });
    res.json({});
  } catch (error) {
    next(error);
  }
}
