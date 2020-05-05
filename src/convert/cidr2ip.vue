<template>
  <mdui-container title="CIDR to IP" subtitle="仅支持 IPv4">
    <mdui-textarea
      rows="5"
      v-model="cidrs"
      placeholder="10.0.0.0/8
172.16.0.0/12
192.168.0.0/16"
    >CIDR 多个以空格或换行分隔</mdui-textarea>
    <div class="btn-bar mdui-m-t-2">
      <mdui-button class="mdui-color-theme" @click="getBlocks">转换</mdui-button>
    </div>
    <template v-if="blocks">
      <div class="btn-bar mdui-m-t-2">
        <label class="mdui-textfield-label">选择列</label>
        <mdui-checkbox
          v-for="col of cols"
          :key="'c-'+col"
          v-model="selectCols[col]"
          class="mdui-text-capitalize"
        >{{col}}</mdui-checkbox>
        <mdui-button class="mdui-color-theme" @click="exportCSV">
          <i class="mdui-icon material-icons">insert_drive_file</i>导出为 CSV
        </mdui-button>
      </div>
      <div class="mdui-table-fluid" style="max-height:600px">
        <table class="mdui-table mdui-table-hoverable">
          <thead>
            <tr>
              <th
                v-for="col of cols"
                :key="'h-'+col"
                :class="'mdui-text-capitalize' + (col=='size'?' mdui-table-col-numeric':'')"
                v-show="selectCols[col]"
              >{{col}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="block of blocks" :key="block.base+'/'+block.bitmask">
              <td
                v-for="col of cols"
                :key="block.base+'/'+block.bitmask+'-'+col"
                :class="col=='size'?'mdui-table-col-numeric':false"
                v-show="selectCols[col]"
              >{{block[col]}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </mdui-container>
</template>

<script>
import CidrRegex from 'cidr-regex';
import { Netmask } from 'netmask';
import { saveAs } from 'file-saver';

const EOL = '\n';

const cols = ['base', 'first', 'last', 'broadcast', 'mask', 'bitmask', 'hostmask', 'size'];

export default {
  name: 'convert-cidr2ip',
  data: () => ({
    cols,
    cidrs: `10.0.0.0/8
172.16.0.0/12
192.168.0.0/16`,
    blocks: false,
    selectCols: {
      base: true,
      first: true,
      last: true,
      broadcast: true,
      mask: true,
      bitmask: false,
      hostmask: false,
      size: true,
    },
  }),
  methods: {
    getBlocks() {
      let cidrs = this.cidrs.match(CidrRegex.v4());
      if (!cidrs) return;
      cidrs = Array.from(new Set(cidrs));
      let blocks = [];
      for (let cidr of cidrs) {
        blocks.push(new Netmask(cidr));
      }
      this.blocks = blocks;
    },
    exportCSV() {
      let csv = '';
      let selected = [];
      for (let col of cols) {
        if (this.selectCols[col]) selected.push(col);
      }
      if (selected.length == 0) {
        this.$snackbar('啥都没选拿头导出啊~');
        return;
      }
      csv += selected.join(',') + EOL;
      for (let block of this.blocks) {
        let row = [];
        for (let col of selected) {
          row.push(block[col]);
        }
        csv += row.join(',') + EOL;
      }
      saveAs(new Blob([csv], { type: 'text/csv' }), `ip_${new Date().getTime()}.csv`);
    },
  },
};
</script>
