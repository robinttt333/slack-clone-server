import { DataTypes } from "sequelize";

export default (sequelize) => {
	sequelize.define("Team", {
		name: {
			allowNull: false,
			type: DataTypes.STRING,
			unique: true,
		},
	});
};
