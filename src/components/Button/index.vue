<template>
	<button :type="type" :class="$style.root"><slot></slot></button>
</template>

<script>
export default {
	name: 'Input',
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
