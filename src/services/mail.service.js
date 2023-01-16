import hbs from "nodemailer-express-handlebars";
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: "cscsmadagascar.mg",
  port: 587,
  secure: false,
  auth: {
    user: "notif@cscsmadagascar.mg",
    pass: "Qnh69t?8",
  },
  tls: {
    rejectUnauthorized: false,
    ciphers: "SSLv3",
  },
});

let options = {
  viewEngine: {
    extname: ".hbs", // handlebars extension
    layoutsDir: "src/views/mail/", // location of handlebars templates
    defaultLayout: "", // name of main template
    partialsDir: "src/views/mail/partials/", // location of your subtemplates aka. header, footer etc
  },
  viewPath: "src/views/mail/",
  extName: ".hbs",
};

const from = "Garagenaka <notif@cscsmadagascar.mg>";

transporter.use("compile", hbs(options));

export const confirmRegistrationMailSvc = (user) => {
  console.log(user.email);
  const mailOptions = {
    from,
    to: user.email,
    subject: "Confirmation de candidature",
    template: "signup-confirmation",
    context: {
      data: Date.now(),
    },
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
