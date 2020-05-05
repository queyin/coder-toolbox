<template>
  <mdui-container title="JavaScript" subtitle="格式化 / 混淆 / 压缩">
    <div id="codemirror" class="mdui-shadow-2 mdui-m-b-2"></div>
    <div class="btn-bar">
      <mdui-button @click="beautify">格式化</mdui-button>
      <mdui-button @click="purify" mdui-tooltip="{content:'删除不必要的空格和换行'}">净化</mdui-button>
      <mdui-button
        class="mdui-color-theme"
        @click="uglify"
        mdui-tooltip="{content:'在“净化”的基础上简化变量名以进一步缩小体积'}"
      >混淆</mdui-button>
      <mdui-button
        class="mdui-color-theme-700"
        @click="minimize"
        mdui-tooltip="{content:'在“混淆”的基础上对代码进行简化、内联、重新排列'}"
      >混淆并压缩</mdui-button>
    </div>
  </mdui-container>
</template>

<script>
import CodeMirror from 'codemirror';
// require('codemirror/mode/javascript/javascript');

import Terser from 'terser';

const beautify = require('js-beautify').js;

const pureOpt = {
  compress: false,
  mangle: false,
};

const ugliOpt = {
  compress: false,
  mangle: true,
};

let cm;

export default {
  name: 'code-js',
  mounted() {
    cm = CodeMirror(document.getElementById('codemirror'), {
      indentUnit: 4,
      lineWrapping: true,
      lineNumbers: true,
      mode: 'javascript',
    });
  },
  methods: {
    purify() {
      cm.setValue(Terser.minify(cm.getValue(), pureOpt).code);
    },
    uglify() {
      cm.setValue(Terser.minify(cm.getValue(), ugliOpt).code);
    },
    minimize() {
      cm.setValue(Terser.minify(cm.getValue()).code);
    },
    beautify() {
      cm.setValue(beautify(cm.getValue()));
    },
  },
};
</script>

<style>
</style>
