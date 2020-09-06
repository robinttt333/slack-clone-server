export default `
	type Channel{
		id: Int!
		name: String!
		messages: [Message!]!
		users: [User!]!
		public: Boolean!
	}

	type createChannelResponse{
		ok: Boolean!
		channel: Channel
		errors: [Error!]
	}

	extend type Mutation{
		createChannel(teamId: Int!, name:String!, public:Boolean=false): createChannelResponse!
	}
`;
