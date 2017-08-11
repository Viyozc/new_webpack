
export const ARTICLES = [
  {id: 0, title: '基础功能篇'},
  {id: 1, title: '数据展示篇'},
  {id: 2, title: '业务知识篇'},
  {id: 3, title: '日常问题篇'}
]

export const TABS = [
  {id: 0, title: '热门问题'},
  {id: 1, title: '安装流程'},
  {id: 2, title: '信息变更'}
]

export const QUESTIONS = [
  [
    {
      id: 0,
      content: '设备扫码后提示该设备无法使用怎么办？',
      answer: '检查后台设备电量和状态，如果设备在线但电量低于30%先给设备充电，如果显示离线，查看设备蓝灯是否闪烁；如果闪烁，将设备放置网络好的位置会自动联网，如果不闪烁给设备重新配网。'
    },
    {
      id: 1,
      content: '设备付款后不放电怎么办？',
      answer: '1、先联系客服退款（提供后台订单列表截图）；\n 2、查看付款后设备是否亮灯，如果亮灯，确认无法放电的是哪一根线的接口，并发起维修替换一台设备，故障设备贴标签退回仓库；如果不亮灯，提供设备二维码或编号给技术人员鉴定。'
    },
    {
      id: 2,
      content: '用户扫码后，显示设备不存在怎么办？',
      answer: '设备未安装成功，重新走安装流程。'
    },
    {
      id: 3,
      content: '设备扫码显示暂时无法使用，但后台电量100%怎么办？',
      answer: '新安装的设备后台上报的电量会有延迟，需等待10分钟才会上报真实的电量。'
    }
  ],
  [
    {
      id: 4,
      content: '设备配网最后一步总是联网失败怎么办？\n 蓝灯快闪后熄灭怎么办？\n 联网时一直蓝灯快闪怎么办？',
      answer: '1、检查商家wifi密码是否正确（密码至少为8位），如果无密码，确认网络是否为商业wifi（需验证手机号或微信授权才能联网的wifi），是否为5G wifi，如果是5G则放弃安装等待2g版本的设备，如果是商业wifi，走商业wifi的配网流程；\n 2、密码确认无误并且不是5G的话，多安装几遍避免商家网络不稳定导致配网失败，如果是苹果手机，在配网第二步连接设备wifi时注意等左上角出现了wifi图标后再切换到电小二app；\n 3、多换几台设备安装，如果多台设备都无法安装，尝试重启商家路由器，避免联网设备达到路由器负载或设备被降权导致的无法连接；\n 4、重启路由器仍然无效，问下商家是否有别的wifi可以连接，如果没有先标记一下这家换个时间再来安装。'
    },
    {
      id: 5,
      content: '确认信息时提示已安装其他门店',
      answer: '之前安装时装乱码，扫码和联网的设备不是同一台，根据提示将提示中的那台设备从提示的已安装门店中回收后重新安装，再安装这台扫码的设备。'
    },
    {
      id: 6,
      content: '获取token失败怎么办？',
      answer: '切换至4g流量再扫码。'
    },
    {
      id: 7,
      content: '扫码时卡住或者提示扫码失败怎么办？',
      answer: '切换至4g流量再点击下一步。'
    },
    {
      id: 8,
      content: '点击测试按钮无法充电怎么办',
      answer: '重新配网'
    },
    {
      id: 9,
      content: '没有密码的wifi可以联网吗？',
      answer: '确认wifi是否为商业wifi，只要是需要通过网页登陆手机号验证或者微信关注或授权才能联网的wifi都称为商业wifi，如果确认是商业wifi，则需要走商业wifi的配网流程，如果不是商业wifi，可以正常配网。'
    },
    {
      id: 10,
      content: '商业wifi的配网流程是什么？',
      answer: '1、确认商业wifi提供商：手机连接至商家网络，在授权页面商获取并记录商家所使用路由的提供商以及联系方式；\n 2、确认设备能否通过加入路由白名单方式进行配网：向商家询问路由相关问题，确认商家能否直接将设备加入路由的mac白名单；或联系商家路由提供商，询问是否能将设备加入路由的mac白名单；\n 3、正常配网流程并获取mac地址：使用手机热点对设备进行演示机配网或者重新配网操作，配网完成后会弹出mac地址已复制的提示，然后将复制的内容找到备忘录粘贴备用；\n 4、将mac地址加入mac白名单：联系商家路由提供商，报出mac地址，将设备mac地址加入白名单；\n 5、正常配网操作。'
    }
  ],
  [
    {
      id: 11,
      content: '如何修改门店电话？',
      answer: '打开电小二==>搜索要更改的店名==>打开后下拉到编辑资料==>找到门店号码==>更改号码==>保存==>退出'
    },
    {
      id: 12,
      content: '如何更换商家负责人？',
      answer: '1、让新的负责人注册小电商家；\n 2、联系客服，客服将商家后台换绑新的负责人。'
    },
    {
      id: 13,
      content: '如何设置和更换设备管理员？',
      answer: '1、 商家注册人，点击“小电商家”里“我是老板”，去设置指定一个设备管理员；\n 2、 被指定的设备管理员，关注“小电商家”，并点击“我是管理员”注册；\n 3、 如果要更换设备管理员，让商家重新指定，指定后让新管理员关注小电商家，注册我是管理员。'
    },
    {
      id: 14,
      content: '如何更改门店名称或地址信息？',
      answer: '联系客服修改。'
    }
  ]

]

export const CONTENT = [
  [
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/960w_540h_312581500448309.jpeg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/960w_540h_EF2BB1500448328.jpeg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/960w_540h_BB8461500448416.jpeg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/960w_540h_8D3741500448464.jpeg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/960w_540h_CF3A01500448494.jpeg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/960w_540h_CF2591500448521.jpeg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/960w_540h_F3DFB1500448540.jpeg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/960w_540h_3F5B71500448554.jpeg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/960w_540h_83DA11500448570.jpeg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/960w_540h_B2ABA1500448585.jpeg',

    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/960w_540h_385F11500448600.jpeg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/960w_540h_1CFC71500448614.jpeg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/960w_540h_67CC11500448640.jpeg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/960w_540h_CF3A21500448665.jpeg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/960w_540h_04D211500448681.jpeg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/960w_540h_9CE761500448695.jpeg',
    // 'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/960w_540h_9CE761500448715.jpeg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/960w_540h_5D2461500448771.jpeg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/960w_540h_CBCEC1500448789.jpeg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/960w_540h_1E1011500448804.jpeg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/960w_540h_58AD31500448823.jpeg',

    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/960w_540h_810501500448864.jpeg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/960w_540h_B43A61500448880.jpeg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/960w_540h_BA00C1500448895.jpeg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/960w_540h_5AFC51500448909.jpeg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/960w_540h_208A71500448928.jpeg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/960w_540h_9B8FB1500448942.jpeg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/960w_540h_C3C021500448957.jpeg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/960w_540h_CC4CC1500448976.jpeg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/960w_540h_DFE6A1500448994.jpeg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/960w_540h_DD36F1500449015.jpeg',

    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/960w_540h_5D6C51500449031.jpeg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/960w_540h_34B791500449050.jpeg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/960w_540h_002921500449065.jpeg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/960w_540h_86FDD1500449081.jpeg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/960w_540h_495B91500449095.jpeg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/960w_540h_08E821500449110.jpeg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/960w_540h_906831500449135.jpeg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/960w_540h_868211500449151.jpeg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/960w_540h_E56D71500449167.jpeg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/960w_540h_C91131500449184.jpeg'
  ],
  [],
  [
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/1239w_1754h_0C9471500446585.jpg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/1239w_1754h_069261500446828.jpg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/1239w_1754h_B33891500446879.jpg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/1239w_1754h_1BE0D1500446919.jpg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/1239w_1754h_7E6111500446982.jpg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/1239w_1754h_330B21500447002.jpg'
  ],
  [
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/1440w_810h_013AF1500447356.jpg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/1440w_810h_16E301500447451.jpg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/1440w_810h_3D8E11500447471.jpg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/1440w_810h_47F201500447486.jpg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/1440w_810h_CD8BD1500447504.jpg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/1440w_810h_3F8091500447520.jpg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/1440w_810h_61AF61500447536.jpg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/1440w_810h_FE1FC1500447552.jpg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/1440w_810h_BCE181500447567.jpg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/1440w_810h_2CD3A1500447596.jpg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/1440w_810h_0CD091500447612.jpg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/1440w_810h_D2B451500447627.jpg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/1440w_810h_A3F0B1500447643.jpg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/1440w_810h_1B3B71500447660.jpg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/1440w_810h_C1EE11500447676.jpg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/1440w_810h_831A51500447694.jpg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/1440w_810h_963481500447714.jpg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/1440w_810h_021EE1500447731.jpg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/1440w_810h_982E21500447755.jpg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/1440w_810h_D5DFE1500447772.jpg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/1440w_810h_C8D9A1500447793.jpg',
    'http://lhc-image.oss-cn-beijing.aliyuncs.com/lhc/2017/07/19/1440w_810h_0FB741500447821.jpg'
  ]
]
