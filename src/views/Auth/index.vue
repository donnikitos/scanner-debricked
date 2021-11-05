<template>
	<div :class="$style.root">
		<form @submit.prevent="handleSubmit">
			<h1>Authorize</h1>
			<!-- <div :class="$style.formRow">
				<Input placeholder="Token" v-model="token" />
			</div> -->
			<div :class="$style.formRow">
				<Input placeholder="Username" v-model="formData.username" />
			</div>
			<div :class="$style.formRow">
				<Input
					placeholder="Password"
					type="password"
					v-model="formData.password"
				/>
			</div>
			<div :class="$style.formRow">
				<Button type="submit">Get token</Button>
			</div>
		</form>
	</div>
</template>

<script>
import Input from '@/components/Input/index.vue';
import Button from '@/components/Button/index.vue';

export default {
	name: 'Auth',
	components: { Input, Button },
	data() {
		return {
			token: '',
			formData: {
				username: '',
				password: '',
			},
		};
	},
	methods: {
		async handleSubmit() {
			const res = await this.$store.dispatch('auth', this.formData);

			if (res?.token) {
				this.$router.push('/scanner');
			}
		},
	},
};
</script>

<style lang="scss" module src="./styles.scss" />
