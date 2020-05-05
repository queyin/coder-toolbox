<template>
  <div class="mdui-textfield">
    <label class="mdui-textfield-label">
      <slot></slot>
    </label>
    <textarea
      class="mdui-textfield-input"
      v-bind="$attrs"
      :value="value"
      @input="$emit('input', $event.target.value)"
    ></textarea>
    <div v-if="helper" class="mdui-textfield-helper">{{helper}}</div>
  </div>
</template>

<script>
export default {
  name: 'mdui-textarea',
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    value: String,
    helper: String,
  },
};
</script>

<style scoped>
.mdui-textfield-input {
  overflow-x: hidden;
}
</style>
