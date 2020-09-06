export default `
	type Team{
		name:String!
		id: Int!
		owner: User!
		members: [User!]!
		channels: [Channel]!
	}

	type CreateTeamResponse{
		ok: Boolean!
		team: Team
		errors: [Error!]
	}

	extend type Query{
		allTeams: [Team!]!
		inviteTeams: [Team!]!
	}

	type VoidResponse{
		ok: Boolean!
		errors: [Error!]
	}

	extend type Mutation{
		createTeam(name: String!): CreateTeamResponse!
		addMember(email: String!, teamId: Int!): VoidResponse!
	}
	`;
