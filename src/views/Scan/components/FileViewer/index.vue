<template>
	<div :class="$style.root">
		<h1>Analyzing file</h1>
		<div :class="$style.scrollContainer">
			<div :class="$style.displayContainer">
				<div
					v-for="(item, index) in lines"
					:key="index"
					:class="$style.row"
				>
					<div :class="$style.lineNumber">{{ index + 1 }}</div>
					<pre :class="$style.line">{{ item }}</pre>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'FileViewer',
	components: {},
	props: {
		data: {
			type: String,
			required: true,
		},
	},
	computed: {
		lines() {
			return this.data.split('\n');
		},
	},
};
</script>

<style lang="scss" module src="./styles.scss" />
