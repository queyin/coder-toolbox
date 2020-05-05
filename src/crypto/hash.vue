<template>
  <mdui-container title="哈希" subtitle="MD5 / SHA ...">
    <div class="mdui-chip">
      <span class="mdui-chip-icon mdui-color-amber-accent">
        <i class="mdui-icon material-icons">info_outline</i>
      </span>
      <span class="mdui-chip-title">哈希计算是不可逆的</span>
    </div>
    <mdui-textarea rows="10" v-model="bef">明文</mdui-textarea>
    <div class="btn-bar mdui-m-t-2">
      <mdui-button class="mdui-color-theme" @click="getHash">
        <i class="mdui-icon material-icons">expand_more</i>计算
      </mdui-button>
      <mdui-select
        :options="['MD5','SHA1','SHA256','SHA224','SHA512','SHA384','SHA3','RIPEMD160']"
        v-model="algo"
      ></mdui-select>
      <mdui-checkbox v-model="hmac">Hmac</mdui-checkbox>
      <input
        v-if="hmac"
        v-model="secret"
        class="mdui-textfield-input"
        type="text"
        style="display:inline;width:auto"
        placeholder="密钥"
      />
    </div>
    <mdui-textarea rows="4" v-model="aft">哈希码</mdui-textarea>
  </mdui-container>
</template>

<script>
import CryptoJS from 'crypto-js';

export default {
  name: 'crypto-hash',
  data: () => ({
    bef: '这是一段测试文本。This is a test text.',
    aft: '',
    algo: 'MD5',
    hmac: false,
    secret: '',
  }),
  methods: {
    getHash() {
      if (this.hmac) this.aft = CryptoJS['Hmac' + this.algo](this.bef, this.secret).toString();
      else this.aft = CryptoJS[this.algo](this.bef).toString();
    },
  },
};
</script>

<style>
</style>
