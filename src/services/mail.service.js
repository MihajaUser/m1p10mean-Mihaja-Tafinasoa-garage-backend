import hbs from "nodemailer-express-handlebars";
import nodemailer from "nodemailer";

// _Q2878cyp
const transporter = nodemailer.createTransport({
  host: "cscsmadagascar.mg",
  port: 587,
  secure: false,
  auth: {
    user: "custom@cscsmadagascar.mg",
    pass: "_Q2878cyp",
    // pass: "Qnh69t?8",
  },
  tls: {
    rejectUnauthorized: false,
    ciphers: "SSLv3",
  },
});

const options = {
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

export const confirmRegistrationMailSvc = (customer) => {
  // console.log(customer);
  const mailOptions = {
    from,
    to: customer.email,
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
