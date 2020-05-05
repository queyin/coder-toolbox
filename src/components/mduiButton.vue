<template>
  <button class="mdui-btn mdui-btn-raised mdui-ripple" v-on="$listeners" v-bind="$attrs">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'mdui-button',
};
</script>

<style scoped>
.mdui-icon {
  margin-left: -6px;
}
</style>
