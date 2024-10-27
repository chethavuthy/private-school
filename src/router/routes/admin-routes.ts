export const adminRoutes = [
  {
    menuUrl: '/index',
    menuName: 'Dashboard',
    routeName: 'dashboard',
    icon: 'icon-dashboard',
    isSingle: true,
    parentPath: '',
    children: [
      {
        parentPath: '/index',
        menuUrl: '/index/home',
        menuName: 'Dashboard',
        routeName: 'home',
      },
    ],
  },
  {
    menuUrl: '/payment',
    menuName: 'Payment',
    iconPrefix: 'iconfont',
    icon: 'file-image',
    parentPath: '',
    isSingle: true,
    children: [
      {
        parentPath: '/payment',
        menuUrl: '/payment/home',
        menuName: 'Payment',
        routeName: 'PaymentHome',
      },
    ],
  },
  {
    menuUrl: '/sale',
    menuName: 'Sale',
    iconPrefix: 'iconfont',
    icon: 'file-image',
    parentPath: '',
    isSingle: true,
    children: [
      {
        parentPath: '/sale',
        menuUrl: '/sale/home',
        menuName: 'Sale',
        routeName: 'SaleHome',
      },
    ],
  },
  {
    menuUrl: '/stockroom',
    menuName: 'Stockroom',
    iconPrefix: 'iconfont',
    icon: 'file-image',
    parentPath: '',
    isSingle: true,
    children: [
      {
        parentPath: '/stockroom',
        menuUrl: '/stockroom/home',
        menuName: 'Stockroom',
        routeName: 'StockroomHome',
      },
    ],
  },
  {
    menuUrl: '/attendance',
    menuName: 'Attendance',
    iconPrefix: 'iconfont',
    icon: 'file-image',
    parentPath: '',
    isSingle: true,
    children: [
      {
        parentPath: '/attendance',
        menuUrl: '/attendance/home',
        menuName: 'Attendance',
        routeName: 'AttendanceHome',
      },
    ],
  },
  {
    menuUrl: '/enrollment',
    menuName: 'Enrollment',
    iconPrefix: 'iconfont',
    icon: 'file-image',
    parentPath: '',
    isSingle: true,
    children: [
      {
        parentPath: '/enrollment',
        menuUrl: '/enrollment/home',
        menuName: 'Enrollment',
        routeName: 'EnrollmentHome',
      },
    ],
  },
  {
    menuUrl: '/teacher',
    menuName: 'Teacher',
    iconPrefix: 'iconfont',
    icon: 'file-image',
    parentPath: '',
    isSingle: true,
    children: [
      {
        parentPath: '/teacher',
        menuUrl: '/teacher/home',
        menuName: 'Teacher',
        routeName: 'TeacherHome',
      },
    ],
  },
  {
    menuUrl: '/student',
    menuName: 'Student',
    iconPrefix: 'iconfont',
    icon: 'file-image',
    parentPath: '',
    isSingle: true,
    children: [
      {
        parentPath: '/student',
        menuUrl: '/student/home',
        menuName: 'Student',
        routeName: 'StudentHome',
      },
    ],
  },
  {
    menuUrl: '/classroom',
    menuName: 'Classroom',
    iconPrefix: 'iconfont',
    icon: 'file-image',
    parentPath: '',
    isSingle: true,
    children: [
      {
        parentPath: '/classroom',
        menuUrl: '/classroom/home',
        menuName: 'Classroom',
        routeName: 'ClassroomHome',
      },
    ],
  },
  {
    menuUrl: '/course',
    menuName: 'Course',
    iconPrefix: 'iconfont',
    icon: 'file-image',
    parentPath: '',
    isSingle: true,
    children: [
      {
        parentPath: '/course',
        menuUrl: '/course/home',
        menuName: 'Course',
        routeName: 'CourseHome',
      },
    ],
  },
  {
    menuUrl: '/branch',
    menuName: 'Branch',
    iconPrefix: 'iconfont',
    icon: 'file-image',
    parentPath: '',
    isSingle: true,
    children: [
      {
        parentPath: '/branch',
        menuUrl: '/branch/home',
        menuName: 'Branch',
        routeName: 'BranchHome',
      },
    ],
  },
  {
    menuUrl: '/category',
    menuName: 'Category',
    iconPrefix: 'iconfont',
    icon: 'file-image',
    parentPath: '',
    isSingle: true,
    children: [
      {
        parentPath: '/category',
        menuUrl: '/category/home',
        menuName: 'Category',
        routeName: 'CategoryHome',
      },
    ],
  },
  {
    menuUrl: '/role',
    menuName: 'Role',
    iconPrefix: 'iconfont',
    icon: 'file-image',
    parentPath: '',
    isSingle: true,
    children: [
      {
        parentPath: '/role',
        menuUrl: '/role/home',
        menuName: 'Role',
        routeName: 'RoleHome',
      },
    ],
  },
  // {
  //   menuUrl: '/banner',
  //   menuName: 'Banner',
  //   iconPrefix: 'iconfont',
  //   icon: 'image',
  //   parentPath: '',
  //   isSingle: true,
  //   children: [
  //     {
  //       parentPath: '/banner',
  //       menuUrl: '/banner/home',
  //       menuName: 'Banner',
  //       routeName: 'BannerHome',
  //     },
  //   ],
  // },
  // {
  //   menuUrl: '/request-design',
  //   menuName: 'RequestDesign',
  //   iconPrefix: 'iconfont',
  //   icon: 'folder-view',
  //   parentPath: '',
  //   isSingle: true,
  //   children: [
  //     {
  //       parentPath: '/request-design',
  //       menuUrl: '/request-design/home',
  //       menuName: 'Request Design',
  //       routeName: 'RequestDesignHome',
  //     },
  //   ],
  // },
  // {
  //   menuUrl: '/category',
  //   menuName: 'Category',
  //   iconPrefix: 'iconfont',
  //   icon: 'appstore',
  //   parentPath: '',
  //   isSingle: true,
  //   children: [
  //     {
  //       parentPath: '/category',
  //       menuUrl: '/category/home',
  //       menuName: 'Category',
  //       routeName: 'CategoryHome',
  //     },
  //   ],
  // },
  // {
  //   menuUrl: '/business-type',
  //   menuName: 'Business Type',
  //   iconPrefix: 'iconfont',
  //   icon: 'wallet',
  //   parentPath: '',
  //   isSingle: true,
  //   children: [
  //     {
  //       parentPath: '/business-type',
  //       menuUrl: '/business-type/home',
  //       menuName: 'Business Type',
  //       routeName: 'BusinessTypeHome',
  //     },
  //   ],
  // },
  // {
  //   menuUrl: '/role',
  //   menuName: 'Role',
  //   iconPrefix: 'iconfont',
  //   icon: 'folder-view',
  //   parentPath: '',
  //   isSingle: true,
  //   children: [
  //     {
  //       parentPath: '/role',
  //       menuUrl: '/role/home',
  //       menuName: 'Role',
  //       routeName: 'RoleHome',
  //     },
  //   ],
  // },
  // {
  //   menuUrl: '/system-user',
  //   menuName: 'System User',
  //   iconPrefix: 'iconfont',
  //   icon: 'setting',
  //   parentPath: '',
  //   isSingle: true,
  //   children: [
  //     {
  //       parentPath: '/system-user',
  //       menuUrl: '/system-user/home',
  //       menuName: 'System User',
  //       routeName: 'SystemUserHome',
  //     },
  //   ],
  // },
  // {
  //   menuUrl: '/system',
  //   menuName: '系统管理',
  //   iconPrefix: 'iconfont',
  //   icon: 'setting',
  //   parentPath: '',
  //   children: [
  //     {
  //       parentPath: '/system',
  //       menuUrl: '/system/department',
  //       menuName: '部门管理',
  //       badge: 'new',
  //       localFilePath: '/system/local-path/department',
  //       routeName: 'my-department',
  //     },
  //     {
  //       parentPath: '/system',
  //       menuUrl: '/system/user',
  //       menuName: '用户管理',
  //       badge: 'dot',
  //     },
  //     {
  //       parentPath: '/system',
  //       menuUrl: '/system/role',
  //       menuName: '角色管理',
  //       badge: '12',
  //     },
  //     {
  //       parentPath: '/system',
  //       menuUrl: '/system/menu',
  //       menuName: '菜单管理',
  //     },
  //   ],
  // },
  // {
  //   menuUrl: '/list',
  //   menuName: '列表页面',
  //   iconPrefix: 'iconfont',
  //   icon: 'detail',
  //   parentPath: '',
  //   children: [
  //     {
  //       parentPath: '/list',
  //       menuUrl: '/list/table-with-search',
  //       menuName: '表格搜索',
  //     },
  //     {
  //       parentPath: '/list',
  //       menuUrl: '/list/table-custom',
  //       menuName: '自定义表格',
  //     },
  //     {
  //       parentPath: '/list',
  //       menuUrl: '/list/list',
  //       menuName: '普通列表',
  //     },
  //     {
  //       parentPath: '/list',
  //       menuUrl: '/list/card-list',
  //       menuName: '卡片列表',
  //     },
  //   ],
  // },
  // {
  //   menuUrl: '/form',
  //   menuName: '表单页面',
  //   badge: 'dot',
  //   iconPrefix: 'iconfont',
  //   icon: 'file-text',
  //   parentPath: '',
  //   children: [
  //     {
  //       parentPath: '/form',
  //       menuUrl: '/form/base-form-view',
  //       menuName: '动态表单',
  //       cacheable: true,
  //     },
  //     {
  //       parentPath: '/form',
  //       menuUrl: '/form/advance-form',
  //       menuName: '高级表单',
  //       cacheable: true,
  //     },
  //     {
  //       parentPath: '/form',
  //       menuUrl: '/form/step-form',
  //       menuName: '分步表单',
  //     },
  //   ],
  // },
  // {
  //   menuUrl: '/other',
  //   menuName: '功能/组件',
  //   iconPrefix: 'iconfont',
  //   icon: 'appstore',
  //   parentPath: '',
  //   children: [
  //     {
  //       parentPath: '/other',
  //       menuUrl: '/other/chart',
  //       menuName: '图表',
  //       children: [
  //         {
  //           parentPath: '/other/chart',
  //           menuUrl: '/other/chart/icon',
  //           menuName: '图标',
  //         },
  //         {
  //           parentPath: '/other/chart',
  //           menuUrl: '/other/chart/echarts',
  //           menuName: 'echarts',
  //         },
  //         {
  //           parentPath: '/other/chart',
  //           menuUrl: '/other/chart/icon-selector',
  //           menuName: '图标选择器',
  //         },
  //       ],
  //     },
  //     {
  //       parentPath: '/other',
  //       menuUrl: '/other/print',
  //       menuName: '打印',
  //     },
  //     {
  //       parentPath: '/other',
  //       menuUrl: '/other/badge',
  //       menuName: '消息提示',
  //     },
  //     {
  //       parentPath: '/other',
  //       menuUrl: '/other/clipboard',
  //       menuName: '剪贴板',
  //     },
  //     {
  //       parentPath: '/other',
  //       menuUrl: 'http://www.vueadminwork.com',
  //       menuName: '外链（官网）',
  //     },
  //     {
  //       parentPath: '/other',
  //       menuUrl: '/other/qrcode',
  //       menuName: '二维码',
  //     },
  //     {
  //       parentPath: '/other',
  //       menuUrl: '/other/css-animation',
  //       menuName: 'CSS动画',
  //     },
  //     {
  //       parentPath: '/other',
  //       menuUrl: '/other/player',
  //       menuName: '播放器',
  //     },
  //     {
  //       parentPath: '/other',
  //       menuUrl: '/other/big-preview',
  //       menuName: '大图预览',
  //     },
  //     {
  //       parentPath: '/other',
  //       menuUrl: '/other/city-selector',
  //       menuName: '省市区选择器',
  //     },
  //   ],
  // },
  // {
  //   menuUrl: '/result',
  //   menuName: '结果页面',
  //   iconPrefix: 'iconfont',
  //   icon: 'file-unknown',
  //   parentPath: '',
  //   children: [
  //     {
  //       parentPath: '/result',
  //       menuUrl: '/result/success',
  //       menuName: '成功页面',
  //     },
  //     {
  //       parentPath: '/result',
  //       menuUrl: '/result/fail',
  //       menuName: '失败页面',
  //     },
  //   ],
  // },
  // {
  //   menuUrl: '/editor',
  //   menuName: '编辑器',
  //   badge: '12',
  //   iconPrefix: 'iconfont',
  //   icon: 'edit',
  //   parentPath: '',
  //   children: [
  //     {
  //       parentPath: '/editor',
  //       menuUrl: '/editor/rich-text',
  //       menuName: '富文本',
  //     },
  //     {
  //       parentPath: '/editor',
  //       menuUrl: '/editor/markdown',
  //       menuName: 'markdown',
  //     },
  //   ],
  // },
  // {
  //   menuUrl: '/draggable',
  //   menuName: '拖拽',
  //   iconPrefix: 'iconfont',
  //   icon: 'interation',
  //   parentPath: '',
  //   children: [
  //     // {
  //     //   parentPath: '/draggable',
  //     //   menuUrl: '/draggable/dialog-draggable',
  //     //   menuName: '拖拽对话框',
  //     // },
  //     {
  //       parentPath: '/draggable',
  //       menuUrl: '/draggable/card-draggable',
  //       menuName: '卡片拖拽',
  //       cacheable: true,
  //     },
  //   ],
  // },
  // {
  //   menuUrl: '/next',
  //   menuName: '多级菜单',
  //   iconPrefix: 'iconfont',
  //   icon: 'Partition',
  //   parentPath: '',
  //   children: [
  //     {
  //       parentPath: '/next',
  //       menuUrl: '/next/menu1',
  //       menuName: 'menu-1',
  //       cacheable: true,
  //     },
  //     {
  //       parentPath: '/next',
  //       menuUrl: '/next/menu2',
  //       menuName: 'menu-2',
  //       children: [
  //         {
  //           parentPath: '/next/menu2',
  //           menuUrl: '/next/menu2/menu-2-1',
  //           menuName: 'menu-2-1',
  //           children: [
  //             {
  //               parentPath: '/next/menu2/menu-2-1',
  //               menuUrl: '/next/menu2/menu-2-1/menu-2-1-1',
  //               menuName: 'menu-2-1-1',
  //               cacheable: true,
  //             },
  //             {
  //               parentPath: '/next/menu2/menu-2-1',
  //               menuUrl: '/next/menu2/menu-2-1/menu-2-1-2',
  //               menuName: 'menu-2-1-2',
  //             },
  //           ],
  //         },
  //         {
  //           parentPath: '/next/menu2',
  //           menuUrl: '/next/menu2/menu-2-2',
  //           menuName: 'menu-2-2',
  //           cacheable: true,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   menuUrl: '/map',
  //   menuName: '地图',
  //   iconPrefix: 'iconfont',
  //   icon: 'location',
  //   children: [
  //     {
  //       parentPath: '/map',
  //       menuUrl: '/map/gaode',
  //       menuName: '高德地图',
  //     },
  //     {
  //       parentPath: '/map',
  //       menuUrl: '/map/baidu',
  //       menuName: '百度地图',
  //     },
  //   ],
  // },
  // {
  //   menuUrl: '/project',
  //   menuName: '项目信息',
  //   iconPrefix: 'iconfont',
  //   icon: 'detail',
  //   isSingle: true,
  //   children: [
  //     {
  //       parentPath: '/project',
  //       menuUrl: '/project/infomation',
  //       menuName: '项目依赖',
  //     },
  //   ],
  // },
]
