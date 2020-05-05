<template>
  <label class="mdui-checkbox mdui-p-l-3" v-bind="$attrs">
    <input type="checkbox" :checked="checked" @change="$emit('change', $event.target.checked)" />
    <i class="mdui-checkbox-icon"></i>
    <slot></slot>
  </label>
</template>

<script>
export default {
  name: 'mdui-checkbox',
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    checked: Boolean,
  },
};
</script>

<style scoped>
.mdui-checkbox-icon {
  box-shadow: none !important;
}
</style>
