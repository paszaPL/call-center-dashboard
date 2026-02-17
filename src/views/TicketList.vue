<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTicketsStore } from '@/stores/tickets'
import { storeToRefs } from 'pinia'
import TicketFilters from '@/components/TicketFilters.vue'
import StatusBadge from '@/components/StatusBadge.vue'
import PriorityBadge from '@/components/PriorityBadge.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const router = useRouter()
const store = useTicketsStore()
const { filteredTickets, isLoading } = storeToRefs(store)

onMounted(() => {
	store.fetchTickets()
})

function goToTicket(id) {
	router.push({ name: 'TicketDetail', params: { id } })
}

function formatDate(dateStr) {
	return new Date(dateStr).toLocaleDateString('pl-PL', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	})
}
</script>

<template>
	<div class="ticket-list">
		<header class="ticket-list__header">
			<div>
				<h1 class="ticket-list__title">Zgłoszenia</h1>
				<p class="ticket-list__subtitle">Panel operatora call center</p>
			</div>
		</header>

		<TicketFilters />

		<LoadingSpinner v-if="isLoading" />

		<template v-else>
			<!-- Desktop table -->
			<div class="ticket-table-wrapper">
				<table class="ticket-table">
					<thead>
						<tr>
							<th class="ticket-table__th--id">ID</th>
							<th>Klient</th>
							<th>Temat</th>
							<th>Status</th>
							<th>Priorytet</th>
							<th>Data</th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="ticket in filteredTickets"
							:key="ticket.id"
							class="ticket-table__row"
							@click="goToTicket(ticket.id)">
							<td class="ticket-table__id">
								<span>#{{ ticket.id }}</span>
							</td>
							<td class="ticket-table__client">{{ ticket.customerName }}</td>
							<td class="ticket-table__subject">{{ ticket.subject }}</td>
							<td>
								<StatusBadge :status="ticket.status" size="sm" />
							</td>
							<td>
								<PriorityBadge :priority="ticket.priority" />
							</td>
							<td class="ticket-table__date">{{ formatDate(ticket.createdAt) }}</td>
						</tr>
					</tbody>
				</table>
			</div>

			<!-- Mobile cards -->
			<div class="ticket-cards">
				<div v-for="ticket in filteredTickets" :key="ticket.id" class="ticket-card" @click="goToTicket(ticket.id)">
					<div class="ticket-card__top">
						<span class="ticket-card__id">#{{ ticket.id }}</span>
						<PriorityBadge :priority="ticket.priority" />
					</div>
					<h3 class="ticket-card__subject">{{ ticket.subject }}</h3>
					<p class="ticket-card__client">{{ ticket.clientName }}</p>
					<div class="ticket-card__bottom">
						<StatusBadge :status="ticket.status" size="sm" />
						<span class="ticket-card__date">{{ formatDate(ticket.createdAt) }}</span>
					</div>
				</div>
			</div>

			<p v-if="filteredTickets.length === 0" class="ticket-list__empty">Brak zgłoszeń do wyświetlenia.</p>
		</template>
	</div>
</template>

<style lang="scss" scoped>
@use '../assets/style/variables' as *;

.ticket-list {
	max-width: 1100px;
	margin: 0 auto;
	padding: $space-xl $space-lg;
	width: 100%;

	&__header {
		margin-bottom: $space-lg;
	}

	&__title {
		font-size: 1.6rem;
		font-weight: 700;
		letter-spacing: -0.02em;
		color: $color-text-primary;
	}

	&__subtitle {
		color: $color-text-muted;
		font-size: 0.87rem;
		margin-top: $space-xs;
	}

	&__empty {
		text-align: center;
		color: $color-text-muted;
		padding: $space-2xl;
		font-size: 0.93rem;
	}
}

// Desktop table
.ticket-table-wrapper {
	margin-top: $space-lg;
	border: 1px solid $color-border;
	border-radius: $radius-lg;
	overflow: hidden;

	@media (max-width: $breakpoint-mobile) {
		display: none;
	}
}

.ticket-table {
	width: 100%;
	border-collapse: collapse;

	thead {
		background: $color-bg-elevated;

		th {
			text-align: left;
			padding: $space-md $space-md;
			font-size: 0.75rem;
			font-weight: 600;
			text-transform: uppercase;
			letter-spacing: 0.06em;
			color: $color-text-muted;
			border-bottom: 1px solid $color-border;
		}
	}

	&__th--id {
		width: 60px;
	}

	&__row {
		cursor: pointer;
		transition: background $transition-fast;

		&:hover {
			background: $color-bg-hover;
		}

		&:not(:last-child) {
			td {
				border-bottom: 1px solid $color-border;
			}
		}

		td {
			padding: $space-md;
			font-size: 0.87rem;
			vertical-align: middle;
		}
	}

	&__id {
		span {
			font-family: 'JetBrains Mono', monospace;
			font-size: 0.8rem;
			color: $color-text-muted;
			font-weight: 500;
		}
	}

	&__client {
		font-weight: 500;
		color: $color-text-primary;
		white-space: nowrap;
	}

	&__subject {
		color: $color-text-secondary;
		max-width: 300px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	&__date {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.78rem;
		color: $color-text-muted;
		white-space: nowrap;
	}
}

// Mobile cards
.ticket-cards {
	display: none;
	flex-direction: column;
	gap: $space-md;
	margin-top: $space-lg;

	@media (max-width: $breakpoint-mobile) {
		display: flex;
	}
}

.ticket-card {
	background: $color-bg-card;
	border: 1px solid $color-border;
	border-radius: $radius-md;
	padding: $space-md;
	cursor: pointer;
	transition: all $transition-fast;

	&:hover {
		background: $color-bg-hover;
		border-color: $color-border-light;
	}

	&:active {
		transform: scale(0.99);
	}

	&__top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: $space-sm;
	}

	&__id {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.78rem;
		color: $color-text-muted;
		font-weight: 500;
	}

	&__subject {
		font-size: 0.93rem;
		font-weight: 600;
		color: $color-text-primary;
		margin-bottom: $space-xs;
		line-height: 1.4;
	}

	&__client {
		font-size: 0.82rem;
		color: $color-text-secondary;
		margin-bottom: $space-md;
	}

	&__bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	&__date {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.72rem;
		color: $color-text-muted;
	}
}
</style>
