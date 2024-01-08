import SvgIcon from './SvgIcon.vue'

// Svg图标插件
export default {
  install: (app) => {
    // 注册全局组件
    app.component('svg-icon', SvgIcon)
  }
}
