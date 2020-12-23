import { reactive } from "vue";
export const conversations = state => state.conversations;

export const currentConversation = state => {
	return state.currentConversationID !== null
		? state.conversations[state.currentConversationID]
		: {};
};

export const currentMessages = state => {
	const conversation = currentConversation(state);
	// return state.messages[conversation.id].messages;
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(state.messages[conversation.id].messages);
		}, 2000);
	});
};
