<template>
  <div class="mdui-textfield mdui-textfield-floating-label">
    <label class="mdui-textfield-label">
      <slot></slot>
    </label>
    <input
      class="mdui-textfield-input"
      type="text"
      v-bind="$attrs"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: 'mdui-textfield',
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    value: String,
  },
};
</script>
