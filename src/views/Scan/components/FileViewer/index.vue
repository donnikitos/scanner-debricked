<template>
	<div :class="$style.root">
		<div :class="$style.displayContainer">
			<div v-for="item in lines" :key="item.line" :class="$style.row">
				<div :class="$style.lineNumber">{{ item.line }}</div>
				<pre :class="$style.line">{{ item.value }}</pre>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'FileViewer',
	props: {
		data: {
			type: String,
			required: true,
		},
		range: {
			type: Array,
		},
	},
	computed: {
		lines() {
			return this.data.split('\n').reduce((acc, value, index) => {
				const line = index + 1;

				if (
					this.range &&
					((this.range[0] && line < this.range[0]) ||
						(this.range[1] && line > this.range[1]))
				) {
					return acc;
				}

				acc.push({ line, value });

				return acc;
			}, []);
		},
	},
};
</script>

<style lang="scss" module src="./styles.scss" />
