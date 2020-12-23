<template>
	<div class="clip-path"></div>
	<div class="container">
		<ChatSideBar />
		<Chat />
	</div>
</template>

<script>
import ChatSideBar from "./components/ChatSideBar.vue";
import Chat from "./components/Chat.vue";

export default {
	components: { ChatSideBar, Chat },
	setup() {},
};
</script>
<style lang="scss">
.clip-path {
	clip-path: polygon(0 0, 100% 0%, 100% 53%, 0 100%);
	background: var(--bg-secondary);
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
</style>
