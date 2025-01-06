<script lang="ts" setup>
import { toast } from "vue3-toastify";
import { useCartStore } from "@/stores/cartStore";
import { computed, onMounted, ref } from "vue";
import { GButton } from "@/components/common";
import { useRouter } from "vue-router";
import emailjs from "@emailjs/browser";

const router = useRouter();
const nameVal = ref("");
const emailVal = ref("");
const cartStore = useCartStore();
const decreaseQuantity = (item: any) => {
	if (item.quantity > 1) {
		cartStore.minusQuantity(item);
	}
};
const isLoading = ref(false);
const errorMessage = ref("");
const subTotal = computed(() => {
	return cartStore.cartList.reduce(
		(total, item) => total + item.price * item.quantity,
		0
	);
});

const validateEmail = () => {
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	if (emailVal.value === "") {
		errorMessage.value = "This field is required";
	} else if (!emailRegex.test(emailVal.value)) {
		errorMessage.value = "Email is not valid.";
	} else {
		errorMessage.value = "";
	}
};

const increaseQuantity = (item: any) => {
	cartStore.addQuantity(item);
};

const deleteProduct = (item: any) => {
	cartStore.deleteProduct(item);
};

const getDisCount = () => {
	return subTotal.value - (subTotal.value * 5) / 100;
};

const cartHTML = computed(() => {
	let cartHTMLString = `
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
  `;
	cartStore.cartList.forEach((item) => {
		cartHTMLString += `
      <tr>
        <td>${item.title}</td>
        <td>${item.quantity}</td>
        <td>$${item.price}</td>
        <td>$${item.quantity * item.price}</td>
      </tr>
    `;
	});

	cartHTMLString += `
    </tbody>
  </table>
  `;
	return cartHTMLString;
});

const checkOut = async () => {
	const serviceId = "service_7r7rh1g";
	const templateId = "template_fewv8de";
	const userId = "CH9DFf_jVWubP1l2H";

	if (emailVal.value && nameVal.value) {
		try {
			isLoading.value = true;
			const response = await emailjs.send(
				serviceId,
				templateId,
				{
					email: emailVal.value,
					name: nameVal.value,
					cartHTML: cartHTML.value,
					totalAmount: getDisCount(),
				},
				userId
			);

			if (response) {
				isLoading.value = false;
				toast.success("Your order has been created. Please check your email!", {
					autoClose: 4000,
					closeButton: true,
					theme: "colored",
				});

				setTimeout(() => {
				  router.push({
				    name: "HomeView",
				  });
				}, 4000);
			}
			isLoading.value = false;
		} catch (error) {
			toast.error(error, {
				autoClose: 2000,
				closeButton: true,
				theme: "colored",
			});
		}
	} else {
		toast.error("Please enter complete information.", {
			autoClose: 4000,
			closeButton: true,
			theme: "colored",
		});
	}
};
</script>
<template>
	<div class="md:flex md:gap-10 md:items-start">
		<div class="flex-grow">
			<h1 class="text-2xl md:text-3xl font-bold mb-2">Shopping Bag</h1>
			<p>
				<span class="font-bold text-primary"
					>{{ cartStore.quantity }} items</span
				>
				in your bag
			</p>
			<div class="text-sm mt-10 mb-10">
				<div
					v-for="item in cartStore.cartList"
					:key="item.id"
					class="md:flex items-center md:gap-6 border-b border-[#535353] py-10 space-y-4"
				>
					<div class="flex-grow flex items-center gap-4">
						<div
							class="w-[100px] shrink-0 h-[150px] overflow-hidden rounded-lg"
						>
							<img
								:src="item.image"
								class="w-full h-full object-cover"
								:alt="item.title"
							/>
						</div>
						<div class="space-y-1">
							<p class="font-bold text-md">{{ item.title }}</p>
							<p class="text-xs">
								<span class="text-[#b5b5b5]">Size</span>
								<span class="relative top-[-2px] ml-2 mr-2 text-xl font-bold"
									>.</span
								>{{ item.size }}
							</p>
						</div>
					</div>
					<div class="flex items-center gap-6 justify-between">
						<div class="shrink-0 flex rounded-md overflow-hidden">
							<button
								@click="decreaseQuantity(item)"
								class="button_quantity button_quantity_prev"
								:disabled="item.quantity <= 1"
							>
								-
							</button>
							<input
								v-model="item.quantity"
								type="text"
								class="quantity_input pointer-events-none"
							/>
							<button @click="increaseQuantity(item)" class="button_quantity">
								+
							</button>
						</div>
						<div class="shrink-0 min-w-[80px] text-center">
							${{ item.price * item.quantity }}
						</div>
						<div
							class="cursor-pointer hover:text-primary transition"
							@click="deleteProduct(item)"
						>
							<i class="fa-solid fa-x fa-xl"></i>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div
			class="p-4 bg-[#3f3f3f] md:w-[25%] min-w-[200px] shrink-0 sticky top-20"
		>
			<p class="text-xl font-bold mb-1">SUMMARY</p>
			<div class="text-sm space-y-2 mb-4">
				<div class="space-y-1">
					<label for="name">Name:</label>
					<input
						v-model="nameVal"
						type="text"
						id="name"
						name="name"
						class="w-full h-7 px-2"
					/>
				</div>
				<div class="space-y-1">
					<label for="email">Email: <span class="text-red-500">*</span></label>
					<input
						v-model="emailVal"
						type="text"
						id="email"
						name="email"
						class="w-full h-7 px-2"
						@blur="validateEmail"
					/>
					<div v-if="errorMessage" class="text-red-500 text-sm mt-2">
						{{ errorMessage }}
					</div>
				</div>
			</div>
			<div class="flex justify-between mb-4">
				<div class="text-sm space-y-1">
					<p>Cart Subtotal</p>
					<p>Discount</p>
					<p class="font-semibold text-primary">Cart Total</p>
				</div>
				<div class="text-sm space-y-1 text-right">
					<p>${{ subTotal }}</p>
					<p>5%</p>
					<p class="font-semibold">{{ getDisCount() }}</p>
				</div>
			</div>
			<div class="flex justify-center">
				<GButton
					:loading="isLoading"
					type="button"
					custom-class="h-full px-3 bg-primary text-sm"
					@click="checkOut"
				>
					<template #text>
						<span>Checkout</span>
					</template>
				</GButton>
			</div>
		</div>
	</div>
</template>
<style scoped>
.button_quantity {
	font-size: 18px;
	cursor: pointer;
	border-radius: 0 !important;
	outline: none;
	padding: 0 8px 2px;
	background: transparent;
	border: 0;
}
.button_quantity_prev {
	font-size: 31px;
	padding-bottom: 7px;
}

.button_quantity:disabled {
	cursor: not-allowed;
}

.quantity_input {
	outline: none;
	width: 50px;
	border-radius: 6px;
	text-align: center;
	font-size: 14px;
	padding: 2px 4px 4px;
	border: 1px solid #454545;
	background: transparent;
}
</style>
