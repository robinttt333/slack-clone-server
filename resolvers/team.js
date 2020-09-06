import formatErrors from "../formatErrors";
import requiresAuth from "../permissions";

export default {
	Mutation: {
		createTeam: requiresAuth.createResolver(
			async (parent, args, { models, user }) => {
				try {
					const obj = { ...args, owner: user.id };
					const res = await models.sequelize.transaction(async () => {
						const team = await models.Team.create(obj);
						await models.Channel.create({ name: "general", teamId: team.id });
						await models.Channel.create({ name: "random", teamId: team.id });
						return team;
					});
					return { ok: true, team: res };
				} catch (err) {
					console.log(err);
					console.log(formatErrors(err));
					return {
						ok: false,
						errors: formatErrors(err),
					};
				}
			}
		),

		addMember: requiresAuth.createResolver(
			async (parent, { email, teamId }, { models, user }) => {
				try {
					const teamPromise = models.Team.findOne({ where: { id: teamId } });
					const userToAddPromise = models.User.findOne({ where: { email } });
					const [team, userToAdd] = await Promise.all([
						teamPromise,
						userToAddPromise,
					]);
					if (user.id !== team.owner) {
						return {
							ok: false,
							errors: [
								{
									path: "email",
									message: "You cannot add members to team",
								},
							],
						};
					}
					if (!userToAdd) {
						return {
							ok: false,
							errors: [
								{
									path: "email",
									message: "No user with this email exists",
								},
							],
						};
					}
					await models.Member.create({
						userId: userToAdd.id,
						teamId,
					});
					return {
						ok: true,
					};
				} catch (err) {
					console.log(err);
					console.log(formatErrors(err));
					return {
						ok: false,
						errors: formatErrors(err),
					};
				}
			}
		),
	},
	Query: {
		allTeams: requiresAuth.createResolver((parent, args, { models, user }) =>
			models.Team.findAll({ where: { owner: user.id } }, { raw: true })
		),
		inviteTeams: requiresAuth.createResolver(
			async (parent, args, { models, user }) =>
				models.Team.findAll(
					{
						include: [
							{
								model: models.User,
								where: { userId: user.id },
							},
						],
					},
					{ raw: true }
				)
		),
	},
	Team: {
		channels: ({ id }, args, { models }) =>
			models.Channel.findAll({ where: { teamId: id } }),
	},
};
