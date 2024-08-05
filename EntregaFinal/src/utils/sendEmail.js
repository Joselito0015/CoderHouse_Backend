const nodemailer = require("nodemailer");
const { config } = require("../config"); // Asume que tienes un archivo de configuración con las credenciales

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: config.emailUser, // Tu correo electrónico
		pass: config.emailPassword, // Tu contraseña
	},
});

const sendEmail = (to, subject, text) => {
	const mailOptions = {
		from: config.emailUser,
		to: to,
		subject: subject,
		text: text,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error);
		}
		console.log("Email enviado: " + info.response);
	});
};

module.exports = { sendEmail };
