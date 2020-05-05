import Mdui from 'mdui';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import Home from './home.vue';
import About from './about.vue';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import './logo';

const $ = Mdui.JQ;
Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.prototype.$$ = $;
Vue.prototype.$snackbar = function(message) {
  return Mdui.snackbar({
    message,
    timeout: 0,
  });
};
Vue.prototype.$mutation = function() {
  this.$nextTick(Mdui.mutation);
};

//批量全局注册基础组件
const requireComponent = require.context('./components', false, /mdui.+\.vue$/);
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);
  const componentName = upperFirst(camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1')));
  Vue.component(componentName, componentConfig.default || componentConfig);
});

//路由
const router = new VueRouter({
  routes: [
    // jshint ignore: start
    {
      path: '/',
      component: Home,
    },
    {
      path: '/about',
      component: About,
    },
    {
      path: '/code/html',
      component: () => import('./code/html.vue'),
    },
    {
      path: '/code/css',
      component: () => import('./code/css.vue'),
    },
    {
      path: '/code/js',
      component: () => import('./code/js.vue'),
    },
    {
      path: '/crypto/base64',
      component: () => import('./crypto/base64.vue'),
    },
    {
      path: '/crypto/unicode',
      component: () => import('./crypto/unicode.vue'),
    },
    {
      path: '/crypto/urlcode',
      component: () => import('./crypto/urlcode.vue'),
    },
    {
      path: '/crypto/hash',
      component: () => import('./crypto/hash.vue'),
    },
    {
      path: '/crypto/crypt',
      component: () => import('./crypto/crypt.vue'),
    },
    {
      path: '/image/datauri',
      component: () => import('./image/datauri.vue'),
    },
    {
      path: '/image/png2ico',
      component: () => import('./image/png2ico.vue'),
    },
    {
      path: '/image/qrcode',
      component: () => import('./image/qrcode.vue'),
    },
    {
      path: '/convert/cidr2ip',
      component: () => import('./convert/cidr2ip.vue'),
    },
    {
      path: '*',
      redirect: '/',
    },
    // jshint ignore: end
  ],
});

const routerCollapses = [
  {
    text: '代码压缩',
    icon: 'code',
    iconColor: 'purple',
    routers: [
      {
        to: '/code/html',
        title: 'HTML',
        text: '格式化 / 压缩',
      },
      {
        to: '/code/css',
        title: 'CSS',
        text: '格式化 / 压缩 / 优化',
      },
      {
        to: '/code/js',
        title: 'JS',
        text: '格式化 / 混淆 / 压缩',
      },
    ],
  },
  {
    text: '编码加密',
    icon: 'lock',
    iconColor: 'teal',
    routers: [
      {
        to: '/crypto/base64',
        title: 'Base64',
        text: '支持自定义码表',
      },
      {
        to: '/crypto/unicode',
        title: 'Unicode',
        text: 'HTML 字符实体编码',
      },
      {
        to: '/crypto/urlcode',
        title: 'URL 编码',
        text: 'encodeURI()',
      },
      {
        to: '/crypto/hash',
        title: '哈希',
        text: 'MD5 / SHA ...',
      },
      {
        to: '/crypto/crypt',
        title: '加密',
        text: 'AES / DES / RC4 ...',
      },
    ],
  },
  {
    text: '图片相关',
    icon: 'image',
    iconColor: 'deep-orange',
    routers: [
      {
        to: '/image/datauri',
        title: 'Data URI',
        text: '图片 ⇔ Base64 URI',
      },
      {
        to: '/image/png2ico',
        title: 'PNG 转 ICO',
        text: 'favicon 制作',
      },
      {
        to: '/image/qrcode',
        title: '二维码生成',
        text: 'QR Code',
      },
    ],
  },
  {
    text: '各种转换',
    icon: 'autorenew',
    iconColor: 'brown',
    routers: [
      {
        to: '/convert/cidr2ip',
        title: 'CIDR to IP',
        text: '批量转换',
      },
    ],
  },
];

//打开路由页面后处理导航栏
router.afterEach(() => {
  Vue.nextTick(() => {
    Vue.nextTick(Mdui.mutation);
    $('.mdui-drawer .router-link-active:not(.no-active)')
      .addClass('mdui-list-item-active')
      .parent()
      .parent()
      .addClass('mdui-collapse-item-open');
  });
});

new Vue({
  router,
  render: h => h(App),
  mounted: function() {
    this.$mutation();
  },
  data: {
    routerCollapses,
  },
  methods: {
    fileSize(size) {
      const unit = ['B', 'KB', 'MB'];
      let lv = 0;
      while (size > 1024 && lv < 2) {
        size /= 1024;
        lv++;
      }
      return `${size.toFixed(2)} ${unit[lv]}`;
    },
  },
}).$mount('#app');
