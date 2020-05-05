<template>
  <mdui-container title="HTML" subtitle="格式化 / 压缩">
    <div id="codemirror" class="mdui-shadow-2 mdui-m-b-2"></div>
    <div class="btn-bar">
      <mdui-button @click="beautify">格式化</mdui-button>
      <mdui-button
        class="mdui-color-theme"
        @click="minimize"
        mdui-tooltip="{content:'删除不必要的空格和换行'}"
      >压缩</mdui-button>
    </div>
  </mdui-container>
</template>

<script>
import CodeMirror from 'codemirror';
// require('codemirror/mode/htmlmixed/htmlmixed');

import Minimize from 'minimize';
const mini = new Minimize({ quotes: true });

const beautify = require('js-beautify').html;

let cm;

export default {
  name: 'code-html',
  mounted() {
    cm = CodeMirror(document.getElementById('codemirror'), {
      indentUnit: 4,
      lineWrapping: true,
      lineNumbers: true,
      mode: 'htmlmixed',
    });
  },
  methods: {
    minimize() {
      cm.setValue(mini.parse(cm.getValue()));
    },
    beautify() {
      cm.setValue(beautify(cm.getValue()));
    },
  },
};
</script>

<style>
</style>
