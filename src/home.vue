<template>
  <mdui-container>
    <img
      ondragstart="return false;"
      class="mdui-center mdui-m-b-4"
      mdui-tooltip="{content: 'хорошо~', position: 'left'}"
      src="./assets/logo.png"
    />
    <img ondragstart="return false;" class="mdui-center" src="./assets/tb_text.png" />
  </mdui-container>
</template>

<script>
import { dependencies } from '../package.json';

export default {
  name: 'app-home',
  data: () => ({
    pkgs: Object.keys(dependencies),
  }),
};
</script>

<style scoped>
img {
  max-width: 100%;
}
</style>
