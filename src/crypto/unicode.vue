<template>
  <mdui-container title="Unicode" subtitle="编码 / 解码">
    <mdui-textarea rows="10" v-model="bef">编码前</mdui-textarea>
    <div class="btn-bar mdui-m-t-2">
      <mdui-button @click="bef = unicodeString==0 ? decode(aft) : decode_u(aft)">
        <i class="mdui-icon material-icons">expand_less</i>解码
      </mdui-button>
      <mdui-button
        class="mdui-color-theme"
        @click="aft = unicodeString==0 ? encode(bef, opt) : encode_u(bef,opt.encodeEverything)"
      >
        <i class="mdui-icon material-icons">expand_more</i>编码
      </mdui-button>
      <mdui-select
        :options="[{value:0,text:'&\#____;'},{value:1,text:'\\u____'}]"
        v-model="unicodeString"
      ></mdui-select>
      <mdui-checkbox
        v-model="opt.encodeEverything"
        mdui-tooltip="{content:'不勾选时，英文数字以及不需要转义的字符不会被编码'}"
      >全部编码</mdui-checkbox>
      <mdui-checkbox
        v-show="unicodeString == 0"
        v-model="opt.decimal"
        mdui-tooltip="{content:'&#x26;#xA9; => &#x26;#169;'}"
      >编码使用十进制表示</mdui-checkbox>
      <mdui-checkbox
        v-show="unicodeString == 0"
        v-model="opt.useNamedReferences"
        mdui-tooltip="{content:'&#x26;#x26; => &#x26;amp;'}"
      >编码使用实体名称</mdui-checkbox>
    </div>
    <mdui-textarea rows="10" v-model="aft">编码后</mdui-textarea>
  </mdui-container>
</template>

<script>
import He from 'he';

export default {
  name: 'crypto-unicode',
  data: () => ({
    bef: '这是一段测试文本。\nThis © is a ≠ test 𝌆 text.',
    aft: '',
    opt: {
      useNamedReferences: false,
      decimal: false,
      encodeEverything: false,
    },
    unicodeString: '0',
  }),
  methods: {
    encode() {
      try {
        return He.encode(...arguments);
      } catch (error) {
        this.$snackbar('编码失败，我也不知道为什么会这样（');
      }
    },
    decode() {
      try {
        return He.decode(...arguments);
      } catch (error) {
        this.$snackbar('解码失败，请检查内容');
      }
    },
    encode_u(text, encodeEverything) {
      let result = '';
      for (let ch of text) {
        let cp = ch.codePointAt(0);
        if (!encodeEverything && 32 <= cp && cp <= 126) {
          result += ch;
          continue;
        }
        for (let i = 0; i < ch.length; i++) {
          let unicode = ('0000' + ch.charCodeAt(i).toString(16)).slice(-4);
          result += `\\u${unicode}`;
        }
      }
      return result;
    },
    decode_u(text) {
      return text.replace(/\\u([\dA-Fa-f]{4})/g, (match, p1) => {
        return String.fromCharCode(parseInt(p1, 16));
      });
    },
  },
};
</script>

<style>
</style>
