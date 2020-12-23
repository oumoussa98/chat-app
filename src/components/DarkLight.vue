<template>
	<button role="button" aria-label="Toggle dark/light" @click="darkModeToggle" class="toggle-theme">
		<svg
			v-if="darkMode"
			xmlns="http://www.w3.org/2000/svg"
			width="26"
			height="26"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="feather feather-sun"
		>
			<circle cx="12" cy="12" r="5"></circle>
			<line x1="12" y1="1" x2="12" y2="3"></line>
			<line x1="12" y1="21" x2="12" y2="23"></line>
			<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
			<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
			<line x1="1" y1="12" x2="3" y2="12"></line>
			<line x1="21" y1="12" x2="23" y2="12"></line>
			<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
			<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
		</svg>
		<svg
			v-if="!darkMode"
			xmlns="http://www.w3.org/2000/svg"
			width="26"
			height="26"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="feather feather-moon"
		>
			<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
		</svg>
	</button>
</template>

<script>
export default {
	// Data =================================
	data: () => ({
		// light and dark mode
		darkMode: true,
	}),
	// Methods =====================================
	methods: {
		enableDarkMode() {
			// 1. Add the class to the body
			document.body.setAttribute("data-dark", "true");
			// 2. Update darkMode in localStorage
			localStorage.setItem("darkMode", "enabled");
			this.darkMode = true;
		},
		disableDarkMode() {
			// 1. Remove the class from the body
			document.body.setAttribute("data-dark", "false");
			// 2. Update darkMode in localStorage
			localStorage.setItem("darkMode", "disabled");
			this.darkMode = false;
		},
		// toggle between dark and light mode
		darkModeToggle() {
			// get their darkMode setting
			this.darkMode = localStorage.getItem("darkMode");
			// if it not current enabled, enable it
			if (this.darkMode !== "enabled") {
				this.enableDarkMode();
				// if it has been enabled, turn it off
			} else {
				this.disableDarkMode();
			}
		},
	},
	// vueJs mounted function
	mounted() {
		// check for saved 'darkMode' in localStorage
		this.darkMode = localStorage.getItem("darkMode");
		// If the user already visited and enabled darkMode
		// start things off with it on
		if (this.darkMode === "disabled") {
			this.disableDarkMode();
		} else this.enableDarkMode();
	},
};
</script>

<style lang="scss" scoped>
.toggle-theme {
	background: none;
	border: 0;
	color: #616161;
	cursor: pointer;
	&:hover {
		opacity: 0.8;
	}
	&:focus {
		outline: none;
	}
}
</style>
