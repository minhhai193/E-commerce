const routes = [
	{
		path: "/E-commerce",
		name: "MainLayout",
		component: () =>
			import(
				/* webpackChunkName: "mainlayout_chunk" */ "@/layouts/MainLayout.vue"
			),
		children: [
			{
				path: "/",
				name: "HomeView",
				component: () =>
					import(
						/* webpackChunkName: "homeview_chunk" */ "@/views/HomeView.vue"
					),
			},
			{
				path: "/detail/:id",
				name: "DetailProductView",
				component: () =>
					import(
						/* webpackChunkName: "detailproductview_chunk" */ "@/views/DetailProductView.vue"
					),
			},
      {
				path: "/cart/",
				name: "CartView",
				component: () =>
					import(
						/* webpackChunkName: "cartview_chunk" */ "@/views/CartView.vue"
					),
			},
		],
	},
	{
		path: "/E-commerce",
		name: "AuthLayout",
		component: () =>
			import(
				/* webpackChunkName: "authlayout_chunk" */ "@/layouts/AuthLayout.vue"
			),
		children: [
			{
				path: "/login",
				name: "LoginView",
				component: () =>
					import(
						/* webpackChunkName: "loginview_chunk" */ "@/views/LoginView.vue"
					),
			},
			{
				path: ":pathMatch(.*)*",
				name: "NotFoundView",
				component: () =>
					import(
						/* webpackChunkName: "notfoundview_chunk" */ "@/views/NotFoundView.vue"
					),
			},
		],
	},
];

export default routes;
