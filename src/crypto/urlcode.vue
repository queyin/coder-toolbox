<template>
  <mdui-container title="URL" subtitle="编码 / 解码">
    <mdui-textarea rows="10" v-model="bef">编码前</mdui-textarea>
    <div class="btn-bar mdui-m-t-2">
      <mdui-button @click="decode">
        <i class="mdui-icon material-icons">expand_less</i>解码
      </mdui-button>
      <mdui-button class="mdui-color-theme" @click="encode">
        <i class="mdui-icon material-icons">expand_more</i>编码
      </mdui-button>
      <mdui-checkbox
        v-model="opt.component"
        mdui-tooltip="{content:'用于作为 URL 参数的情况，即使用 encodeURIComponent() 或 decodeURIComponent() 来编解码'}"
      >全部编码</mdui-checkbox>
      <mdui-checkbox v-model="opt.batch" mdui-tooltip="{content:'勾选后会将每行独立进行编解码'}">批量模式</mdui-checkbox>
    </div>
    <mdui-textarea rows="10" v-model="aft">编码后</mdui-textarea>
  </mdui-container>
</template>

<script>
export default {
  name: 'crypto-urlcode',
  data: () => ({
    bef: 'https://lolicon.dev/test url/测试_URL',
    aft: '',
    opt: {
      component: false,
      batch: false,
    },
  }),
  computed: {
    encodeFn() {
      if (this.opt.component) return encodeURIComponent;
      return encodeURI;
    },
    decodeFn() {
      if (this.opt.component) return decodeURIComponent;
      return decodeURI;
    },
  },
  methods: {
    encode() {
      let befs = this.opt.batch ? this.bef.split('\n') : [this.bef];
      let afts = [];
      try {
        for (let bef of befs) {
          afts.push(this.encodeFn(bef));
        }
        this.aft = afts.join('\n');
      } catch (error) {
        this.$snackbar('编码失败，我也不知道为什么会这样（');
      }
    },
    decode() {
      let afts = this.opt.batch ? this.aft.split('\n') : [this.aft];
      let befs = [];
      try {
        for (let aft of afts) {
          befs.push(this.decodeFn(aft));
        }
        this.bef = befs.join('\n');
      } catch (error) {
        this.$snackbar('解码失败，请检查内容');
      }
    },
  },
};
</script>

<style>
</style>
