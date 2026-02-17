<template>
	<div class="loader">
		<div class="loader__spinner">
			<div class="loader__ring"></div>
			<div class="loader__ring"></div>
			<div class="loader__ring"></div>
		</div>
		<p class="loader__text">Ładowanie zgłoszeń...</p>
	</div>
</template>

<style lang="scss" scoped>
@use '../assets/style/variables' as *;

.loader {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: $space-2xl * 2;
	gap: $space-lg;

	&__spinner {
		position: relative;
		width: 40px;
		height: 40px;
	}

	&__ring {
		position: absolute;
		inset: 0;
		border: 2px solid transparent;
		border-radius: 50%;
		animation: spin 1.2s linear infinite;

		&:nth-child(1) {
			border-top-color: $color-accent;
		}

		&:nth-child(2) {
			inset: 4px;
			border-right-color: $color-status-in-progress;
			animation-duration: 1.6s;
			animation-direction: reverse;
		}

		&:nth-child(3) {
			inset: 8px;
			border-bottom-color: $color-status-closed;
			animation-duration: 2s;
		}
	}

	&__text {
		color: $color-text-muted;
		font-size: 0.87rem;
	}
}

@keyframes spin {
	to {
		transform: rotate(360deg);
	}
}
</style>
