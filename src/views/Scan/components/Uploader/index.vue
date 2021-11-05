<template>
	<div :class="$style.root">
		<div :class="$style.bodyContainer">
			<h1>Upload your project configuration</h1>
			<div
				:class="[$style.dropContainer, dragOver && $style.dragOver]"
				@dragenter.prevent="dragOver = true"
				@dragover.prevent="dragOver = true"
				@dragend="dragOver = false"
				@dragleave="dragOver = false"
				@drop.prevent="onDrop"
			>
				Drop your files here
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Scan',
	components: {},
	emits: {
		onSelect: null,
	},
	data() {
		return {
			dragOver: false,
		};
	},
	methods: {
		onDrop(event) {
			const file = event.dataTransfer.files[0];

			if (file) {
				const reader = new FileReader();

				reader.onload = () => {
					this.$emit('onSelect', {
						file,
						data: reader.result,
					});
				};
				reader.readAsText(file);
			}
		},
	},
};
</script>

<style lang="scss" module src="./styles.scss" />
