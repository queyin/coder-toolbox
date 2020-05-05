<template>
  <mdui-container title="Data URI" subtitle="图片 ⇔ Base64 URI">
    <div class="mdui-tab" mdui-tab>
      <a href="#img2uri" class="mdui-ripple">图片转 URI</a>
      <a href="#uri2img" class="mdui-ripple">URI 转图片</a>
    </div>
    <div id="img2uri">
      <div class="btn-bar mdui-m-t-3">
        <label class="mdui-btn mdui-btn-raised mdui-ripple" for="image-select">选择图片</label>
        <input
          type="file"
          id="image-select"
          accept="image/*"
          style="display:none"
          ref="image"
          @change="file = $refs.image.files[0]"
        />
        <template v-if="file">
          <div class="mdui-chip">
            <span class="mdui-chip-icon mdui-color-red-600">
              <i class="mdui-icon material-icons">attach_file</i>
            </span>
            <span class="mdui-chip-title mdui-text-truncate" style="max-width:200px">{{file.name}}</span>
          </div>
          <div class="mdui-chip">
            <span class="mdui-chip-icon mdui-color-yellow-600">
              <i class="mdui-icon material-icons">crop_free</i>
            </span>
            <span class="mdui-chip-title">{{$root.fileSize(file.size)}}</span>
          </div>
          <div class="mdui-chip">
            <span class="mdui-chip-icon mdui-color-green-600">
              <i class="mdui-icon material-icons">insert_drive_file</i>
            </span>
            <span class="mdui-chip-title">{{file.type}}</span>
          </div>
        </template>
      </div>
      <img v-if="file" :src="blobURL" class="mdui-shadow-3" style="max-height:200px" />
      <div v-if="file && file.size>64*1024" class="mdui-card mdui-m-y-3">
        <div class="mdui-card-content">
          考虑到大小，该图片已经不适合转换成 Data URI 形式直接内嵌在 HTML 中了，确定仍要转换吗？
          <br />注意：由于文本编码十分庞大，转换以及调整浏览器窗口大小都可能会造成网页数秒无响应，请在得到转换结果后及时清空文本框。
        </div>
      </div>
      <div class="btn-bar mdui-m-t-2">
        <mdui-button class="mdui-color-theme" @click="getDataURI" :disabled="file === false">
          <i class="mdui-icon material-icons">expand_more</i>转换
        </mdui-button>
      </div>
      <mdui-textarea rows="10" v-model="dataURI">Data URI</mdui-textarea>
    </div>
    <div id="uri2img">
      <mdui-textarea
        rows="10"
        v-model="inputURI"
        placeholder="data:image/xxx;base64,xxxx..."
      >Data URI</mdui-textarea>
      <div class="btn-bar mdui-m-t-2">
        <mdui-button class="mdui-color-theme" @click="checkURI">
          <i class="mdui-icon material-icons">expand_more</i>转换
        </mdui-button>
      </div>
      <template v-if="showImgURI">
        <p>右击另存为图片即可</p>
        <img v-if="showImgURI" :src="showImgURI" class="mdui-shadow-3" />
      </template>
    </div>
  </mdui-container>
</template>

<script>
import { Base64 } from 'js-base64';

export default {
  name: 'image-datauri',
  data: () => ({
    file: false,
    dataURI: '',
    inputURI: '',
    showImgURI: false,
  }),
  computed: {
    blobURL() {
      if (!this.file) return '';
      return window.URL.createObjectURL(this.file);
    },
  },
  methods: {
    getDataURI() {
      let reader = new FileReader();
      reader.readAsBinaryString(this.file);
      reader.onloadend = () => {
        this.dataURI = `data:${this.file.type};base64,${Base64.btoa(reader.result)}`;
      };
    },
    checkURI() {
      if (!/^data:image\/.+;base64,/.exec(this.inputURI)) {
        this.$snackbar('Data URI 格式错误');
        return;
      }
      this.showImgURI = this.inputURI;
    },
  },
};
</script>

<style>
</style>
