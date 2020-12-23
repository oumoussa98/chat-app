<template>
	<Skeleton v-show="!dataLength" />
	<div class="chat" v-show="dataLength">
		<div class="chat__header">
			<div class="burger-container" @click="showSideBar">
				<div role="button" class="burger-menu"></div>
			</div>
			<img src="../assets/images/avatar.svg" width="40" alt="Avatar" />
			<div class="chat__header__info">
				<h1>{{ name }}</h1>
				<span class="status">online</span>
			</div>
			<button @click="collapse" class="expand">
				<Shrink v-if="!collapsed" />
				<Grow v-else />
			</button>
			<DarkLight class="dark-light" />
		</div>
		<div class="chat__messages">
			<template v-for="(message, i) in messages.data" :key="i">
				<div v-if="message.received" class="received">{{ message.received }}<span></span></div>
				<div v-if="message.sent" class="sent">{{ message.sent }}</div>
			</template>
			<div v-if="typing" class="loading">
				<span class="span1"></span>
				<span class="span2"></span>
				<span class="span3"></span>
			</div>
		</div>
		<div class="chat__footer">
			<input
				@keypress.enter="send()"
				v-model="message"
				type="text"
				placeholder="Write a message..."
			/>
			<button @click="send">send</button>
		</div>
	</div>
</template>

<script>
import { onMounted, ref, computed, reactive, watch } from "vue";
import { useStore } from "vuex";
import Grow from "../components/svgs/Grow.vue";
import Shrink from "../components/svgs/Shrink.vue";
import DarkLight from "../components/DarkLight.vue";
import Skeleton from "../components/Skeleton.vue";

export default {
	components: { Grow, Shrink, DarkLight, Skeleton },
	setup() {
		const store = useStore();

		const name = computed(() => store.getters.currentConversation.name);
		const src = "./assets/avatar.svg";

		let message = ref("");
		let collapsed = ref(false);
		let messages = reactive({});
		let dataLength = ref(0);

		const getData = async () => {
			dataLength.value = 0;
			messages.data;
			messages.data = await store.getters.currentMessages;
			if (messages.data.length) dataLength.value = messages.data.length;
		};
		getData();

		const send = () => {
			if (message.value) {
				let obj = { sent: message.value };
				messages.data.push(obj);
				message.value = "";
				scrollBottom();
			}
			return;
		};

		const scrollBottom = () => {
			let messagesContainer = document.querySelector(".chat__messages");
			setTimeout(() => {
				messagesContainer.scrollTop = messagesContainer.scrollHeight;
			}, 0);
		};
		const collapse = () => {
			const elements = document.querySelectorAll(".chat");
			elements.forEach(el => {
				if (el.id === "collapse") {
					el.id = "";
					collapsed.value = false;
				} else {
					el.id = "collapse";
					collapsed.value = true;
				}
			});
		};
		const showSideBar = () => {
			document.querySelector(".chat-side-bar").setAttribute("data-hide", "false");
		};

		onMounted(scrollBottom);
		watch(name, getData);
		return {
			name,
			src,
			message,
			messages,
			send,
			scrollBottom,
			collapse,
			collapsed,
			dataLength,
			typing: false,
			showSideBar,
		};
	},
};
</script>

<style lang="scss" scoped>
#collapse {
	max-width: 400px;
	height: 90vh;
	border-radius: 10px;
	margin: auto;
	box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.5);

	.chat__header {
		border-radius: 10px 10px 0 0;
	}
	.chat__footer {
		border-radius: 0 0 10px 10px;
		input {
			border-radius: 0 0 0 10px;
		}
		button {
			border-radius: 0 0 10px 0;
		}
	}
}
.chat {
	height: 100vh;
	margin: auto;
	background: var(--bg);
	display: flex;
	flex-direction: column;
	flex-grow: 4;
	transition: all 0.6s;
	&__header {
		width: 100%;
		height: 10%;
		margin: 0 auto;
		background: var(--bg-header);
		padding: 10px;
		z-index: 1;
		display: flex;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.4);
		position: relative;

		.expand {
			align-self: center;
			border: none;
			background: none;
			position: absolute;
			right: 20px;
			cursor: pointer;
			outline: none;
			svg {
				fill: #616161;
			}
		}
		.dark-light {
			align-self: center;
			position: absolute;
			right: 60px;
		}
		&__info {
			align-self: center;
			margin: 0 0 0 20px;

			h1 {
				font-size: 18px;
				margin: 0;
				padding: 0;
			}
			.status {
				font-size: 12px;
				margin: 0;
				padding: 0;
				position: relative;
				&::before {
					content: "";
					position: absolute;
					width: 6px;
					height: 6px;
					right: -12px;
					bottom: 4px;
					border-radius: 4px;
					background: rgb(3, 141, 38);
				}
			}
		}
	}
	&__messages {
		width: 100%;
		background: var(--bg-messages-container);
		opacity: 0.9;
		height: 80%;
		padding-top: 20px;
		padding-bottom: 20px;
		overflow-y: auto;
	}
	&__footer {
		width: 100%;
		height: 10%;
		background: var(--bg);
		input {
			width: 80%;
			height: 100%;
			background: var(--bg-secondary);
			border: none;
			outline: none;
			padding: 10px;
			font-size: 15px;
			color: var(--color);
		}
		button {
			width: 20%;
			display: block;
			float: right;
			height: 100%;
			background: #02721e;
			border: none;
			cursor: pointer;
			outline: none;
		}
	}
}
.burger-container {
	display: none;
	align-self: center;
	cursor: pointer;
	width: 32px;
	margin: 0 20px 0 10px;
	padding: 10px 0;
	.burger-menu {
		width: 30px;
		height: 6px;
		border-radius: 4px;
		position: relative;
		background: #616161;
		&::after {
			position: absolute;
			content: "";
			top: 10px;
			width: 30px;
			height: 6px;
			border-radius: 4px;
			background: #616161;
		}
		&::before {
			position: absolute;
			content: "";
			top: -10px;
			width: 30px;
			height: 6px;
			border-radius: 4px;
			background: #616161;
		}
	}
}

.received {
	clear: both;
	float: left;
	max-width: 70%;
	padding: 10px;
	border-radius: 0 10px 10px 10px;
	background: var(--received);
	margin: 5px 0 8px 20px;
	font-size: 15px;
	line-height: 1.4;
	position: relative;
	word-break: break-all;
	text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
	animation: bounce 0.8s;

	&::before {
		content: "";
		position: absolute;
		top: -10px;
		border-bottom: 10px solid var(--received);
		left: 0;
		border-right: 11px solid transparent;
	}
}
.sent {
	float: right;
	clear: both;
	max-width: 70%;
	padding: 10px;
	margin: 5px 20px 8px 0;
	position: relative;
	font-size: 15px;
	color: white;
	line-height: 1.4;
	background: var(--sent);
	border-radius: 10px 10px 0 10px;
	word-break: break-all;
	animation: bounce 0.8s;
	&::before {
		content: "";
		position: absolute;
		bottom: -10px;
		right: 0;
		border-top: 10px solid var(--sent);
		border-left: 11px solid transparent;
	}
}
.loading {
	clear: both;
	float: left;
	padding: 6px 10px 7px 10px;
	border-radius: 0 10px 10px 10px;
	background: var(--received);
	margin: 0px 0 8px 20px;
	position: relative;
	width: 46px;
	height: 20px;
	animation: bounce 1s;

	&::before {
		content: "";
		position: absolute;
		top: -10px;
		border-bottom: 10px solid var(--received);
		left: 0;
		border-right: 11px solid transparent;
	}
	.span1,
	.span2,
	.span3 {
		width: 6px;
		height: 6px;
		border-radius: 4px;
		display: inline-block;
		background: #3d3d3daf;
		animation: loading 4s infinite;
		animation-iteration-count: infinite;
		animation-timing-function: ease-in;
	}
	.span1 {
		margin: 0 0 8px 9px;
		position: relative;
		animation-delay: 0.8s;
	}
	.span2 {
		position: absolute;
		left: 7px;
		animation-delay: 0.6s;
	}

	.span3 {
		position: absolute;
		right: 9px;
		animation-delay: 1s;
	}
}
.chat__messages::-webkit-scrollbar-track {
	border-radius: 10px;
	background-color: var(--bg-secondary);
}

.chat__messages::-webkit-scrollbar {
	width: 8px;
	background-color: #202530;
}

.chat__messages::-webkit-scrollbar-thumb {
	border-radius: 10px;
	background: var(--bg-scroll);
}
@media screen and (max-width: 705px) {
	.chat {
		max-width: 100vw;
		height: 100vh;
		&__header {
			.expand {
				display: none;
			}
			.dark-light {
				right: 20px;
			}
		}
	}
	.burger-container {
		display: inline-block;
	}
}
</style>
