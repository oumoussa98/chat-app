<template>
	<div class="clip-path"></div>
	<div class="container">
		<div class="chat-side-bar">
			<ChatSideBar />
		</div>
		<Chat />
	</div>
</template>

<script>
import ChatSideBar from "./components/ChatSideBar.vue";
import Chat from "./components/Chat.vue";
// import { computed, ref, watch } from "vue";

export default {
	components: { ChatSideBar, Chat },
	setup() {},
};
</script>
<style lang="scss" scoped>
.clip-path {
	clip-path: polygon(0 0, 100% 0%, 100% 53%, 0 100%);
	background: #0c121a;
	height: 70vh;
	width: 100vw;
	z-index: -1;
	position: absolute;
	top: 0;
	left: 0;
}
.container {
	display: flex;
	flex-direction: row;
}
.chat-side-bar {
	width: 270px;
	height: 100vh;
	float: left;
	background: #191e27;
	justify-self: flex-start;
}
</style>
