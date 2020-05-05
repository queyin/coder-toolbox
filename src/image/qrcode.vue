<template>
  <mdui-container title="二维码生成" subtitle="QR Code">
    <mdui-textarea rows="5" v-model="content">内容</mdui-textarea>
    <div id="flex-box">
      <div class="flex-content" style="width:300px">
        <div class="mdui-textfield">
          <label class="mdui-textfield-label">大小（像素）</label>
          <input class="mdui-textfield-input" type="number" v-model.number="opt.width" />
        </div>
        <div class="mdui-textfield">
          <label class="mdui-textfield-label">最小块大小（像素）</label>
          <input class="mdui-textfield-input" type="number" v-model.number="opt.scale" />
        </div>
        <div class="mdui-textfield o-v">
          <label class="mdui-textfield-label">边距大小</label>
          <label class="mdui-slider mdui-slider-discrete">
            <input type="range" step="1" min="0" max="10" v-model="opt.margin" />
          </label>
        </div>
        <div class="mdui-textfield o-v">
          <label
            class="mdui-textfield-label mdui-text-capitalize"
          >容错级别「{{ecl[opt.errorCorrectionLevel]}}」</label>
          <label class="mdui-slider mdui-slider-discrete">
            <input type="range" step="1" min="1" max="4" v-model="opt.errorCorrectionLevel" />
          </label>
        </div>
        <div class="mdui-textfield">
          <label class="mdui-textfield-label">前景色（16进制RGBA）</label>
          <input
            class="mdui-textfield-input mdui-text-uppercase"
            type="text"
            v-model.trim="opt.color.dark"
            placeholder="#000000FF"
          />
        </div>
        <div class="mdui-textfield">
          <label class="mdui-textfield-label">背景色（16进制RGBA）</label>
          <input
            class="mdui-textfield-input mdui-text-uppercase"
            type="text"
            v-model.trim="opt.color.light"
            placeholder="#FFFFFFFF"
          />
        </div>
        <div class="mdui-chip mdui-m-t-1">
          <span class="mdui-chip-icon mdui-color-theme">
            <i class="mdui-icon material-icons">save</i>
          </span>
          <span class="mdui-chip-title">PC上右击图片另存为，手机上长按保存</span>
        </div>
      </div>
      <div class="flex-content">
        <qrcode class="mdui-m-t-2 mdui-shadow-2" :value="content" :options="options" tag="img"></qrcode>
      </div>
    </div>
  </mdui-container>
</template>

<script>
import VueQrcode from '@chenfengyuan/vue-qrcode';

const ecl = {
  1: 'low',
  2: 'medium',
  3: 'quartile',
  4: 'high',
};

export default {
  name: 'image-qrcode',
  data: () => ({
    content: 'https://lolicon.dev',
    opt: {
      width: 200,
      scale: 4,
      errorCorrectionLevel: 2,
      margin: 0,
      color: {
        dark: '#000000ff',
        light: '#ffffffff',
      },
    },
    ecl,
  }),
  computed: {
    options() {
      return {
        ...this.opt,
        errorCorrectionLevel: ecl[this.opt.errorCorrectionLevel],
      };
    },
  },
  components: {
    qrcode: VueQrcode,
  },
};
</script>

<style scoped>
#flex-box {
  display: flex;
  flex-wrap: wrap;
  margin-right: -16px;
}
.flex-content {
  flex-grow: 1;
  margin-right: 16px;
}
</style>
