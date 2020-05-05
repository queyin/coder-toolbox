<template>
  <mdui-container title="加密" subtitle="AES / DES / RC4 ...">
    <mdui-textarea rows="10" v-model="bef">明文</mdui-textarea>
    <mdui-textfield v-model="secret">密钥</mdui-textfield>
    <div class="btn-bar mdui-m-t-2">
      <mdui-button @click="decrypt">
        <i class="mdui-icon material-icons">expand_less</i>解密
      </mdui-button>
      <mdui-button class="mdui-color-theme" @click="encrypt">
        <i class="mdui-icon material-icons">expand_more</i>加密
      </mdui-button>
      <mdui-select
        :options="['AES','DES','RC4','RC4Drop','Rabbit','RabbitLegacy','TripleDES']"
        v-model="algo"
      ></mdui-select>
    </div>
    <mdui-textarea rows="10" v-model="aft">密文</mdui-textarea>
  </mdui-container>
</template>

<script>
import CryptoJS from 'crypto-js';

export default {
  name: 'crypto-crypt',
  data: () => ({
    bef: '这是一段测试文本。This is a test text.',
    aft: '',
    algo: 'AES',
    secret: '',
  }),
  methods: {
    encrypt() {
      let encrypted = CryptoJS[this.algo].encrypt(this.bef, this.secret);
      this.aft = encrypted.toString();
    },
    decrypt() {
      let decrypted = CryptoJS[this.algo].decrypt(this.aft, this.secret);
      if (decrypted.sigBytes < 0) {
        this.$snackbar('解密失败，信息有误');
        return;
      }
      this.bef = decrypted.toString(CryptoJS.enc.Utf8);
    },
  },
};
</script>

<style>
</style>
