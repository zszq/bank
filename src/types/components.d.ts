// import SvgIcon from '@/icons/SvgIcon.vue'

// declare module '@vue/runtime-core' {
//   export interface GlobalComponents {
//     SvgIcon: typeof SvgIcon
//   }
// }

import 'vue'
declare module 'vue' {
  export interface GlobalComponents {
    SvgIcon: typeof import('@/icons/SvgIcon.vue')['default']
  }
}
