import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";

export default (sequelize) => {
	sequelize.define(
		"User",
		{
			username: {
				allowNull: false,
				type: DataTypes.STRING,
				unique: true,
				validate: {
					isAlphanumeric: {
						args: true,
						msg: "The username can contain only alphabets and numbers",
					},
					len: {
						args: [5, 20],
						msg: "Username must be between 5 and 20",
					},
				},
			},
			email: {
				allowNull: false,
				type: DataTypes.STRING,
				unique: true,
				validate: {
					isEmail: {
						args: true,
						msg: "Invalid email",
					},
				},
			},
			password: {
				allowNull: false,
				type: DataTypes.STRING,
				validate: {
					len: {
						args: [5, 20],
						msg: "Password must be between 5 and 20 characters",
					},
				},
			},
		},
		{
			hooks: {
				afterValidate: async (user) => {
					// eslint-disable-next-line
					user.password = await bcrypt.hash(user.password, 5);
				},
			},
		}
	);
};
