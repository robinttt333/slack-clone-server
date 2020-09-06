import jwt from "jsonwebtoken";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import models from "./models";
import typeDefs from "./schemas";
import resolvers from "./resolvers";
import refreshTokens from "./auth";

const SECRET = "dklfjlksdjlfkjsdlkfsdreow";
const SECRET2 = "dklfjdfkdghsjsdgfdslksdjlfkjsdlkfsdreow";

const addUser = async (req, res, next) => {
	const token = req.headers["x-token"];
	if (token) {
		try {
			const { user } = jwt.verify(token, SECRET);
			req.user = user;
		} catch (err) {
			const refreshToken = req.headers["x-refresh-token"];
			const newTokens = await refreshTokens(
				token,
				refreshToken,
				models,
				SECRET,
				SECRET2
			);
			if (newTokens.token && newTokens.refreshToken) {
				res.set("Access-Control-Expose-Headers", "x-token, x-refresh-token");
				res.set("x-token", newTokens.token);
				res.set("x-refresh-token", newTokens.refreshToken);
			}
			req.user = newTokens.user;
		}
	}
	next();
};
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => {
		return {
			models,
			SECRET,
			user: req.user,
			SECRET2,
		};
	},
});

const app = express();
app.use(addUser);
server.applyMiddleware({ app });

models.sequelize.sync().then(() => {
	app.listen({ port: 4000 }, () => {
		console.log(
			`🚀 Server ready at http://localhost:4000${server.graphqlPath}`
		);
	});
});
