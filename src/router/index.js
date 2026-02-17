import { createRouter, createWebHistory } from 'vue-router'
import TicketList from '../views/TicketList.vue'
import TicketDetail from '../views/TicketDetail.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'TicketList',
			component: TicketList,
		},
		{
			path: '/ticket/:id',
			name: 'TicketDetail',
			component: TicketDetail,
			props: true,
		},
	],
})

export default router
