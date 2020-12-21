<template>
	<div class="side-bar">
		<div class="chat-info">
			<div class="top">
				<span>
					abdelwahd
					<span class="status">online</span>
				</span>
				<button>New conversation</button>
			</div>
			<input type="search" placeholder="Search" />
		</div>
		<ul class="conversations">
			<li v-for="(chat, i) in chats" :key="i" @click="change(chat.id)">
				<div class="profile-image">
					<img src="../assets/avatar.svg" alt="Avatar" width="40" />
				</div>
				<div class="profile-info">
					<div class="top-row">
						<div class="profile-name">
							{{ chat.name }}
						</div>
						<div class="timestamp">{{ chat.timestamp }}</div>
					</div>
					<div class="bottom-row">
						<div class="message-preview">{{ chat.text.slice(0, 20) + "..." }}</div>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
	setup() {
		const store = useStore();
		let chats = computed(() => store.getters.conversations);

		const change = id => {
			store.commit("changeConversation", { id: id });
		};

		return {
			chats,
			change,
		};
	},
};
</script>

<style lang="scss" scoped>
.side-bar {
	width: 100%;
	height: 100%;
	background: #1c232e;
	backface-visibility: 0;
	color: white;
}
.chat-info {
	width: 100%;
	height: 104px;
	background: #1b212b;
	z-index: 1;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.4);
	.top {
		display: block;
		height: 60%;
		span {
			display: inline-block;
			margin: 8px 0 0 20px;
			width: 40%;
			font-size: 16px;
		}
		.status {
			margin: 2px 0 0 10px;
			font-size: 12px;
			position: relative;
			cursor: pointer;
			&::before {
				content: "";
				position: absolute;
				width: 6px;
				height: 6px;
				left: -10px;
				bottom: 2px;
				border-radius: 4px;
				background: rgb(3, 141, 38);
			}
			&::after {
				content: "";
				position: absolute;
				right: -6px;
				bottom: -5px;
				border-top: 8px solid #363b44;
				border-bottom: 6px solid transparent;
				border-left: 5px solid transparent;
				border-right: 5px solid transparent;
			}
		}
		button {
			width: 50%;
			padding: 10px;
			color: white;
			float: right;
			background: #06e04f73;
			border: none;
			margin: 8px 4px 0 0;
			border-radius: 8px;
			outline: none;
			cursor: pointer;
		}
	}
	input {
		width: 80%;
		padding: 10px;
		background: #252d3a;
		border: none;
		border-radius: 6px;
		display: block;
		margin: 3px auto 0 auto;
		outline: none;
		color: #f1f1f1;
		&::-webkit-search-cancel-button {
			cursor: pointer;
		}
	}
}

.conversations {
	margin-top: 20px;
	li {
		margin: 4px 0;
		width: 100%;
		height: 70px;
		padding: 14px 0 0 0;
		display: block;
		flex-direction: column;
		cursor: pointer;
		&:hover {
			background: #151b24;
		}
		&.active {
			background: #151b24;
		}
		.profile-image {
			width: 20%;
			display: inline-block;

			img {
				width: 40px;
				margin: 0px 0px 0px 6px;
				border-radius: 50%;
			}
		}
		.profile-info {
			display: inline-block;
			vertical-align: top;
			margin: 2px 0 0 10px;
			width: 70%;
			.top-row {
				.profile-name {
					display: inline-block;
					color: #f1f1f1;
					width: 70%;
				}
				.timestamp {
					float: right;
					font-size: 12px;
					color: #b3b3b3;
					margin-top: 2px;
				}
			}
			.bottom-row {
				.message-preview {
					margin-top: 5px;
					font-size: 14px;
					color: #cccccc;
				}
			}
		}
	}
}
</style>
