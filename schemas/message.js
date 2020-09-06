export default `
	type Message{
		id: Int!
		user: User!
		channel: Channel!
		text: String!
	}
	extend type Mutation{
		createMessage(channelId: Int!, userId: Int!, text: String!): Boolean!
	}
`;
