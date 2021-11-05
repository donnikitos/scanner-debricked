<template>
	<input
		:type="type"
		:class="$style.root"
		:placeholder="placeholder"
		:value="modelValue"
		@input="$emit('update:modelValue', $event.target.value)"
	/>
</template>

<script>
export default {
	name: 'Input',
	props: {
		type: {
			type: String,
			default: 'text',
			validator(prop) {
				return ['text', 'password'].includes(prop);
			},
		},
		modelValue: {
			type: String,
		},
		placeholder: {
			type: String,
		},
	},
	emits: {
		'update:modelValue': null,
	},
};
</script>

<style lang="scss" module src="./styles.scss" />
