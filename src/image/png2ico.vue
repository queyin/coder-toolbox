<template>
  <mdui-container title="PNG 转 ICO" subtitle="Microsoft ICO / Apple ICNS">
    <div class="btn-bar mdui-m-t-3">
      <label class="mdui-btn mdui-btn-raised mdui-ripple" for="image-select">选择图片</label>
      <input
        type="file"
        id="image-select"
        accept="image/png"
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
    <div class="btn-bar mdui-m-t-2">
      <div>
        <label class="mdui-textfield-label">缩放算法</label>
        <mdui-select
          v-model="scalingAlgorithm"
          :options="[{value:'NEAREST_NEIGHBOR',text:'最近邻（超快，普通）'},{value:'BILINEAR',text:'双线性（快，还行）'},{value:'BICUBIC',text:'双立方（较慢，较好）'},{value:'BICUBIC2',text:'双立方*（快，较好）'},{value:'BEZIER',text:'Bezier（慢，高质量）'},{value:'HERMITE',text:'Hermite（慢，高质量）'}]"
        ></mdui-select>
      </div>
      <div>
        <label class="mdui-textfield-label">ICO 格式</label>
        <mdui-select
          v-model="iconFn"
          :options="[{value:'createICO',text:'Microsoft ICO (.ico)'},{value:'createICNS',text:'Apple ICNS (.icns)'}]"
        ></mdui-select>
      </div>
      <div
        v-if="iconFn == 'createICO'"
        mdui-tooltip="{content:'BMP：文件较大，兼容性强\nPNG：文件极小，但无法兼容 Vista 以前的系统'}"
      >
        <label class="mdui-textfield-label">内部格式</label>
        <mdui-select v-model="usePNG" :options="[{value:0,text:'BMP'},{value:1,text:'PNG'}]"></mdui-select>
      </div>
      <div>
        <div
          v-if="!(iconFn == 'createICO' && usePNG == '0')"
          mdui-tooltip="{content:'适当减少色彩数可以进一步减小文件体积，0 表示无损（不减少），最大 256。非无损情况下，Windows 图片查看器无法正常读取 ico，可直接拖至浏览器中查看效果'}"
        >
          <label class="mdui-textfield-label">色彩数</label>
          <input
            class="mdui-textfield-input"
            type="number"
            min="0"
            max="256"
            step="1"
            v-model.number="numOfColors"
          />
        </div>
      </div>
    </div>
    <div class="btn-bar" v-if="iconFn == 'createICO'">
      <label class="mdui-textfield-label">ICO 大小（可多选，将集合至同一文件）</label>
      <mdui-checkbox
        v-for="(val, size) in icoChunkSizes"
        :key="size"
        v-model="icoChunkSizes[size]"
      >{{size}}x{{size}}</mdui-checkbox>
    </div>
    <div v-if="iconFn == 'createICNS'" class="mdui-m-b-4">
      <label class="mdui-textfield-label">ICNS 将包含以下规格</label>
      <div class="mdui-table-fluid">
        <table class="mdui-table">
          <tbody>
            <tr>
              <td>
                <b>Type</b>
              </td>
              <td v-for="chunk of icnsChunks" :key="chunk.OSType">{{chunk.OSType}}</td>
            </tr>
            <tr>
              <td>
                <b>Size</b>
              </td>
              <td v-for="chunk of icnsChunks" :key="chunk.OSType">{{chunk.Size}}</td>
            </tr>
            <tr>
              <td>
                <b>Info</b>
              </td>
              <td v-for="chunk of icnsChunks" :key="chunk.OSType">{{chunk.Info}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="btn-bar mdui-m-t-2">
      <mdui-button class="mdui-color-theme" @click="convert" :disabled="disableBtn">转换</mdui-button>
      <mdui-button @click="download" v-if="resultBlob">下载</mdui-button>
      <div class="mdui-chip" v-if="resultBlob">
        <span class="mdui-chip-icon mdui-color-yellow-600">
          <i class="mdui-icon material-icons">crop_free</i>
        </span>
        <span class="mdui-chip-title">{{$root.fileSize(resultBlob.size)}}</span>
      </div>
    </div>
    <div v-if="resultBlob" class="mdui-m-t-2">
      <label class="mdui-textfield-label">效果预览</label>
      <img :src="resultBlobURL" class="mdui-shadow-3" style="max-height:200px" />
    </div>
  </mdui-container>
</template>

<script>
import png2icons from '../lib/png2icons';
import { saveAs } from 'file-saver';
import _ from 'lodash';

export default {
  name: 'image-png2ico',
  data: () => ({
    file: false,
    scalingAlgorithm: 'BEZIER',
    iconFn: 'createICO',
    usePNG: '1',
    numOfColors: 0,
    icoChunkSizes: _.transform(
      png2icons.icoChunkSizes,
      (o, v) => {
        o[v] = false;
      },
      {}
    ),
    icnsChunks: png2icons.icnsChunks,
    resultBlob: false,
  }),
  watch: {
    iconFn() {
      this.$mutation();
    },
  },
  computed: {
    blobURL() {
      if (!this.file) return '';
      return window.URL.createObjectURL(this.file);
    },
    resultBlobURL() {
      if (!this.resultBlob) return '';
      return window.URL.createObjectURL(this.resultBlob);
    },
    disableBtn() {
      if (this.file) {
        if (this.iconFn != 'createICO') return false;
        let cnt = 0;
        for (let checked of Object.values(this.icoChunkSizes)) {
          if (checked) cnt++;
        }
        if (cnt > 0) return false;
      }
      return true;
    },
    sizeArray() {
      let array = [];
      for (let size of Object.keys(this.icoChunkSizes)) {
        if (this.icoChunkSizes[size]) array.push(parseInt(size));
      }
      return array.reverse();
    },
    mime() {
      switch (this.iconFn) {
        case 'createICO':
          return 'image/x-icon';
        case 'createICNS':
          return 'image/icns';
      }
      return null;
    },
    ext() {
      switch (this.iconFn) {
        case 'createICO':
          return '.ico';
        case 'createICNS':
          return '.icns';
      }
      return '';
    },
    iconFilename() {
      let name = this.file.name;
      let dot = name.lastIndexOf('.');
      return name.substring(0, dot) + this.ext;
    },
  },
  methods: {
    convert() {
      let reader = new FileReader();
      reader.readAsArrayBuffer(this.file);
      reader.onloadend = () => {
        let buffer = png2icons[this.iconFn](reader.result, png2icons[this.scalingAlgorithm], this.numOfColors, this.usePNG == 1, this.sizeArray);
        this.resultBlob = new Blob([buffer], { type: this.mime });
      };
    },
    download() {
      saveAs(this.resultBlob, this.iconFilename);
    },
  },
};
</script>

<style>
</style>
