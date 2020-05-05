<template>
  <mdui-container title="CSS" subtitle="格式化 / 压缩 / 优化">
    <div id="codemirror" class="mdui-shadow-2 mdui-m-b-2"></div>
    <div class="btn-bar">
      <mdui-button @click="beautify">格式化</mdui-button>
      <mdui-button @click="purify" mdui-tooltip="{content:'删除不必要的空格和换行'}">净化</mdui-button>
      <mdui-button
        class="mdui-color-theme"
        @click="minimize"
        mdui-tooltip="{content:'在“净化”的基础上删除注释和不必要的单位表示，将 rgb 颜色转换为更短的十六进制表示'}"
      >压缩</mdui-button>
      <mdui-button
        class="mdui-color-theme-700"
        @click="optimize"
        mdui-tooltip="{content:'在“压缩”的基础上合并属性与规则，删除重复的规则'}"
      >压缩并优化</mdui-button>
    </div>
  </mdui-container>
</template>

<script>
import CodeMirror from 'codemirror';
// require('codemirror/mode/css/css');

import CleanCSS from 'clean-css';
const pure = new CleanCSS({ level: 0 });
const mini = new CleanCSS({ level: 1 });
const opti = new CleanCSS({ level: 2 });

const beautify = require('js-beautify').css;

let cm;

export default {
  name: 'code-css',
  mounted() {
    cm = CodeMirror(document.getElementById('codemirror'), {
      indentUnit: 4,
      lineWrapping: true,
      lineNumbers: true,
      mode: 'css',
    });
  },
  methods: {
    purify() {
      cm.setValue(pure.minify(cm.getValue()).styles);
    },
    minimize() {
      cm.setValue(mini.minify(cm.getValue()).styles);
    },
    optimize() {
      cm.setValue(opti.minify(cm.getValue()).styles);
    },
    beautify() {
      cm.setValue(beautify(cm.getValue()));
    },
  },
};
</script>

<style>
</style>
