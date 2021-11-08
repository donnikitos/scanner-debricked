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
				<template v-if="!uploading">
					<img
						src="@/assets/icons/file-import-duotone.svg"
						:class="$style.icon"
					/>
					<div :class="$style.text">Drop your package file here</div>
					<div :class="$style.separator">
						<div>or</div>
					</div>
					<div :class="$style.uploadBtn">
						<label>
							Choose file...
							<input type="file" @change="onFileInput" />
						</label>
					</div>
				</template>
				<Spinner v-else />
			</div>
		</div>
	</div>
</template>

<script>
import Spinner from '@/components/Spinner';
import requestAPI from '@/functions/requestAPI';
import objectToFormData from '@/functions/objectToFormData';

export default {
	name: 'Uploader',
	components: { Spinner },
	emits: {
		onUploaded: null,
	},
	data() {
		return {
			dragOver: false,
			uploading: false,
			file: undefined,
			fileContents: undefined,
		};
	},
	methods: {
		onFileInput(event) {
			this.onFileRead(event.target.files[0]);
		},
		onDrop(event) {
			this.dragOver = false;
			this.onFileRead(event.dataTransfer.files[0]);
		},
		async onFileRead(file) {
			if (file) {
				this.uploading = true;
				this.file = file;

				this.fileContents = await new Promise((resolve) => {
					const reader = new FileReader();

					reader.onload = () => {
						resolve(reader.result);
					};
					reader.readAsText(file);
				});

				const res = await requestAPI(
					'POST',
					'open/uploads/dependencies/files',
					{
						data: objectToFormData({
							repositoryName: 'unknown',
							commitName: 'unknown',
							fileData: this.file,
						}),
					},
				);

				if (res) {
					await requestAPI(
						'POST',
						'open/finishes/dependencies/files/uploads',
						{
							data: objectToFormData({
								ciUploadId: res.ciUploadId,
							}),
						},
					);

					this.$emit('onUploaded', {
						...res,
						file: this.file,
						fileContents: this.fileContents,
					});
				}
				this.uploading = false;
			}
		},
	},
};
</script>

<style lang="scss" module src="./styles.scss" />
