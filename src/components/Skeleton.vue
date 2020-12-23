<template>
	<div class="chat">
		<div class="chat__header">
			<div class="img" />
			<div class="chat__header__info">
				<h1></h1>
				<div class="status"></div>
			</div>
			<button @click="collapse" class="expand">
				<Shrink v-if="!collapsed" />
				<Grow v-else />
			</button>
			<DarkLight class="dark-light" />
		</div>
		<div class="chat__messages__skeleton">
			<template v-for="i in [1, 2, 3, 4, 5]" :key="i">
				<div class="received"><span></span></div>
				<div class="sent"></div>
			</template>
		</div>
		<div class="chat__footer">
			<input type="text" placeholder="Write a message..." />
			<button @click="send">send</button>
		</div>
	</div>
</template>

<script>
import { ref } from "vue";
import Grow from "../components/svgs/Grow.vue";
import Shrink from "../components/svgs/Shrink.vue";
import DarkLight from "../components/DarkLight.vue";

export default {
	components: { Grow, Shrink, DarkLight },
	setup() {
		let collapsed = ref(false);
		const collapse = () => {
			console.log("invocked");
			if (document.querySelector(".chat").id === "collapse") {
				document.querySelector(".chat").id = "";
				collapsed.value = false;
				return;
			}
			document.querySelector(".chat").id = "collapse";
			collapsed.value = true;
		};
		return {
			collapsed,
			collapse,
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
	max-width: 78vw;
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
		.img {
			width: 50px;
			height: 50px;
			border-radius: 50%;
			background: var(--bg);
			position: relative;
		}
		.expand {
			align-self: center;
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
		.dark-light {
			align-self: center;
			position: absolute;
			right: 60px;
			bottom: 16px;
		}
		&__info {
			align-self: center;
			margin-top: 2px;
			h1 {
				font-size: 20px;
				width: 100px;
				height: 20px;
				background: var(--bg);
				border-radius: 8px;
				margin-left: 20px;
			}
			.status {
				margin-left: 20px;
				margin-top: 4px;
				width: 50px;
				height: 16px;
				background: var(--bg);
				border-radius: 8px;
			}
		}
	}
	&__messages__skeleton {
		width: 100%;
		background: var(--bg-messages__skeleton-container);
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

.received {
	clear: both;
	float: left;
	width: 50%;
	height: 50px;
	padding: 10px;
	border-radius: 0 10px 10px 10px;
	background: var(--received);
	margin: 5px 0 8px 20px;
	position: relative;
	text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);

	&::before {
		content: "";
		position: absolute;
		top: -10px;
		border-bottom: 10px solid var(--received);
		left: 0;
		border-right: 11px solid transparent;
	}
	&::after {
		content: "";
		width: 40%;
		height: 50px;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 999;
		transform: translateX(-10%);
		background: var(--skeleton);
		transition: all 0.6s;
		animation: shimmer 1s infinite;
	}
}
.sent {
	float: right;
	clear: both;
	width: 50%;
	height: 50px;
	padding: 10px;
	margin: 5px 20px 8px 0;
	position: relative;
	color: white;
	background: var(--sent);
	border-radius: 10px 10px 0 10px;

	&::before {
		content: "";
		position: absolute;
		bottom: -10px;
		right: 0;
		border-top: 10px solid var(--sent);
		border-left: 11px solid transparent;
	}
	&::after {
		content: "";
		width: 40%;
		height: 50px;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 999;
		transform: translateX(-10%);
		background: var(--skeleton-green);
		transition: all 0.6s;
		animation: shimmerGreen 1s infinite;
	}
}
.chat__messages__skeleton::-webkit-scrollbar-track {
	border-radius: 10px;
	background-color: var(--bg-secondary);
}

.chat__messages__skeleton::-webkit-scrollbar {
	width: 8px;
	background-color: #202530;
}

.chat__messages__skeleton::-webkit-scrollbar-thumb {
	border-radius: 10px;
	background: var(--bg-scroll);
}
</style>
