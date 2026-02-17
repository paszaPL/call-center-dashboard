<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTicketsStore } from '@/stores/tickets'
import StatusBadge from '@/components/StatusBadge.vue'
import PriorityBadge from '@/components/PriorityBadge.vue'

const route = useRoute()
const router = useRouter()
const store = useTicketsStore()

const selectedStatus = ref('')
const isSaving = ref(false)
const showSaved = ref(false)

const ticket = computed(() => store.getTicketById(route.params.id))

const statuses = ['new', 'in_progress', 'closed']

const statusLabels = {
	new: 'Nowe',
	in_progress: 'W trakcie',
	closed: 'Zamknięte',
}

onMounted(async () => {
	await store.fetchTickets()
	if (ticket.value) {
		selectedStatus.value = ticket.value.status
	}
})

watch(ticket, val => {
	if (val) {
		selectedStatus.value = val.status
	}
})

const hasChanges = computed(() => {
	return ticket.value && selectedStatus.value !== ticket.value.status
})

const saveStatus = async () => {
	if (!hasChanges.value) return
	isSaving.value = true
	try {
		await store.updateTicketStatus(route.params.id, selectedStatus.value)
		showSaved.value = true
		setTimeout(() => {
			showSaved.value = false
		}, 2000)
	} catch (e) {
		console.error(e)
	} finally {
		isSaving.value = false
	}
}

const goBack = () => {
	router.push({ name: 'TicketList' })
}

const formatDate = (dateStr) => {
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
	<div class="detail">
		<button class="detail__back" @click="goBack">
			<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
				stroke-linecap="round" stroke-linejoin="round">
				<path d="M19 12H5" />
				<polyline points="12 19 5 12 12 5" />
			</svg>
			Powrót do listy
		</button>

		<div v-if="!ticket" class="detail__not-found">
			<h2>Nie znaleziono zgłoszenia</h2>
			<p>Zgłoszenie o podanym ID nie istnieje.</p>
		</div>

		<template v-else>
			<div class="detail__header">
				<div class="detail__header-top">
					<span class="detail__id">#{{ ticket.id }}</span>
					<PriorityBadge :priority="ticket.priority" />
				</div>
				<h1 class="detail__subject">{{ ticket.subject }}</h1>
				<div class="detail__meta">
					<span class="detail__meta-item">
						<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
							stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
							<circle cx="12" cy="7" r="4" />
						</svg>
						{{ ticket.customerName }}
					</span>
					<span class="detail__meta-item">
						<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
							stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
							<line x1="16" y1="2" x2="16" y2="6" />
							<line x1="8" y1="2" x2="8" y2="6" />
							<line x1="3" y1="10" x2="21" y2="10" />
						</svg>
						{{ formatDate(ticket.createdAt) }}
					</span>
				</div>
			</div>

			<div class="detail__body">
				<div class="detail__section">
					<h2 class="detail__section-title">Opis zgłoszenia</h2>
					<p class="detail__description">{{ ticket.description }}</p>
				</div>

				<div class="detail__section detail__status-section">
					<h2 class="detail__section-title">Zmiana statusu</h2>
					<div class="detail__status-current">
						<span class="detail__status-label">Aktualny status:</span>
						<StatusBadge :status="ticket.status" />
					</div>
					<div class="detail__status-form">
						<div class="detail__select-wrapper">
							<select v-model="selectedStatus" class="detail__select">
								<option v-for="status in statuses" :key="status" :value="status">
									{{ statusLabels[status] }}
								</option>
							</select>
							<svg class="detail__select-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none"
								stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<polyline points="6 9 12 15 18 9" />
							</svg>
						</div>
						<button class="detail__save-btn" :class="{ 'detail__save-btn--disabled': !hasChanges }"
							:disabled="!hasChanges || isSaving" @click="saveStatus">
							<template v-if="isSaving">
								<span class="detail__save-spinner"></span>
								Zapisywanie...
							</template>
							<template v-else-if="showSaved">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
									stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
									<polyline points="20 6 9 17 4 12" />
								</svg>
								Zapisano!
							</template>
							<template v-else>Zapisz</template>
						</button>
					</div>
				</div>
			</div>

			<div class="detail__info-grid">
				<div class="detail__info-card">
					<span class="detail__info-label">ID zgłoszenia</span>
					<span class="detail__info-value detail__info-value--mono">#{{ ticket.id }}</span>
				</div>
				<div class="detail__info-card">
					<span class="detail__info-label">Klient</span>
					<span class="detail__info-value">{{ ticket.customerName }}</span>
				</div>
				<div class="detail__info-card">
					<span class="detail__info-label">Priorytet</span>
					<span class="detail__info-value">
						<PriorityBadge :priority="ticket.priority" />
					</span>
				</div>
				<div class="detail__info-card">
					<span class="detail__info-label">Data utworzenia</span>
					<span class="detail__info-value detail__info-value--mono">{{ formatDate(ticket.createdAt) }}</span>
				</div>
			</div>
		</template>
	</div>
</template>

<style lang="scss" scoped>
@use '../assets/style/variables' as *;

.detail {
	max-width: 820px;
	margin: 0 auto;
	padding: $space-xl $space-lg;
	width: 100%;

	&__back {
		display: inline-flex;
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
		margin-bottom: $space-xl;

		&:hover {
			background: $color-bg-hover;
			color: $color-text-primary;
			border-color: $color-border-light;
		}
	}

	&__not-found {
		text-align: center;
		padding: $space-2xl * 2;

		h2 {
			color: $color-text-primary;
			margin-bottom: $space-sm;
		}

		p {
			color: $color-text-muted;
		}
	}

	&__header {
		margin-bottom: $space-xl;
	}

	&__header-top {
		display: flex;
		align-items: center;
		gap: $space-md;
		margin-bottom: $space-md;
	}

	&__id {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.87rem;
		color: $color-accent;
		font-weight: 600;
		background: $color-accent-bg;
		padding: $space-xs $space-sm;
		border-radius: $radius-sm;
	}

	&__subject {
		font-size: 1.5rem;
		font-weight: 700;
		color: $color-text-primary;
		letter-spacing: -0.02em;
		line-height: 1.3;
		margin-bottom: $space-md;

		@media (max-width: $breakpoint-mobile) {
			font-size: 1.2rem;
		}
	}

	&__meta {
		display: flex;
		gap: $space-lg;
		flex-wrap: wrap;
	}

	&__meta-item {
		display: flex;
		align-items: center;
		gap: 6px;
		color: $color-text-muted;
		font-size: 0.87rem;
	}

	&__body {
		display: flex;
		flex-direction: column;
		gap: $space-lg;
		margin-bottom: $space-xl;
	}

	&__section {
		background: $color-bg-card;
		border: 1px solid $color-border;
		border-radius: $radius-lg;
		padding: $space-lg;
	}

	&__section-title {
		font-size: 0.82rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: $color-text-muted;
		margin-bottom: $space-md;
	}

	&__description {
		color: $color-text-secondary;
		font-size: 0.93rem;
		line-height: 1.7;
	}

	&__status-current {
		display: flex;
		align-items: center;
		gap: $space-md;
		margin-bottom: $space-lg;
		padding-bottom: $space-lg;
		border-bottom: 1px solid $color-border;
	}

	&__status-label {
		color: $color-text-muted;
		font-size: 0.87rem;
	}

	&__status-form {
		display: flex;
		gap: $space-md;
		align-items: center;

		@media (max-width: $breakpoint-mobile) {
			flex-direction: column;
			align-items: stretch;
		}
	}

	&__select-wrapper {
		position: relative;
		flex: 1;
	}

	&__select {
		width: 100%;
		padding: $space-sm + 2 $space-xl $space-sm + 2 $space-md;
		background: $color-bg-elevated;
		color: $color-text-primary;
		border: 1px solid $color-border;
		border-radius: $radius-md;
		font-size: 0.87rem;
		appearance: none;
		cursor: pointer;
		transition: border-color $transition-fast;

		&:hover {
			border-color: $color-border-light;
		}

		&:focus {
			border-color: $color-accent;
			outline: none;
		}
	}

	&__select-chevron {
		position: absolute;
		right: 12px;
		top: 50%;
		transform: translateY(-50%);
		color: $color-text-muted;
		pointer-events: none;
	}

	&__save-btn {
		padding: $space-sm + 2 $space-xl;
		background: $color-accent;
		color: white;
		border-radius: $radius-md;
		font-size: 0.87rem;
		font-weight: 600;
		transition: all $transition-fast;
		display: inline-flex;
		align-items: center;
		gap: $space-sm;
		white-space: nowrap;

		&:hover:not(:disabled) {
			background: $color-accent-hover;
		}

		&--disabled {
			opacity: 0.4;
			cursor: not-allowed;
		}
	}

	&__save-spinner {
		width: 14px;
		height: 14px;
		border: 2px solid var(--color-border-light);
		border-top-color: white;
		border-radius: 50%;
		animation: spin 0.6s linear infinite;
	}

	&__info-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: $space-md;

		@media (max-width: $breakpoint-mobile) {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	&__info-card {
		background: $color-bg-card;
		border: 1px solid $color-border;
		border-radius: $radius-md;
		padding: $space-md;
		display: flex;
		flex-direction: column;
		gap: $space-sm;
	}

	&__info-label {
		font-size: 0.72rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: $color-text-muted;
	}

	&__info-value {
		font-size: 0.87rem;
		font-weight: 500;
		color: $color-text-primary;

		&--mono {
			font-family: 'JetBrains Mono', monospace;
			font-size: 0.82rem;
		}
	}
}

@keyframes spin {
	to {
		transform: rotate(360deg);
	}
}
</style>
