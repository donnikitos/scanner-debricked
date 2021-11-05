<template>
	<div :class="$style.root">
		<Uploader v-if="!file" @onSelect="onFileSelect" />
		<FileViewer v-if="file" :data="file.data" />
	</div>
</template>

<script>
import Uploader from './components/Uploader/index.vue';
import FileViewer from './components/FileViewer/index.vue';
import requestAPI from '@/functions/requestAPI';

export default {
	name: 'Scan',
	components: { Uploader, FileViewer },
	data() {
		return {
			file: undefined,
			uploadInfo: {
				ciUploadId: undefined,
				uploadProgramsFileId: undefined,
			},
		};
	},
	methods: {
		async onFileSelect(payload) {
			this.file = payload;

			const res = await requestAPI(
				'POST',
				'open/uploads/dependencies/files',
				{
					repositoryName: 'unknown',
					commitName: 'unknown',
					fileData: payload.file,
				},
			);

			if (res) {
				this.uploadInfo = res;
			}
		},
	},
};
</script>

<style lang="scss" module src="./styles.scss" />
