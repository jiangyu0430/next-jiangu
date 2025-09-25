export interface Blog {
  slug: string
  title: string
  description: string
  date: string
  image: string
  contentFile: string
}

const blogs: Blog[] = [
  {
    slug: 'my-first-personal-website',
    title: 'AI 时代，设计师也能独立建站',
    description:
      '讲述如何借助 ChatGPT 等 AI 工具，从零开始搭建一个风格自由、功能完整的个人网站。内容涵盖工具选择、开发流程、上线部署等核心环节，适合没有前端基础的设计师阅读参考。',
    date: '2025-04-16',
    image:
      'https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/blog/cover/AI%E5%BB%BA%E7%AB%99.webp',
    contentFile: 'my-first-personal-website.md',
  },
  {
    slug: 'design-system1',
    title: '聊聊设计体系（上）— 从混乱中找到秩序',
    description:
      '分析设计在协作中失控的根本原因，梳理设计体系的定义、本质与价值，并结合产品发展阶段，提出体系建设应与组织节奏匹配的动态策略。',
    date: '2024-12-26',
    image:
      'https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/blog/cover/%E8%81%8A%E8%81%8A%E8%AE%BE%E8%AE%A1%E4%BD%93%E7%B3%BB-%E4%B8%8A.webp',
    contentFile: 'design-system1.md',
  },
  {
    slug: 'design-system2',
    title: '聊聊设计体系（中）— 构建之道',
    description:
      '聚焦设计体系的结构搭建，涵盖协作机制、组织原则、系统边界、组件资产与运行模式，逐步构建可协同、可演进的体系基础框架。',
    date: '2025-01-19',
    image:
      'https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/blog/cover/%E8%81%8A%E8%81%8A%E8%AE%BE%E8%AE%A1%E4%BD%93%E7%B3%BB-%E4%B8%AD.webp',
    contentFile: 'design-system2.md',
  },
  {
    slug: 'design-system3',
    title: '聊聊设计体系（下）— 体系也要活着',
    description:
      '探讨体系如何在组织中持续运行，围绕治理机制、行为建构方法与度量反馈模型，建立设计体系的演化能力与组织级协作支撑体系。',
    date: '2025-02-05',
    image:
      'https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/blog/cover/%E8%81%8A%E8%81%8A%E8%AE%BE%E8%AE%A1%E4%BD%93%E7%B3%BB-%E4%B8%8B.webp',
    contentFile: 'design-system3.md',
  },

  {
    slug: 'figma-component-library',
    title: 'Figma 搭建组件库的一些经验',
    description:
      '本篇内容是我在之前公司做的内部分享，覆盖从新手到进阶的各种技巧，也有部分不常见的“隐藏”操作',
    date: '2024-10-28',
    image:
      'https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/blog/cover/figma%E6%8A%80%E5%B7%A7.webp',
    contentFile: 'figma-component-library.md',
  },
]

export default blogs
