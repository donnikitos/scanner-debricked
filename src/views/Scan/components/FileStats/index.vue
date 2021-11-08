<template>
	<div :class="$style.root">
		<h1 v-if="!done">Analyzing file</h1>
		<Button v-else @click="$emit('reset')">Check an other one</Button>
		<div :class="$style.viewContainer">
			<div :class="$style.scrollContainer">
				<div :class="$style.displayContainer">
					<div v-if="!done" :class="$style.eyeCandy">
						<div :class="$style.container">
							<img
								src="@/assets/icons/file-alt-duotone.svg"
								:class="$style.paper"
							/>
							<img
								src="@/assets/icons/search-light.svg"
								:class="$style.glass"
							/>
						</div>
						<div :class="$style.percentage">
							{{ result.progress }} %
						</div>
					</div>
					<template v-if="done">
						<div :class="$style.miniInfo">
							<div :class="$style.vuln">
								<div :class="$style.count">
									{{ result.vulnerabilitiesFound }}
								</div>
								<div :class="$style.label">Vulnerabilities</div>
							</div>
							<div
								v-if="result.detailsUrl"
								:class="$style.details"
							>
								<a :href="result.detailsUrl" target="_blank">
									Show Details
								</a>
							</div>
							<div
								v-if="result.detailsUrl"
								:class="$style.details"
							>
								<a
									href="#"
									@click.prevent="showFile = !showFile"
								>
									Show File
								</a>
							</div>
						</div>
						<div :class="$style.info">
							<h2>
								<span>File:</span>
								{{ uploadInfo.file.name }}
							</h2>
							<div :class="$style.depList">
								<DepList
									label="Warnings"
									:dependencies="warnings"
								/>
								<DepList label="Fails" :dependencies="fails" />
							</div>
						</div>
					</template>
				</div>
			</div>
			<transition name="slide-up-transition">
				<FileViewer
					v-if="done && showFile"
					:data="uploadInfo.fileContents"
					:class="$style.fileViewer"
				/>
			</transition>
		</div>
	</div>
</template>

<script>
import requestAPI from '@/functions/requestAPI';
import DepList from './components/DepList';
import Button from '@/components/Button';
import FileViewer from '../FileViewer';

function pipelineFilter(rules, type) {
	return (
		rules?.find(
			(rule) =>
				rule.triggered &&
				rule?.ruleActions?.includes(`${type}Pipeline`),
		).triggerEvents || []
	);
}

let timeoutId = null;

export default {
	name: 'FileStats',
	components: { DepList, Button, FileViewer },
	props: {
		uploadInfo: {
			type: Object,
		},
	},
	emits: {
		reset: null,
	},
	data() {
		return {
			showFile: false,
			result: {
				progress: 0,
				vulnerabilitiesFound: 0,
				unaffectedVulnerabilitiesFound: 0,
				automationsAction: 'none',
				policyEngineAction: 'none',
				automationRules: [],
			},
		};
	},
	mounted() {
		this.syncStats();
	},
	computed: {
		done() {
			return this.result.progress >= 100;
		},
		warnings() {
			return pipelineFilter(this.result.automationRules, 'warn');
		},
		fails() {
			return pipelineFilter(this.result.automationRules, 'fail');
		},
	},
	methods: {
		async syncStats() {
			clearTimeout(timeoutId);

			const res = await requestAPI('GET', 'open/ci/upload/status', {
				params: {
					ciUploadId: this.uploadInfo.ciUploadId,
				},
			});

			if (res) {
				this.result = res;

				if (res.progress < 100) {
					timeoutId = setTimeout(this.syncStats, 1000);
				}
			}
		},
	},
};
</script>

<style lang="scss" module src="./styles.scss" />
<style lang="scss" scope>
.slide-up-transition {
	&-enter-active,
	&-leave-active {
		transition: max-height 300ms ease;
	}
	&-leave-from,
	&-enter-to {
		max-height: 65%;
	}
	&-enter-from,
	&-leave-to {
		max-height: 0;
	}
}
</style>
