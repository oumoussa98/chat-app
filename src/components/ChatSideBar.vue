<template>
	<div class="chat-side-bar">
		<div class="overlay" @click="hideSideBar"></div>
		<div class="side-bar">
			<div role="button" class="burger-menu" @click="hideSideBar"><Arrow /></div>
			<div class="chat-info">
				<div class="top">
					<span>
						abdelwahd
						<button @click="showStatus" class="status">
							online
							<ul v-if="show" class="status__dropdown">
								<li class="offline">offline</li>
								<li>logout</li>
							</ul>
						</button>
					</span>
					<button @click="displayModal" class="new-conversation">
						new conversation
						<Modal />
					</button>
				</div>
				<input class="search" type="search" placeholder="Search" />
			</div>
			<ul class="conversations">
				<li
					v-for="(chat, i) in chats"
					:key="i"
					@click="change(chat.id)"
					:class="{ active: chat.id == active }"
				>
					<div class="profile-image">
						<img src="../assets/images/avatar.svg" alt="Avatar" width="40" />
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
	</div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref } from "vue";
import Arrow from "../components/svgs/Arrow.vue";
import Modal from "../components/Modal.vue";

export default {
	components: { Arrow, Modal },
	setup() {
		const store = useStore();
		let chats = computed(() => store.getters.conversations);
		let active = ref(store.state.currentConversationID);
		let show = ref(false);
		const change = id => {
			store.commit("changeConversation", { id: id });
			hideSideBar();
			active.value = id;
		};
		const hideSideBar = () => {
			document.querySelector(".chat-side-bar").setAttribute("data-hide", "true");
		};
		const showStatus = () => {
			if (show.value === true) return (show.value = false);
			show.value = true;
		};
		const displayModal = () => {
			const el = document.querySelector(".modal");
			el.setAttribute("data-hide", "false");
		};

		return {
			chats,
			change,
			hideSideBar,
			active,
			showStatus,
			show,
			displayModal,
		};
	},
};
</script>

<style lang="scss" scoped>
.chat-side-bar {
	min-width: 300px;
	height: 100vh;
	float: left;
	margin-right: 2px;
	background: #191e27;
	justify-self: flex-start;
	transition: all 0.4s;
}
.side-bar {
	width: 100%;
	height: 100%;
	background: var(--bg-messages-container);
	.burger-menu {
		display: none;
	}
}
.chat-info {
	width: 100%;
	height: 104px;
	background: var(--bg-header);
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
			border: none;
			outline: none;
			color: var(--color);
			padding: 0 4px;
			background: none;
			cursor: pointer;
			&::before {
				content: "";
				position: absolute;
				width: 6px;
				height: 6px;
				left: -8px;
				bottom: 4px;
				border-radius: 4px;
				background: rgb(3, 141, 38);
			}
			&::after {
				content: "";
				position: absolute;
				right: -10px;
				bottom: -4px;
				border-top: 8px solid #363b44;
				border-bottom: 6px solid transparent;
				border-left: 5px solid transparent;
				border-right: 5px solid transparent;
			}
			&__dropdown {
				position: absolute;
				left: -12px;
				top: 18px;
				padding: 4px;
				width: 160%;
				font-size: 13px;
				background: var(--bg);
				box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.4);
				text-align: center;
				li {
					padding: 4px 0;
				}
				.offline {
					position: relative;
					&::before {
						content: "";
						position: absolute;
						width: 6px;
						height: 6px;
						left: 0px;
						top: 9px;
						border-radius: 4px;
						background: rgb(236, 5, 5);
					}
				}
			}
		}
		.new-conversation {
			width: 50%;
			padding: 10px;
			float: right;
			background: #149159;
			border: none;
			margin: 8px 4px 0 0;
			border-radius: 8px;
			outline: none;
			cursor: pointer;
		}
	}
	.search {
		width: 80%;
		padding: 10px;
		background: var(--bg-search);
		border: none;
		border-radius: 6px;
		display: block;
		margin: 3px auto 0 auto;
		outline: none;
		color: var(--color);
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
			background: var(--bg-secondary);
		}
		&.active {
			background: var(--bg-secondary);
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
					width: 70%;
				}
				.timestamp {
					float: right;
					font-size: 12px;
					margin-top: 2px;
					color: var(--color-lighten);
				}
			}
			.bottom-row {
				.message-preview {
					margin-top: 5px;
					font-size: 14px;
					color: var(--color-lighten);
				}
			}
		}
	}
}

@media screen and (max-width: 705px) {
	.chat-side-bar {
		position: absolute;
		transform: translateX(-100%);
		z-index: 2;
		box-shadow: 4px 0 6px rgba(0, 0, 0, 0.4);
	}
	.chat-side-bar[data-hide="true"] {
		transform: translateX(-100%);
		.burger-menu {
			display: none;
		}
	}
	.chat-side-bar[data-hide="false"] {
		transform: translateX(0%);
		.overlay {
			background-color: rgba(22, 22, 22, 0.5);
			position: absolute;
			width: 100vw;
			height: 100vh;
			bottom: 0;
			top: 0;
			left: 0;
			right: 0;
			z-index: -1;
			transition: all 0.6s;
		}
		.burger-menu {
			display: inline-block;
		}
	}
	.side-bar {
		position: relative;
		.burger-menu {
			position: absolute;
			cursor: pointer;
			padding: 0 10px;
			right: -50px;
			top: 8px;
			svg {
				transform: rotateY(180deg);
				width: 30px;
				fill: var(--arrow-color);
			}
		}
	}
}
@media screen and (max-width: 350px) {
	.chat-side-bar {
		min-width: 250px;
		width: 250px;
	}
}
</style>
