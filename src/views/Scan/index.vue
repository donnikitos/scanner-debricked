<template>
	<div :class="$style.root">
		<Uploader v-if="!file" @onSelect="onFileSelect" />
	</div>
</template>

<script>
import Uploader from './components/Uploader/index.vue';

export default {
	name: 'Scan',
	components: { Uploader },
	data() {
		return {
			file: undefined,
		};
	},
	methods: {
		onFileSelect(payload) {
			this.file = payload;
		},
	},
};
</script>

<style lang="scss" module src="./styles.scss" />
