<template>
  <div class="mdui-container">
    <div class="mdui-row">
      <div class="mdui-center mdui-col-xs-12 mdui-col-md-11 mdui-col-lg-10 mdui-col-xl-9 no-float">
        <div class="mdui-typo" v-if="title">
          <h1>
            {{title}}
            <small v-if="subtitle">{{subtitle}}</small>
          </h1>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mdui-container',
  props: {
    title: String,
    subtitle: String,
  },
};
</script>

<style>
</style>
