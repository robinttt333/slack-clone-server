export default {
	Mutation: {
		createMessage: async (parent, args, { models }) => {
			try {
				await models.Message.create(args);
				return true;
			} catch (err) {
				console.log(err);
				return false;
			}
		},
	},
};
