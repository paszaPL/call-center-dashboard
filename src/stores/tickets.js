import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTicketsStore = defineStore('tickets', () => {
	// State
	const tickets = ref([])
	const isLoading = ref(false)
	const activeFilter = ref('all')
	const error = ref(null)

	// Getters
	const filteredTickets = computed(() => {
		if (activeFilter.value === 'all') {
			return tickets.value
		}
		return tickets.value.filter(ticket => ticket.status === activeFilter.value)
	})

	const getTicketById = id => {
		return tickets.value.find(ticket => ticket.id === Number(id))
	}

	const ticketCounts = computed(() => {
		const counts = {
			all: tickets.value.length,
			new: tickets.value.filter(ticket => ticket.status === 'new').length,
			in_progress: tickets.value.filter(ticket => ticket.status === 'in_progress').length,
			closed: tickets.value.filter(ticket => ticket.status === 'closed').length,
		}
		return counts
	})

	// Actions
	const fetchTickets = async () => {
		if (tickets.value.length > 0) return // Dane już załadowane
		isLoading.value = true
		error.value = null
		try {
			await new Promise(resolve => setTimeout(resolve, 1000)) // Symulacja opóźnienia 1 sekundy
			const response = await fetch('/data.json') // Pobieranie danych z lokalnego pliku JSON
			if (!response.ok) {
				throw new Error('Nie można pobrać zgłoszeń')
			}
			const data = await response.json()
			tickets.value = data
		} catch (err) {
			error.value = err.message
		} finally {
			isLoading.value = false
		}
	}

	const updateTicketStatus = (id, newStatus) => {
		const index = tickets.value.findIndex(t => t.id === Number(id))
		if (index !== -1) {
			tickets.value[index] = { ...tickets.value[index], status: newStatus }
		}
	}

	const setFilter = filter => {
		activeFilter.value = filter
	}

	return {
		tickets,
		isLoading,
		activeFilter,
		error,
		filteredTickets,
		getTicketById,
		ticketCounts,
		fetchTickets,
		updateTicketStatus,
		setFilter,
	}
})
