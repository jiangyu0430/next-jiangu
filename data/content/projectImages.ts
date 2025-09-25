export interface ImageContent {
  type?: 'image' | 'iframe'
  src?: string
}

export interface ProjectAsset {
  key: string
  baseUrl: string
  images: (string | ImageContent)[]
  spacing?: string
}

// 腾讯云 COS 各项目图片基础访问路径（请替换为你的真实桶名和区域）
export const COS_BASE_URLS = {
  designSystem:
    'https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/project/design_system/',
  networkRevision:
    'https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/project/network_revision/',
  tabbarMotion:
    'https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/motion/tabbar/',
  pageMotion:
    'https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/motion/page/',
  visualRedesign:
    'https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/project/visual_redesign/',
  dataVisualization:
    'https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/project/data_visualization/',
  arcoDesign:
    'https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/project/arco/',
}

// 🆕 添加项目模板（复制以下结构到 PROJECTS 中）：
/*
{
  key: 'yourProjectKey', // 页面 slug 同名
  baseUrl: COS_BASE_URLS.yourProjectKey,
  images: [
    'image-01',
    'image-02',
    // 或支持 iframe
    // { type: 'iframe', src: 'https://...' }
  ],
  spacing: 'mb-4', // 可选：控制下边距
},
*/

export const PROJECTS: ProjectAsset[] = [
  {
    key: 'designSystem',
    baseUrl: COS_BASE_URLS.designSystem,
    images: [
      'part2-01',
      'part2-02',
      'part2-03',
      'part2-04',
      'part2-05',
      'part2-06',
      'part2-07',
      'part2-08',
      'part2-09',
      'part2-10',
      'part2-11',
      'part2-12',
      'part2-13',
      'part2-14',
      'part2-15',
      'part2-16',
    ],
    spacing: 'mb-4',
  },
  {
    key: 'networkRevision',
    baseUrl: COS_BASE_URLS.networkRevision,
    images: [
      //'part1-01',
      //'part1-02',
      //'part1-03',
      //'part1-04',
      //'part1-05',
      //'part1-06',
      //'part1-07',
      //'part1-08',
      //'part1-09',
      //'part1-10',
      //'part1-11',
      //'part1-12',
      //'part1-13',
      //'part1-14',
      //'part1-15',
      //'part1-16',
      //'part1-17',
      //'part1-18',
    ],
    spacing: 'mb-4',
  },
  {
    key: 'visualRedesign',
    baseUrl: COS_BASE_URLS.visualRedesign,
    images: [
      'part3-1',
      //'part3-2',
      //'part3-3',
      //'part3-4',
      //'part3-5',
      //'part3-6',
      //'part3-7',
      //'part3-8',
      //'part3-9',
      //'part3-10',
      //'part3-11',
      //'part3-12',
      //'part3-13',
      //'part3-14',
    ],
    spacing: 'mb-4',
  },
  {
    key: 'tabbar-motion',
    baseUrl: COS_BASE_URLS.tabbarMotion,
    images: [
      '2.mp4',
      '3.mp4',
      '4.mp4',
      '1.mp4',
      '5.mp4',
      '6.mp4',
      '7.mp4',
      '8.mp4',
      '9.mp4',
      '10.mp4',
      '11.mp4',
      '12.mp4',
      '13.mp4',
      '14.mp4',
      '15.mp4',
      '16.mp4',
      '17.mp4',
      '18.mp4',
      '19.mp4',
      '20.mp4',
    ],
    spacing: 'mb-6',
  },
  {
    key: 'page-motion',
    baseUrl: COS_BASE_URLS.pageMotion,
    images: [
      '1',
      '1-1.mp4',
      '2',
      '2-1.mp4',
      '3',
      '3-1.mp4',
      '4',
      '4-1.mp4',
      '5',
      '5-1.mp4',
      '6',
      '6-1.mp4',
      '7',
      '7-1.mp4',
      '8',
      '8-1.mp4',
      '9',
      '9-1.mp4',
      '10',
      '10-1.mp4',
    ],
    spacing: 'mb-4',
  },
  {
    key: 'dataVisualization',
    baseUrl: COS_BASE_URLS.dataVisualization,
    images: [
      'part3-1',
      'part3-2',
      'part3-3',
      'part3-4',
      'part3-5',
      'part3-6',
      'part3-7',
    ],
    spacing: 'mb-4',
  },
  {
    key: 'arcoDesign',
    baseUrl: COS_BASE_URLS.arcoDesign,
    images: [
      'arco',
      {
        type: 'iframe',
        src: 'https://embed.figma.com/design/xcwQO53J0OGZ0nKDs5Swrh/Arco-Design-System?node-id=8253-44145&embed-host=share',
      },
    ],
    spacing: 'mb-4',
  },
]

// 你可以继续为其他项目添加类似结构的数组和基础路径

export const PROJECT_IMAGE_MAP: Record<
  string,
  { baseUrl: string; images: (string | ImageContent)[]; spacing: string }
> = PROJECTS.reduce((map, project) => {
  map[project.key] = {
    baseUrl: project.baseUrl,
    images: project.images,
    spacing: project.spacing || '',
  }
  return map
}, {} as Record<string, { baseUrl: string; images: (string | ImageContent)[]; spacing: string }>)
