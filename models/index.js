import { Sequelize } from "sequelize";
import setupAssociations from "./setupAssociations";

const sequelize = new Sequelize("slack", "postgres", "postgres", {
	host: "localhost",
	dialect: "postgres",
	define: {
		underscored: true,
	},
});

const modelsArr = [
	require("./user").default,
	require("./message").default,
	require("./channel").default,
	require("./team").default,
	require("./member").default,
];
modelsArr.forEach((model) => model(sequelize));
setupAssociations(sequelize);

const models = { ...sequelize.models, sequelize };
export default models;
