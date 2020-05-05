<template>
  <mdui-container title="Base64" subtitle="编码 / 解码">
    <mdui-textarea rows="10" v-model="bef">编码前</mdui-textarea>
    <div class="btn-bar mdui-m-t-2">
      <mdui-button @click="decode">
        <i class="mdui-icon material-icons">expand_less</i>解码
      </mdui-button>
      <mdui-button class="mdui-color-theme" @click="encode">
        <i class="mdui-icon material-icons">expand_more</i>编码
      </mdui-button>
      <!--prettyhtml-preserve-whitespace-->
      <span>
        <!--prettyhtml-preserve-attribute-wrapping-->
        编码结果每<input v-model.number="bre" class="mdui-textfield-input mdui-text-center" type="number" style="display:inline;width:56px" />个字符换行（可选）
      </span>
      <mdui-checkbox v-model="customize">自定义码表</mdui-checkbox>
    </div>
    <div id="customize" v-if="customize">
      <mdui-textarea v-model="codeStr" helper="注意：若使用多个字符作为项，请确保解码时不会产生歧义">自定义码表，每项之间以空格隔开</mdui-textarea>
      <div class="mdui-table-fluid">
        <table id="base64-table" class="mdui-table">
          <thead>
            <tr>
              <td>
                <b>#</b>
              </td>
              <td v-for="n in 64" :key="'head-' + n">{{n>=10?n:'0'+n}}</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <b>原</b>
              </td>
              <td v-for="ch of origBase64Arr" :key="'orig-' + ch">{{ch}}</td>
            </tr>
            <tr>
              <td>
                <b>现</b>
              </td>
              <td v-for="ch of codeArr" :key="'now-' + ch">{{ch}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <mdui-textarea rows="10" v-model="aft">编码后</mdui-textarea>
  </mdui-container>
</template>

<script>
import { Base64 } from 'js-base64';

const origBase64Arr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

const regSym = ['\\', '^', '$', '*', '+', '?', '|'];

const charToReg = ch => {
  if (regSym.includes(ch)) ch = '\\' + ch;
  return new RegExp(ch, 'g');
};

export default {
  name: 'crypto-base64',
  data: () => ({
    bef: '这是一段测试文本。\nThis is a test text.',
    aft: '',
    bre: '',
    customize: false,
    codeStr:
      '乾 坤 屯 蒙 需 讼 师 比 小畜 履 泰 否 同人 大有 谦 豫 随 蛊 临 观 噬嗑 贲 剥 复 无妄 大畜 颐 大过 坎 离 咸 恒 遁 大壮 晋 明夷 家人 睽 蹇 解 损 益 夬 姤 萃 升 困 井 革 鼎 震 艮 渐 归妹 丰 旅 巽 兑 涣 节 中孚 小过 既济 未济',
    origBase64Arr,
  }),
  computed: {
    codeArr() {
      return this.codeStr
        .trim()
        .replace(/( |\t){2,}/g, ' ')
        .split(' ', 64);
    },
    codeMap() {
      let ca = this.codeArr;
      let map = {};
      for (let i = 0; i < 64; i++) {
        map[origBase64Arr[i]] = ca[i] || origBase64Arr[i];
      }
      return map;
    },
  },
  watch: {
    bre(val) {
      if (val == '') return;
      if (typeof val != 'number' || val < 0) this.bre = 0;
    },
    customize(val) {
      if (val) this.$mutation();
    },
  },
  methods: {
    encode() {
      try {
        let enc = Base64.encode(this.bef);
        if (this.customize) {
          if (this.codeArr.length != 64) {
            this.$snackbar('自定义码表长度有误，请检查');
            return;
          }
          let cm = this.codeMap;
          for (let orig in cm) {
            enc = enc.replace(charToReg(orig), cm[orig]);
          }
        }
        if (typeof this.bre == 'number' && this.bre > 0) {
          let tmp = [];
          for (let i = 0; i < enc.length; i += this.bre) {
            tmp.push(enc.slice(i, i + this.bre));
          }
          enc = tmp.join('\n');
        }
        this.aft = enc;
      } catch (error) {
        this.$snackbar('编码失败，我也不知道为什么会这样（');
      }
    },
    decode() {
      try {
        let dec = this.aft;
        if (this.customize) {
          if (this.codeArr.length != 64) {
            this.$snackbar('自定义码表长度有误，请检查');
            return;
          }
          let cm = this.codeMap;
          for (let orig in cm) {
            dec = dec.replace(charToReg(cm[orig]), orig);
          }
        }
        this.bef = Base64.decode(dec);
      } catch (error) {
        this.$snackbar('解码失败，请检查内容或自定义码表是否有误');
      }
    },
  },
};
</script>

<style scoped>
td {
  padding-left: 4px;
  padding-right: 4px;
  text-align: center;
  line-height: 1;
}
</style>
