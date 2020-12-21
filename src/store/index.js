import { createStore } from "vuex";
import { conversations, messages } from "../api/fakeData";
import * as getters from "./getters";
import * as mutations from "./mutations";

// Create a new store instance.
export default createStore({
	state: {
		currentConversationID: 1,
		conversations: [...conversations],
		messages: [...messages],
	},
	getters,
	mutations,
});
