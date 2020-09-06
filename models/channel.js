import { DataTypes } from "sequelize";

export default (sequelize) => {
	sequelize.define("Channel", {
		name: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		public: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
	});
};
