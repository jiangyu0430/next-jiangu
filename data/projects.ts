export interface Project {
  slug: string
  title: string
  date: string
  type: string
  description: string
  image:
    | string
    | {
        wide?: string
        square?: string
        light?: string
        dark?: string
      }
  tags: string[]
}

const projects: Project[] = [
  {
    slug: 'networkRevision',
    title: '【网络安全策略】体验升级之路',
    date: '2024-07 – 08',
    type: 'UI/UX',
    description:
      '网络完全策略最初划分为两个阶段上线，第一阶段仅实现基础功能，但现在来看体验欠佳。在二阶段能力升级之际，我主动发起体验重构，从策略配置流程到可视化呈现全面优化，让安全管理更直观易用，显著提升了用户信任与操作效率。',
    image:
      'https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/project/cover/securityPolicy5.jpg',
    tags: ['ToB', 'Website'],
  },
  {
    slug: 'designSystem',
    title: 'Eris Design System — 自研',
    date: '2023-06 – 2024-10',
    type: '设计系统',
    description:
      'Redesigned a brand website with a focus on modern UI and accessibility.',
    image: {
      wide: 'https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/project/cover/eris3.webp',
      square:
        'https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/project/cover/eris_square.webp',
    },
    tags: ['Design System', 'Components'],
  },
  {
    slug: 'visualRedesign',
    title: 'XHRER — 视觉语言焕新颜',
    date: '2023-05 – 06',
    type: 'UI/UX',
    description:
      '随着业务融合与扩展，原有视觉已难支撑战略发展。项目围绕 “形、色、字、质、构” 全面升级设计语言，重构视觉体系，让品牌统一性与信任感全面提升。焕新后的界面更具辨识度，也为多业务协同注入了全新活力。',
    image: {
      wide: 'https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/project/cover/xhereVisionUpgrade.webp',
      square:
        'https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/project/cover/xhereVisionUpgrade_square.webp',
    },
    tags: ['ToB', 'Website', '3D'],
  },
  {
    slug: 'arcoDesign',
    title: 'Arco Design System — Figma Library',
    date: '2021-12 – now',
    type: '设计系统',
    description:
      '21 年 Arco Design 发布，以更轻量、现代的风格打破传统中后台的设计惯性，展现出明显的探索性。我被其设计语言深深吸引，恰逢 Figma 在国内大热，我主动发起并搭建了覆盖 Web、Mobile、Arco Pro 的 Figma 资源库，目前社区总引用量超过 100k。',
    image:
      'https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/project/cover/arcoDesign_light.webp',
    tags: ['Design System', 'ByteDance', 'Components'],
  },
  {
    slug: 'dataVisualization',
    title: '智慧工厂 — 车间生产线数字孪生系统',
    date: '2022-11 – 12',
    type: '数据可视化',
    description:
      '智慧工厂车间产线通过先进的信息与自动化技术，实现高度智能化、自动化与数字化生产。个人参与主导的数据可视化界面设计与交互优化，让复杂生产数据在多维分析中更直观、高效地呈现，助力企业快速响应市场、实现个性化制造。',
    image:
      'https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/project/cover/dataVisualization.webp',
    tags: ['大屏', '数字孪生'],
  },
  {
    slug: 'tabbar-motion',
    title: 'Tabbar Icon - 20 组动效设计',
    date: '2020-10',
    type: '动画动效',
    description:
      '探索 TabBar 在轻量界面中的动效表现：指示条滑动、颜色过渡、状态切换节奏等，尝试将这些动态反馈融入常见组件的设计中，为界面注入更鲜活的节奏与视觉生命力。',
    image:
      'https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/project/cover/tabbar_animation.png',
    tags: ['AE', 'Motion'],
  },
  {
    slug: 'page-motion',
    title: '移动端界面 - 10 组动效设计',
    date: '2020-08',
    type: '动画动效',
    description:
      '探索 TabBar 在轻量界面中的动效表现：指示条滑动、颜色过渡、状态切换节奏等，尝试将这些动态反馈融入常见组件的设计中，为界面注入更鲜活的节奏与视觉生命力。',
    image:
      'https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/project/cover/page_animation.webp',
    tags: ['AE', 'Motion'],
  },
]

export default projects
