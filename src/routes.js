export default {
  path: '/',
  getComponent (nextState, callback) {
    require.ensure([], (require) => {
      callback(null, require('containers/app').default)
    })
  },
  childRoutes: [
    {
      path: 'login',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/login').default)
        })
      }
    },
    {
      path: 'a/login',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/a/login/login').default)
        })
      }
    },
    {
      path: 'a/channel',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/channel/').default)
        })
      }
    },
    {
      path: 'a/team',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/a/team/').default)
        })
      }
    },

    {
      path: 'a/team/add',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/a/team/add').default)
        })
      }
    },
    {
      path: 'a/purchase',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/a/purchase/').default)
        })
      }
    },
    {
      path: 'a/team/detail/:sellerId',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/a/team/detail').default)
        })
      }
    },
    {
      path: 'a/purchase/apply',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/a/purchase/apply').default)
        })
      }
    },
    {
      path: 'a/count',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/a/count/').default)
        })
      }
    },
    {
      path: 'a/count/record',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/a/count/record').default)
        })
      }
    },
    {
      path: 'a/count/cash',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/a/count/cash').default)
        })
      }
    },
    {
      path: 'a/count/cash/manage',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/a/count/cashManage').default)
        })
      }
    },
    {
      path: 'a/count/cash/charge',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/a/count/charge').default)
        })
      }
    },
    {
      path: 'a/count/record/detail/:id',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/a/count/recordDetail').default)
        })
      }
    },
    {
      path: 'a/count/cash/record',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/a/count/cashRecord').default)
        })
      }
    },
    {
      path: 'a/count/help',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/a/count/help').default)
        })
      }
    },
    {
      path: 'a/purchase/confirm',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/a/purchase/confirmBook').default)
        })
      }
    },
    {
      path: 'a/agentBD/home',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/a/agentBD/home/').default)
        })
      }
    },
    {
      path: 'a/agentBD/team',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/a/agentBD/team/').default)
        })
      }
    },
    {
      path: 'a/agentBD/team/add',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/a/agentBD/team/add').default)
        })
      }
    },
    {
      path: 'a/agentBD/shops',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/a/agentBD/shops/list/index').default)
        })
      }
    },
    {
      path: 'a/agentBD/shops/:id',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/a/agentBD/shops/detail/index').default)
        })
      }
    },
    {
      path: 'a/agentBD/shops/create/:id',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/a/agentBD/shops/create').default)
        })
      }
    },
    {
      path: 'a/agentBD/search',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/a/agentBD/shops/search').default)
        })
      }
    },
    {
      path: 'a/agentBD/cancel/:id',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/a/agentBD/shops/cancel/').default)
        })
      }
    },
    {
      path: 'a/replaceBD',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/a/replaceBD').default)
        })
      }
    },
    {
      path: 'a/replaceBD/chose',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/a/replaceBD/chose').default)
        })
      }
    },
    {
      path: 'home',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/bd/').default)
        })
      }
    },
    {
      path: 'home/kpi/description',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/home/description').default)
        })
      }
    },
    {
      path: 'home/notice',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/home/notice').default)
        })
      }
    },
    {
      path: 'identity/choose',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/chooseIdentity').default)
        })
      }
    },
    {
      path: 'device/list',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/device/list').default)
        })
      }
    },
    {
      path: 'device/bind',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/device/bind').default)
        })
      }
    },
    {
      path: 'device/bind/hezi',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/device/heziTest').default)
        })
      }
    },
    {
      path: 'device/rebind',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/device/rebind').default)
        })
      }
    },
    {
      path: 'device/confirm',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/device/confirm').default)
        })
      }
    },
    {
      path: 'device/preconfirm',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/device/preconfirm').default)
        })
      }
    },
    {
      path: 'device/confirmError',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/device/confirmError').default)
        })
      }
    },
    {
      path: 'shops',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/shop/list').default)
        })
      }
    },
    {
      path: 'shops/fake/:id',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/shop/fake/').default)
        })
      }
    },
    {
      path: 'shops/bd/install/:id',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/shop/bd/install/detail').default)
        })
      }
    },
    {
      path: 'shops/:id/sign',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/shop/install').default)
        })
      }
    },
    {
      path: 'shops/:id/install',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/shop/install/detail').default)
        })
      }
    },
    {
      path: 'shops/:id/install/confirmPoi',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/shop/install/confirmPoi').default)
        })
      }
    },
    {
      path: 'shops/:id/receipt',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/shop/install/receipt').default)
        })
      }
    },
    {
      path: 'shops/:id/install/break',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/shop/install/break').default)
        })
      }
    },
    {
      path: 'shops/:id/install/breakReason',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/shop/install/breakReason').default)
        })
      }
    },
    {
      path: 'shops/:id',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/shop/detail/').default)
        })
      }
    },
    {
      path: 'shop/search',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/shop/search').default)
        })
      }
    },
    {
      path: 'shop/create',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/shop/create').default)
        })
      }
    },
    {
      path: 'shop/boxapply',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/shop/boxapply').default)
        })
      }
    },
    {
      path: 'shop/edit',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/shop/edit').default)
        })
      }
    },
    {
      path: 'shop/type',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/shop/type').default)
        })
      }
    },
    {
      path: 'shop/companyList',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/shop/companyList').default)
        })
      }
    },
    {
      path: 'shop/shopList',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/shop/shopList').default)
        })
      }
    },
    {
      path: 'shop/avgDayOrderList',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/shop/avgDayOrderList').default)
        })
      }
    },
    {
      path: 'pcLogin',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/pcLogin').default)
        })
      }
    },
    {
      path: 'scanLogin',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/scanLogin').default)
        })
      }
    },
    {
      path: 'shop/device/list',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/shop/device/list').default)
        })
      }
    },
    {
      path: 'shop/device/totalList',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/shop/device/totalList').default)
        })
      }
    },
    {
      path: 'shop/device/offlineList',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/shop/device/offlineList').default)
        })
      }
    },
    {
      path: 'shop/device/recycleList',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/shop/device/recycleList').default)
        })
      }
    },
    {
      path: 'shop/device/avgDayOnlineRateList',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/shop/device/avgDayOnlineRateList').default)
        })
      }
    },
    {
      path: 'shop/orderList',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/shop/orderList').default)
        })
      }
    },
    {
      path: 'shop/device/orderList',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/shop/device/orderList').default)
        })
      }
    },
    {
      path: 'shop/examine/list',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/shop/examine/list').default)
        })
      }
    },
    {
      path: 'shop/examine/:id/reason',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/shop/examine/reason').default)
        })
      }
    },
    {
      path: 'shops/examine/:id',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/shop/examine/detail').default)
        })
      }
    },
    {
      path: 'shops/detail/chooseBD',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/shop/detail/chooseBD/').default)
        })
      }
    },
    {
      path: 'exception/list',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/shop/exception/list').default)
        })
      }
    },
    {
      path: 'exception/:id/reason',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/shop/exception/reason').default)
        })
      }
    },
    {
      path: 'exception/:id',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/shop/exception/detail').default)
        })
      }
    },
    {
      path: 'shop/repair/list',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/shop/repair/list').default)
        })
      }
    },
    {
      path: 'shop/repair/add',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/shop/repair/add').default)
        })
      }
    },
    {
      path: '/shop/allocate',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/shop/allocate/').default)
        })
      }
    },
    {
      path: '/shop/allocate/chose',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/shop/allocate/chose').default)
        })
      }
    },
    {
      path: 'user',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/user/').default)
        })
      }
    },
    {
      path: 'user/team',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/user/team').default)
        })
      }
    },
    {
      path: 'user/mine/shops',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/user/mine/shop/list').default)
        })
      }
    },
    {
      path: 'user/mine/shops/boxlist/:boxId',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/user/mine/shop/boxlist').default)
        })
      }
    },
    {
      path: 'user/mine/shops/:id/device',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/user/mine/shop/device').default)
        })
      }
    },
    {
      path: 'user/performance',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/user/performance').default)
        })
      }
    },
    {
      path: 'data/center',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/dc/').default)
        })
      }
    },
    {
      path: 'data/center/list',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/dc/list').default)
        })
      }
    },
    // 维修
    {
      path: 'workOrder/repair',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/workOrder/repair/list').default)
        })
      }
    },
    {
      path: 'workOrders/:id/repair',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/workOrder/repair/detail').default)
        })
      }
    },
    {
      path: 'workOrder/repair/test',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/workOrder/repair/test').default)
        })
      }
    },
    // repair 地图
    {
      path: 'workOrder/repair/repairPoi',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/workOrder/repair/repairPoi').default)
        })
      }
    },
    {
      path: 'workOrder/repair/boxTest',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/workOrder/repair/boxTest').default)
        })
      }
    },
    {
      path: 'workOrder/repair/devices',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/workOrder/repair/devices').default)
        })
      }
    },
    {
      path: 'workOrder/repair/config',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/workOrder/repair/config').default)
        })
      }
    },
    {
      path: 'workOrder/repair/result',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/workOrder/repair/result').default)
        })
      }
    },
    // 备件更换
    {
      path: '/recyle',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/workOrder/recyle/list').default)
        })
      }
    },
    {
      path: '/recyle/add',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/workOrder/recyle/add').default)
        })
      }
    },
    {
      path: '/recyle/add/reason',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/workOrder/recyle/reason').default)
        })
      }
    },
    // 回收
    {
      path: '/reclaim',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/reclaim/list').default)
        })
      }
    },
    {
      path: '/reclaim/bd/:id/device',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/reclaim/bd/device').default)
        })
      }
    },
    {
      path: '/reclaim/:id/device',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/reclaim/device').default)
        })
      }
    },
    {
      path: '/reclaim/:id/devices',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/reclaim/devices').default)
        })
      }
    },
    {
      path: '/reclaim/:id/result',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/reclaim/result').default)
        })
      }
    },
    {
      path: '/reclaim/:id/refuseReason',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/reclaim/refuseReason').default)
        })
      }
    },
    {
      path: '/reclaim/toWarehouse',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/reclaim/toWarehouse').default)
        })
      }
    },
    {
      path: '/reclaim/:id',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/reclaim/detail').default)
        })
      }
    },
    // 商家端
    {
      path: '/b/deviceManage/:shopId',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/b/deviceManage').default)
        })
      }
    },
    // 设置门店管理员信息
    {
      path: '/b/shops/:id',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/b/detail').default)
        })
      }
    },
    {
      path: '/b/mobile',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/b/mobile').default)
        })
      }
    },
    {
      path: '/b/signUp',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/b/signUp').default)
        })
      }
    },
    {
      path: '/b',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/b').default)
        })
      }
    },
    // 仓管
    {
      path: '/warehouse/distribution',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/warehouse/distribution').default)
        })
      }
    },
    {
      path: '/warehouse/demo/distribution',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/warehouse/demo/distribution').default)
        })
      }
    },
    {
      path: '/warehouse/distribute',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/warehouse/distribute').default)
        })
      }
    },
    {
      path: '/warehouse/install/out',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/warehouse/install/out').default)
        })
      }
    },
    {
      path: '/helpcenter/index',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/helpCenter/index').default)
        })
      }
    },
    {
      path: '/helpcenter/article',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/helpCenter/article').default)
        })
      }
    },
    {
      path: '/shops/city/position',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/shop/position').default)
        })
      }
    },
    {
      path: 'bd/lost/deviceList',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/bd/lost/deviceList').default)
        })
      }
    },
    {
      path: 'bd/device/chooseBd',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/bd/device/chooseBd').default)
        })
      }
    },
    {
      path: 'bd/lost/lostDetail',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/bd/lost/lostDetail').default)
        })
      }
    },
    {
      path: 'bd/lost/rejectReason',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/bd/lost/rejectReason').default)
        })
      }
    },
    // mydevice page
    {
      path: 'bd/lost/mydevice',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/bd/lost/mydevice').default)
        })
      }
    },
    // mydevice page
    {
      path: 'bd/lost/commitSpareLost',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/bd/lost/commitSpareLost').default)
        })
      }
    },

    {
      path: 'bd/device/bdApply',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/bd/device/bdApply').default)
        })
      }
    },
    {
      path: 'bd/device/list',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/bd/device/list').default)
        })
      }
    },
    {
      path: 'bd/device/recycle',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/bd/device/recycle').default)
        })
      }
    },
    {
      path: 'bd/device/recycle/reason',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/bd/device/recycle/reason').default)
        })
      }
    },
    {
      path: '/bd/device/supply/supplyFlow',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/bd/device/supply/supplyFlow').default)
        })
      }
    },
    {
      path: 'bd/device/supply/supplyPowerBank',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/bd/device/supply/supplyPowerBank').default)
        })
      }
    },
    {
      path: 'bd/device/apply',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/bd/device/apply').default)
        })
      }
    },
    {
      path: 'bd/device/lose',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/bd/device/lose').default)
        })
      }
    },
    {
      path: 'bd/device/lose/result',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/bd/device/lose/result').default)
        })
      }
    },
    // 座充数据详情
    {
      path: 'bd/device/lose/loseDetail',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/bd/device/lose/loseDetail').default)
        })
      }
    },
    {
      path: 'bd/device/findout',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/bd/device/findout').default)
        })
      }
    },
    {
      path: '/bd/data/todaySuccessOrder',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/bd/data/todaySuccessOrder').default)
        })
      }
    },
    {
      path: '/bd/data/summaryRecovery',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/bd/data/summaryRecovery').default)
        })
      }
    },
    {
      path: '/bd/data/monthNewShop',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/bd/data/monthNewShop').default)
        })
      }
    },
    {
      path: '/bd/data/monthNewShop/detail',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/bd/data/monthNewShop/detail').default)
        })
      }
    },
    {
      path: '/bd/data/monthSuccessOrderAndMoney',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/bd/data/monthSuccessOrderAndMoney').default)
        })
      }
    },
    {
      path: '/bd/data/monthSuccessOrderAndMoney/detail',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/bd/data/monthSuccessOrderAndMoney/detail').default)
        })
      }
    },
    {
      path: '/bd/data/monthNewInstallDevice',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/bd/data/monthNewInstallDevice').default)
        })
      }
    },
    {
      path: '/bd/data/monthNewInstallDevice/detail',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/bd/data/monthNewInstallDevice/detail').default)
        })
      }
    },
    {
      path: '/bd/data/monthDayOnLineRate',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/bd/data/monthDayOnLineRate').default)
        })
      }
    },
    {
      path: '/bd/data/monthDayOnLineRate/detail',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/bd/data/monthDayOnLineRate/detail').default)
        })
      }
    },
    {
      path: '/bd/data/monthDayDeviceOrder',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/bd/data/monthDayDeviceOrder').default)
        })
      }
    },
    {
      path: '/bd/data/monthDayDeviceOrder/detail',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/bd/data/monthDayDeviceOrder/detail').default)
        })
      }
    },
    {
      path: '/bd/data/monthRecoveryDevice',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/bd/data/monthRecoveryDevice').default)
        })
      }
    },
    {
      path: '/bd/data/monthRecoveryDevice/detail',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/bd/data/monthRecoveryDevice/detail').default)
        })
      }
    },
    // 盒子数据-累计数据
    {
      path: '/bd/boxData/summaryInstallShop',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/bd/boxData/summaryInstallShop').default)
        })
      }
    },
    {
      path: '/bd/boxData/summaryInstallDevice',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/bd/boxData/summaryInstallDevice').default)
        })
      }
    },
    {
      path: '/bd/boxData/summaryNoReturnBattery',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/bd/boxData/summaryNoReturnBattery').default)
        })
      }
    },
    {
      path: '/bd/boxData/summarySuccessOrder',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/bd/boxData/summarySuccessOrder').default)
        })
      }
    },
    {
      path: '/bd/boxData/summaryDepositMoney',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/bd/boxData/summaryDepositMoney').default)
        })
      }
    },
    {
      path: '/bd/boxData/summaryLeftMoney',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/bd/boxData/summaryLeftMoney').default)
        })
      }
    },
    // 盒子数据-当日数据
    {
      path: '/bd/boxData/todayDataNewInstallDevice',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/bd/boxData/todayDataNewInstallDevice').default)
        })
      }
    },
    {
      path: '/bd/boxData/todayDataBorrowBattery',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/bd/boxData/todayDataBorrowBattery').default)
        })
      }
    },
    {
      path: '/bd/boxData/todayDataSuccessOrder',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/bd/boxData/todayDataSuccessOrder').default)
        })
      }
    },
    {
      path: '/bd/boxData/todayDataSuccessOrderMoney',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/bd/boxData/todayDataSuccessOrderMoney').default)
        })
      }
    },
    {
      path: '/bd/boxData/todayDataUserChargeAllMoney',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/bd/boxData/todayDataUserChargeAllMoney').default)
        })
      }
    },
    {
      path: '/bd/boxData/todayDataNewAddDeposit',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/bd/boxData/todayDataNewAddDeposit').default)
        })
      }
    },
    {
      path: '/bd/boxData/todayDataUnOnLine',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/bd/boxData/todayDataUnOnLine').default)
        })
      }
    },
    // 帮助中心
    {
      path: '/data/help',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/bd/help/').default)
        })
      }
    },
    // 渠道
    {
      path: '/channel',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/channel/').default)
        })
      }
    },
    {
      path: '/channel/agent',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/channel/agent/').default)
        })
      }
    },
    {
      path: '/channel/agent/search',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/channel/agent/search').default)
        })
      }
    },
    {
      path: '/channel/agent/create',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/channel/agent/create').default)
        })
      }
    },
    {
      path: '/channel/agentBD',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/channel/agentBD/').default)
        })
      }
    },
    {
      path: '/channel/agentBD/create',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/channel/agentBD/create').default)
        })
      }
    },
    {
      path: '/channel/agentBD/search',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/channel/agentBD/search').default)
        })
      }
    },
    {
      path: '/channel/purchase/approval',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/channel/purchase/approval').default)
        })
      }
    },
    {
      path: '/channel/purchase/:id/create/express',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/channel/purchase/createExpress').default)
        })
      }
    },
    {
      path: '/channel/data/todayNewInstallDevice',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/channel/data/todayNewInstallDevice').default)
        })
      }
    },
    {
      path: '/channel/data/todayOfflineDevice',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/channel/data/todayOfflineDevice').default)
        })
      }
    },
    {
      path: '/channel/data/todaySuccessOrder',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/channel/data/todaySuccessOrder').default)
        })
      }
    },
    {
      path: '/channel/data/totalInstallShop',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/channel/data/totalInstallShop').default)
        })
      }
    },
    {
      path: '/channel/data/totalInstallDevice',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/channel/data/totalInstallShop').default)
        })
      }
    },
    {
      path: '/channel/data/totalSuccessOrder',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/channel/data/totalInstallShop').default)
        })
      }
    },
    {
      path: '*',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, require('containers/notfound').default)
        })
      }
    }
  ]
}
