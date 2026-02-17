<script setup>
defineProps({
	priority: {
		type: String,
		required: true,
	},
})

const translatePriority = {
	high: 'Wysoki',
	medium: 'Średni',
	low: 'Niski',
}
</script>

<template>
	<span class="priority-badge" :class="`priority-badge--${priority}`">
		{{ translatePriority[priority] }}
	</span>
</template>

<style lang="scss" scoped>
@use '../assets/style/variables' as *;

.priority-badge {
	display: inline-flex;
	align-items: center;
	font-size: 0.75rem;
	font-weight: 600;
	padding: 3px 10px;
	border-radius: 4px;
	letter-spacing: 0.02em;
	text-transform: uppercase;

	&--high {
		color: $color-priority-high;
		background: $color-priority-high-bg;
	}

	&--medium {
		color: $color-priority-medium;
		background: $color-priority-medium-bg;
	}

	&--low {
		color: $color-priority-low;
		background: $color-priority-low-bg;
	}
}
</style>
