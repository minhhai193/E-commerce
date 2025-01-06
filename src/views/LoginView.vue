<script setup lang="ts">
import { toast } from "vue3-toastify";
import { onMounted, onUnmounted, ref } from "vue";
import { GButton } from "@/components/common";
import userApi from "@/api/userApi";
import Cookies from "@/utils/cookie";
import { useRouter } from "vue-router";

const router = useRouter();
const emailVal = ref();
const passwordVal = ref();
const isLoading = ref(false);
const isEmptyUsername = ref(false);
const isEmptyPassword = ref(false);

const onLogin = async () => {
	isEmptyUsername.value = false;
	isEmptyPassword.value = false;

	if (!emailVal.value || !passwordVal.value) {
		if (!emailVal.value) {
			isEmptyUsername.value = true;
		}

		if (!passwordVal.value) {
			isEmptyPassword.value = true;
		}
		return;
	}

	isLoading.value = true;

	const params = {
		email: emailVal.value,
		password: passwordVal.value,
	};

	const response = await userApi.login(params);

	if (response) {
		toast.success("Login successful!", {
			autoClose: 3000,
			closeButton: true,
			theme: "colored",
		});

		const loginData = [
			{
				name: "ACCESS_TOKEN",
				value: response.access_token,
			},
			{
				name: "REFRESH_TOKEN",
				value: response.refresh_token,
			},
		];

		Cookies.login(loginData);

		router.push({
			name: "HomeView",
		});
	} else {
		toast.error("Login failed. Please check your information again!", {
			position: "top-right",
			autoClose: 3000,
		});
	}
	isLoading.value = false;
};

const onEnter = (event) => {
	if (event.key === "Enter") {
		onLogin();
	}
};

onMounted(() => {
	window.addEventListener("keydown", onEnter);
});

onUnmounted(() => {
	window.removeEventListener("keydown", onEnter);
});
</script>
<template>
	<div class="flex flex-col h-dvh items-center justify-center bg-[#212121]">
		<p>Username: john@mail.com</p>
		<p>Password: changeme</p>
		<form
			class="rounded-md p-6 pb-8 space-y-4 bg-[#2F2F2F] w-[400px] max-w-full m-6"
		>
			<p class="text-center text-2xl font-bold">Login</p>
			<label
				class="block bg-[#595959] py-2 px-4 rounded-t-md border-b border-primary hover:bg-[#505050] transition"
				for="email"
			>
				<span class="text-white text-sm block mb-1">Email*</span>
				<input
					v-model="emailVal"
					placeholder="john@mail.com"
					class="outline-none w-full bg-transparent"
					id="email"
					type="email"
					name="email"
					autocomplete="off"
				/>
			</label>
			<p v-if="isEmptyUsername" class="text-warning text-sm">
				The username field is required
			</p>
			<label
				class="block bg-[#595959] py-2 px-4 rounded-t-md border-b border-primary hover:bg-[#505050] transition"
				for="password"
			>
				<span class="text-white text-sm block mb-1">Password*</span>
				<input
					v-model="passwordVal"
					name="password"
					placeholder="changeme"
					class="outline-none w-full bg-transparent"
					id="password"
					type="text"
					autocomplete="off"
				/>
			</label>
			<p v-if="isEmptyPassword" class="text-warning text-sm">
				The password field is required
			</p>
			<GButton
				:loading="isLoading"
				type="button"
				custom-class="w-full h-[47px] font-semibold bg-primary"
				@click="onLogin"
			>
				<template #text>
					<span>Log in</span>
				</template>
			</GButton>
		</form>
	</div>
</template>
