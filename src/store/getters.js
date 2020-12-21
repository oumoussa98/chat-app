export const conversations = state => state.conversations;

export const currentConversation = state => {
	return state.currentConversationID !== null
		? state.conversations[state.currentConversationID]
		: {};
};

export const currentMessages = state => {
	const conversation = currentConversation(state);
	return state.messages[conversation.id];
};
