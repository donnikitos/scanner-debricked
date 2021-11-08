<template>
	<div :class="$style.root">
		<h4>
			{{ label }}
		</h4>
		<div :class="$style.list">
			<div
				:key="item.cve"
				v-for="item in dependencies"
				:class="$style.item"
			>
				<a
					:href="item.dependencyLink"
					target="_blank"
					:class="$style.label"
				>
					{{ item.dependency }}
				</a>
				<a :href="item.cveLink" target="_blank" :class="$style.cve">
					CVE
				</a>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'DepList',
	props: {
		label: { type: String, required: true },
		dependencies: {
			type: Array,
			required: true,
		},
	},
};
</script>

<style lang="scss" module src="./styles.scss" />
