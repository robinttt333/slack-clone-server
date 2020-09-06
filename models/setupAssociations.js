export default (connection) => {
	const { User, Message, Channel, Team, Member } = connection.models;

	Channel.belongsToMany(User, { through: "Channel_member" });
	User.belongsToMany(Channel, { through: "Channel_member" });

	User.belongsToMany(Team, {
		through: Member,
		foreignKey: {
			name: "userId",
			field: "user_id",
		},
	});
	Team.belongsToMany(User, {
		through: Member,
		foreignKey: {
			name: "teamId",
			field: "team_id",
		},
	});

	Team.belongsTo(User, { foreignKey: "owner" });

	Message.belongsTo(Channel, {
		foreignKey: {
			name: "channelId",
			field: "channel_id",
		},
	});

	Message.belongsTo(User, {
		foreignKey: {
			name: "userId",
			field: "user_id",
		},
	});

	Channel.belongsTo(Team, {
		foreignKey: {
			name: "teamId",
			field: "team_id",
		},
	});
};
