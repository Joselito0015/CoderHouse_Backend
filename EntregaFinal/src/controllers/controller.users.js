const UserDao = require("../dao/class/UserDao");
const User = new UserDao();
const { sendEmail } = require("../utils/sendEmail.js");
const getAllUsers = async (req, res) => {
	try {
		const users = await User.find({}, "first_name last_name email rol");
		res.status(200).json(users);
	} catch (error) {
		res.status(500).send("Error al obtener usuarios");
	}
};

const deleteInactiveUsers = async (req, res) => {
	try {
		const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);
		const inactiveUsers = await User.find({ lastLogin: { $lt: twoDaysAgo } });

		inactiveUsers.forEach(async (user) => {
			await User.findByIdAndDelete(user._id);
			sendEmail(
				user.email,
				"Cuenta Eliminada",
				"Su cuenta ha sido eliminada por inactividad."
			);
		});

		res.status(200).send("Usuarios inactivos eliminados y correos enviados");
	} catch (error) {
		res.status(500).send("Error al eliminar usuarios inactivos");
	}
};

const updateUserRole = async (req, res) => {
	try {
		const { id } = req.params;
		const { rol } = req.body;
		const user = await User.findByIdAndUpdate(id, { rol }, { new: true });
		res.status(200).json(user);
	} catch (error) {
		res.status(500).send("Error al actualizar el rol del usuario");
	}
};

const deleteUser = async (req, res) => {
	try {
		const { id } = req.params;
		await User.findByIdAndDelete(id);
		res.status(200).send("Usuario eliminado correctamente");
	} catch (error) {
		res.status(500).send("Error al eliminar usuario");
	}
};

module.exports = {
	getAllUsers,
	deleteInactiveUsers,
	updateUserRole,
	deleteUser,
};
