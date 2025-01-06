import { createRouter, createWebHistory } from "vue-router";
import Cookie from "@/utils/cookie";

import routes from "./routes";

const router = createRouter({
	history: createWebHistory("/"),
	routes,
});

// AUTH MIDDLEWARE
router.beforeEach((to, from, next) => {
	if (to.path !== "/login" && !Cookie.get("ACCESS_TOKEN")) next({ path: "/login" });
	else {
		next();
	}
});

export default router;
