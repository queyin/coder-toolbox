<template>
	<div id="app" class="mdui-m-b-5">
		<header class="mdui-appbar mdui-appbar-fixed">
			<div class="mdui-toolbar mdui-color-theme">
				<span class="mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white" mdui-drawer="{target: '#main-drawer', swipe: true}"><i class="mdui-icon material-icons">menu</i></span>
				<router-link to="/" class="mdui-typo-headline">Lolicon.dev</router-link>
				<span class="mdui-typo-title">工具箱</span>
				<div class="mdui-toolbar-spacer"></div>
				<router-link to="/about" class="mdui-btn mdui-btn-icon" mdui-tooltip="{content: '关于'}">
					<i class="mdui-icon material-icons">info_outline</i>
				</router-link>
			</div>
		</header>
		<div class="mdui-drawer mdui-shadow-6" id="main-drawer">
			<div class="mdui-list" mdui-collapse>
				<div class="mdui-list-item mdui-ripple" @click="switchAll">
					<template v-if="showAll">
						<i class="mdui-list-item-icon mdui-icon material-icons mdui-text-color-blue">remove</i>
						<div class="mdui-list-item-content">全部收起</div>
					</template>
					<template v-else>
						<i class="mdui-list-item-icon mdui-icon material-icons mdui-text-color-red">add</i>
						<div class="mdui-list-item-content">全部展开</div>
					</template>
				</div>
				<router-collapse v-for="c of $root.routerCollapses" :key="c.text" v-bind="c"></router-collapse>
			</div>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
import RouterCollapse from './components/routerCollapse.vue';

export default {
	name: "app",
	data: () => ({
		showAll: true
	}),
	methods: {
		switchAll() {
			const $ = this.$root.mdui.JQ;
			$('#main-drawer .mdui-collapse-item')[this.showAll ? 'removeClass' : 'addClass']('mdui-collapse-item-open');
			if (this.showAll) $('#main-drawer .mdui-collapse-item>.mdui-collapse-item-body').removeAttr('style');
			this.showAll = !this.showAll;
		}
	},
	components: {
		RouterCollapse
	}
};
</script>

<style>
body::-webkit-scrollbar {
	width: 8px;
	height: 8px;
}
body::-webkit-scrollbar-thumb {
	background: rgba(0, 0, 0, 0.25);
}
body .mdui-table-fluid::-webkit-scrollbar,
body .mdui-table-fluid::-webkit-scrollbar-track-piece {
	background: #fafafa;
}
body::before {
	content: "";
	background-image: url(./assets/hibiki.png);
	background-size: contain;
	background-position: right bottom;
	background-repeat: no-repeat;
	position: fixed;
	right: 0;
	bottom: 0;
	height: 100vh;
	width: 0;
	opacity: 0.5;
	z-index: -1;
}
@media screen and (min-width: 600px) {
	body::before {
		width: 40vw;
	}
}
@media screen and (min-width: 1024px) {
	body::before {
		width: 30vw;
	}
}
@media screen and (min-width: 1440px) {
	body::before {
		width: 25vw;
	}
}
.md-body h2 {
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	padding-bottom: 0.3em;
}
.no-float {
	float: none !important;
}
.mdui-tooltip {
	font-size: 12px;
}
.mdui-list-item-content {
	line-height: inherit;
	padding-top: 10px;
	padding-bottom: 10px;
}
.mdui-list-item-title {
	font-size: 14px;
}
.mdui-list-item-text {
	font-size: 12px;
}
.btn-bar {
	display: flex;
	flex-wrap: wrap;
}
.btn-bar > :not(.mdui-textfield-label) {
	margin-right: 16px;
	margin-bottom: 16px;
}
.CodeMirror {
	height: 450px;
	font-size: 13px;
	line-height: 1.4em;
}
.o-v {
	overflow: visible;
}
</style>
