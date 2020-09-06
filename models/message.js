import { DataTypes } from "sequelize";

export default (sequelize) => {
	sequelize.define("Message", {
		text: {
			allowNull: false,
			type: DataTypes.STRING,
			unique: true,
		},
	});
};
