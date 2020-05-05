<template>
  <mdui-container class="md-body mdui-typo">
    <img
      ondragstart="return false;"
      class="mdui-center"
      mdui-tooltip="{content: 'хорошо~', position: 'left'}"
      src="./assets/logo.png"
    />
    <p>这是一个纯 JavaScript 实现的工具箱，没有依赖任何后端，为的是可以<del class="mdui-text-color-black-disabled">白嫖</del>直接使用 Pages 服务部署。</p>
    <p>它是我学习 Vue.js 的副产物，顺便想看看仅靠在客户端上运行 JavaScript 到底能做多少事情，仅此而已。</p>
    <p>功能可能时不时会添加。</p>
    <h2>感谢</h2>
    <p>本工具箱或多或少地参考了这些应用，它们也都是非常优秀的工具箱应用：</p>
    <ul>
      <li>
        <a href="https://www.boxmoe.tools" target="_blank">www.boxmoe.tools</a>
      </li>
      <li>
        <a href="https://tool.lu" target="_blank">tool.lu</a>
      </li>
      <li>
        <a href="https://www.sojson.com" target="_blank">www.sojson.com</a>
      </li>
      <li>
        <a href="http://tool.oschina.net" target="_blank">tool.oschina.net</a>
      </li>
    </ul>
    <h2>借物表</h2>
    <p>
      <a
        class="mdui-m-r-2"
        v-for="pkg of pkgs"
        :key="pkg"
        :href="'https://www.npmjs.com/package/'+pkg"
        target="_blank"
      >{{pkg}}</a>
    </p>
    <h2>版权</h2>
    <!--prettyhtml-preserve-whitespace-->
    <p>Logo 以及 favicon 的版权为<a href="https://www.pixiv.net/u/8745555" target="_blank">冬夏</a>所有</p>
    <!--prettyhtml-preserve-whitespace-->
    <p>右下角的響来自<a href="https://www.pixiv.net/i/54304434" target="_blank">「猫★」/「ふわり」</a></p>
    <!--prettyhtml-preserve-whitespace-->
    <p class="mdui-text-center mdui-m-b-0">Made with ❤️ by <a href="https://moe.best/" target="_blank">神代綺凜</a></p>
  </mdui-container>
</template>

<script>
import { dependencies } from '../package.json';
import _ from 'lodash';

export default {
  name: 'app-home',
  data: () => ({
    pkgs: _.difference(Object.keys(dependencies), ['core-js', 'vue', 'vue-router', 'lodash', 'mdui']),
  }),
};
</script>

<style>
</style>
