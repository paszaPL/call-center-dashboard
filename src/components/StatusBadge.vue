<script setup>
defineProps({
	status: {
		type: String,
		required: true,
	},
	size: {
		type: String,
		default: 'md', // sm | md
	},
})
const translateStatus = {
	new: 'Nowe',
	in_progress: 'W trakcie',
	closed: 'Zamknięte',
}
</script>

<template>
	<span class="status-badge" :class="[`status-badge--${status}`, `status-badge--${size}`]">
		<span class="status-badge__dot"></span>
		{{ translateStatus[status] }}
	</span>
</template>

<style lang="scss" scoped>
@use '../assets/style/variables' as *;

.status-badge {
	display: inline-flex;
	align-items: center;
	gap: 6px;
	font-weight: 500;
	border-radius: 20px;
	white-space: nowrap;

	&--sm {
		font-size: 0.75rem;
		padding: 3px 10px;
	}

	&--md {
		font-size: 0.82rem;
		padding: 5px 14px;
	}

	&__dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	&--new {
		color: $color-status-new;
		background: $color-status-new-bg;

		.status-badge__dot {
			background: $color-status-new;
			box-shadow: 0 0 6px $color-status-new;
		}
	}

	&--in_progress {
		color: $color-status-in-progress;
		background: $color-status-in-progress-bg;

		.status-badge__dot {
			background: $color-status-in-progress;
			box-shadow: 0 0 6px $color-status-in-progress;
		}
	}

	&--closed {
		color: $color-status-closed;
		background: $color-status-closed-bg;

		.status-badge__dot {
			background: $color-status-closed;
			box-shadow: 0 0 6px $color-status-closed;
		}
	}
}
</style>
