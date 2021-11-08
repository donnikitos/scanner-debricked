<template>
	<div :class="$style.root">
		<Uploader v-if="!uploadInfo.ciUploadId" @onUploaded="onUploaded" />
		<FileStats
			v-if="uploadInfo.ciUploadId"
			:uploadInfo="uploadInfo"
			@reset="onReset"
		/>
	</div>
</template>

<script>
import Uploader from './components/Uploader/index.vue';
import FileStats from './components/FileStats/index.vue';

const initialValues = {
	uploadInfo: {
		file: undefined,
		fileContents: undefined,
		ciUploadId: undefined,
		uploadProgramsFileId: undefined,
	},
};

export default {
	name: 'Scan',
	components: { Uploader, FileStats },
	data() {
		return { ...initialValues };
	},
	methods: {
		onUploaded(payload) {
			this.uploadInfo = payload;
		},
		onReset() {
			this.uploadInfo = { ...initialValues.uploadInfo };
		},
	},
};
</script>

<style lang="scss" module src="./styles.scss" />
