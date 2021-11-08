<template>
	<div :class="$style.root">Loading...</div>
</template>

<script>
export default {
	name: 'Spinner',
	props: {
		type: {
			type: String,
			default: 'button',
			validator(prop) {
				return ['button', 'reset', 'submit'].includes(prop);
			},
		},
	},
};
</script>

<style lang="scss" module src="./styles.scss" />
