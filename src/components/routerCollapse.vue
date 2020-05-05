<template>
  <div class="mdui-collapse-item mdui-collapse-item-open">
    <div class="mdui-collapse-item-header mdui-list-item mdui-ripple">
      <i
        :class="'mdui-list-item-icon mdui-icon material-icons mdui-text-color-' + iconColor"
      >{{icon}}</i>
      <div class="mdui-list-item-content">{{text}}</div>
      <i class="mdui-collapse-item-arrow mdui-icon material-icons">keyboard_arrow_down</i>
    </div>
    <div class="mdui-collapse-item-body mdui-list">
      <router-link v-for="r of routers" :key="r.to" :to="r.to" class="mdui-list-item mdui-ripple">
        <div class="mdui-list-item-content">
          <div class="mdui-list-item-title">{{r.title}}</div>
          <div class="mdui-list-item-text">{{r.text}}</div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'router-collapse',
  props: {
    text: String,
    icon: String,
    iconColor: String,
    routers: Array,
  },
};
</script>
