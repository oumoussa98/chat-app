<template>
	<div class="chat">
		<div class="chat__header">
			<img src="../assets/avatar.svg" width="40" alt="Avatar" />
			<div class="chat__header__info">
				<h1>{{ name }}</h1>
				<span class="circle"></span>
				<span class="status">online</span>
			</div>
			<button @click="expand" class="expand">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
					<path
						d="M24 0v10.999l-3.379-3.378-4.379 4.379-4.242-4.242 4.379-4.379-3.379-3.379h11zm-11.875 16.138l-4.242-4.242-4.504 4.483-3.379-3.378v10.999h11l-3.379-3.379 4.504-4.483z"
					/>
				</svg>
			</button>
		</div>
		<div class="chat__messages">
			<template v-for="(message, i) in messages" :key="i">
				<div v-if="message.received" class="received">{{ message.received }}<span></span></div>
				<div v-if="message.sent" class="sent">{{ message.sent }}</div>
			</template>
			<div class="loading">
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
import { onMounted, ref, computed } from "vue";
import { useStore } from "vuex";

export default {
	setup() {
		const store = useStore();

		const name = computed(() => store.getters.currentConversation.name);
		const src = "./assets/avatar.svg";

		let message = ref("");

		let messages = computed(() => store.getters.currentMessages.messages);

		const send = () => {
			if (message.value) {
				let obj = { sent: message.value };
				messages.value.push(obj);
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
		const expand = () => {
			if (document.querySelector(".chat").id === "expand")
				return (document.querySelector(".chat").id = "");
			document.querySelector(".chat").id = "expand";
		};
		onMounted(scrollBottom);
		return {
			name,
			src,
			message,
			messages,
			send,
			scrollBottom,
			expand,
		};
	},
};
</script>

<style lang="scss">
#expand {
	max-width: 80%;
	height: 100vh;
}
.chat {
	color: #e0e0e0;
	max-width: 400px;
	margin: auto;
	height: 90vh;
	background: rgb(26, 26, 29);
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	flex-grow: 4;
	transition: all 0.6s;
	&__header {
		width: 100%;
		height: 10%;
		margin: 0 auto;
		background: #1b212b;
		padding: 10px;
		z-index: 1;
		display: flex;
		border-radius: 10px 10px 0 0;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.4);
		position: relative;
		.expand {
			border: none;
			background: none;
			position: absolute;
			right: 20px;
			bottom: 16px;
			cursor: pointer;
			outline: none;
			svg {
				fill: #616161;
			}
		}
		&__info {
			h1 {
				font-size: 20px;
				margin-left: 20px;
			}
			.status {
				font-size: 14px;
				margin-left: 20px;
				position: relative;
				&::before {
					content: "";
					position: absolute;
					width: 6px;
					height: 6px;
					right: -12px;
					bottom: 2px;
					border-radius: 4px;
					background: rgb(3, 141, 38);
				}
			}
		}
	}
	&__messages {
		width: 100%;
		background: #1c232e;
		opacity: 0.9;
		height: 80%;
		padding-top: 20px;
		padding-bottom: 20px;
		overflow-y: auto;
	}
	&__footer {
		width: 100%;
		height: 10%;
		background: #191e27;
		border-radius: 0 0 10px 10px;
		input {
			width: 80%;
			height: 100%;
			background: #11151b;
			border: none;
			outline: none;
			padding: 10px;
			border-radius: 0 0 0 10px;
			color: white;
			font-size: 15px;
		}
		button {
			width: 20%;
			padding: 23px 0 21px 0;
			background: #02721e;
			color: white;
			border: none;
			border-radius: 0 0 10px 0;
			cursor: pointer;
			outline: none;
		}
	}
}

.received {
	clear: both;
	float: left;
	max-width: 70%;
	padding: 10px;
	border-radius: 0 10px 10px 10px;
	background: #1313138e;
	margin: 5px 0 8px 20px;
	font-size: 13px;
	line-height: 1.4;
	position: relative;
	text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
	animation: bounce 0.9s;

	&::before {
		content: "";
		position: absolute;
		top: -10px;
		border-bottom: 10px solid #1313138e;
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
	font-size: 13px;
	line-height: 1.4;
	background: #03bd315b;
	border-radius: 10px 10px 0 10px;
	animation: bounce 0.9s;
	&::before {
		content: "";
		position: absolute;
		bottom: -10px;
		right: 0;
		border-top: 10px solid #03bd315b;
		border-left: 11px solid transparent;
	}
}
.loading {
	clear: both;
	float: left;
	padding: 6px 10px 7px 10px;
	border-radius: 0 10px 10px 10px;
	background: #1313138e;
	margin: 0px 0 8px 20px;
	position: relative;
	width: 46px;
	height: 20px;
	animation: bounce 1s;

	&::before {
		content: "";
		position: absolute;
		top: -10px;
		border-bottom: 10px solid #1313138e;
		left: 0;
		border-right: 11px solid transparent;
	}
	.span1,
	.span2,
	.span3 {
		display: inline-block;
		background: #3d3d3daf;
		animation: loading 4s infinite;
		animation-iteration-count: infinite;
		animation-timing-function: ease-in;
	}
	.span1 {
		width: 6px;
		height: 6px;
		margin: 0 0 7px 9px;
		border-radius: 4px;
		position: relative;
		animation-delay: 0.8s;
	}
	.span2 {
		position: absolute;
		width: 6px;
		height: 6px;
		border-radius: 4px;
		left: 7px;
		animation-delay: 0.6s;
	}

	.span3 {
		position: absolute;
		width: 6px;
		height: 6px;
		border-radius: 4px;
		right: 9px;
		animation-delay: 1s;
	}
}
.chat__messages::-webkit-scrollbar-track {
	border-radius: 10px;
	background-color: #202835;
}

.chat__messages::-webkit-scrollbar {
	width: 8px;
	background-color: #202530;
}

.chat__messages::-webkit-scrollbar-thumb {
	border-radius: 10px;
	background: #10151d;
}
</style>
