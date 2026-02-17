<script setup>
import { useTicketsStore } from '@/stores/tickets'
import { storeToRefs } from 'pinia'

const store = useTicketsStore()
const { activeFilter, ticketCounts } = storeToRefs(store)

const filters = [
	{ key: 'all', label: 'Wszystkie' },
	{ key: 'new', label: 'Nowe' },
	{ key: 'in_progress', label: 'W trakcie' },
	{ key: 'closed', label: 'Zamknięte' },
]

function handleFilter(filter) {
	store.setFilter(filter)
}
</script>

<template>
	<div class="filters">
		<button
			v-for="filter in filters"
			:key="filter"
			class="filters__btn"
			:class="{
				'filters__btn--active': activeFilter === filter.key,
				'filters__btn--new': filter.key === 'new',
				'filters__btn--in-progress': filter.key === 'in_progress',
				'filters__btn--closed': filter.key === 'closed',
			}"
			@click="handleFilter(filter.key)">
			{{ filter.label }}
			<span class="filters__count">{{ ticketCounts[filter.key] }}</span>
		</button>
	</div>
</template>

<style lang="scss" scoped>
@use '../assets/style/variables' as *;

.filters {
	display: flex;
	gap: $space-sm;
	flex-wrap: wrap;

	&__btn {
		display: flex;
		align-items: center;
		gap: $space-sm;
		padding: $space-sm $space-md;
		background: $color-bg-card;
		color: $color-text-secondary;
		border: 1px solid $color-border;
		border-radius: $radius-md;
		font-size: 0.87rem;
		font-weight: 500;
		transition: all $transition-fast;

		&:hover {
			background: $color-bg-hover;
			color: $color-text-primary;
			border-color: $color-border-light;
		}

		&--active {
			color: $color-text-primary;
			border-color: $color-accent;
			background: $color-accent-bg;

			&.filters__btn--new {
				border-color: $color-status-new;
				background: $color-status-new-bg;
				color: $color-status-new;
			}

			&.filters__btn--in-progress {
				border-color: $color-status-in-progress;
				background: $color-status-in-progress-bg;
				color: $color-status-in-progress;
			}

			&.filters__btn--closed {
				border-color: $color-status-closed;
				background: $color-status-closed-bg;
				color: $color-status-closed;
			}
		}
	}

	&__count {
		font-size: 0.75rem;
		font-weight: 600;
		padding: 1px 7px;
		border-radius: 10px;
		background: var(--color-bg-hover);
		min-width: 22px;
		text-align: center;
	}
}
</style>
