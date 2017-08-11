//  请勿改变totalCountKey的值
export const BD_STATUS = [
  // {
  //   name: '待申请安装',
  //   status: 0,
  //   totalCountKey: 'waitSignContract'
  // },
  // {
  //   name: '审批拒绝',
  //   status: 2,
  //   totalCountKey: 'examineReject'
  // },
  {
    name: '待安装',
    status: 0,
    totalCountKey: 'newShop'
  },
  {
    name: '已安装',
    status: 4
    // totalCountKey: 'installed'
  },
  {
    name: `待确认`,
    status: 2
    // totalCountKey: 'waitExamine'
  },
  {
    name: '无法安装',
    status: 5
  },
  {
    name: '全部',
    status: -1
    // totalCountKey: 'all'
  }
]

export const EXAMINE_STATUS = [
  {
    name: '待审批',
    status: 0,
    totalCountKey: 'waitExamine'
  },
  {
    name: '审批拒绝',
    status: 1,
    totalCountKey: 'examineReject'
  },
  {
    name: '审批通过',
    status: 2,
    totalCountKey: 'examineSuccess'
  }
]

export const EXCEPTION_STATUS = [
  {
    name: '待处理',
    status: 0,
    totalCountKey: 'deal'
  },
  {
    name: '处理完成',
    status: 2,
    totalCountKey: 'dealt'
  }
]

export const REPAIR_STATUS = [
  {
    name: '待配货',
    status: 0,
    totalCountKey: 'toDeliver'
  },
  {
    name: '待领取',
    status: 1,
    totalCountKey: 'delivered'
  },
  {
    name: '完成申领',
    status: 2,
    totalCountKey: 'completed'
  }
]

export const BD_DEVICE_LIST_TAB_CONFIG = [
  {
    label: '待领取',
    type: 0
  }, {
    label: '退回中',
    type: 1
  }, {
    label: '已使用',
    type: 2
  }, {
    label: '已退回',
    type: 3
  }, {
    label: '借出中',
    type: 7
  }, {
    label: '已借出',
    type: 8
  }, {
    label: '已遗失',
    type: 4
  }, {
    label: '已领取',
    type: 5
  }, {
    label: '已回收',
    type: 6
  }
]

export const BDM_DEVICE_LIST_TAB_CONFIG = [
  {
    label: '待领取',
    type: 0
  }, {
    label: '退回中',
    type: 1
  }, {
    label: '已退回',
    type: 3
  }, {
    label: '借出中',
    type: 7
  }, {
    label: '已借出',
    type: 8
  }, {
    label: '已领取',
    type: 5
  }
]
export const AGENT_COUNT_DETIAL = [
  {
    name: '全部',
    status: -1
  }, {
    name: '收入',
    status: 0
  }, {
    name: '支出',
    status: 1
  }
]
export const BdDataTabConfig = [{
  label: '门店汇总',
  status: 0
}, {
  label: '订单列表(实时)',
  status: 1
}]
export const allotTypeTabConfig = [{
  label: '渠道分配',
  status: 0
}, {
  label: '内部调配',
  status: 1
}]
export const BdDataTimes = [
  {key: '时间段', value: ''},
  {key: '0点', value: '0'},
  {key: '1点', value: '1'},
  {key: '2点', value: '2'},
  {key: '3点', value: '3'},
  {key: '4点', value: '4'},
  {key: '5点', value: '5'},
  {key: '6点', value: '6'},
  {key: '7点', value: '7'},
  {key: '8点', value: '8'},
  {key: '9点', value: '9'},
  {key: '10点', value: '10'},
  {key: '11点', value: '11'},
  {key: '12点', value: '12'},
  {key: '13点', value: '13'},
  {key: '14点', value: '14'},
  {key: '15点', value: '15'},
  {key: '16点', value: '16'},
  {key: '17点', value: '17'},
  {key: '18点', value: '18'},
  {key: '19点', value: '19'},
  {key: '20点', value: '20'},
  {key: '21点', value: '21'},
  {key: '22点', value: '22'},
  {key: '23点', value: '23'}
]

export const BdDataOrderStatus = [
  {
    key: '订单状态',
    value: 0
  },
  {
    key: '待支付',
    value: 1
  },
  {
    key: '已支付',
    value: 2
  },
  {
    key: '自动退款',
    value: 3
  },
  {
    key: '用户退款',
    value: 4
  },
  {
    key: '客服退款',
    value: 5
  }
]

export const BD_LOST_CHECK_TABS = [
  {
    status: 0,
    title: '待审核'
  },
  {
    status: 1,
    title: '已审核'
  }
]

export const BD_LOST_CHECK_STATUS = [
  {
    status: 0,
    value: '待审核'
  },
  {
    status: 1,
    value: '通过审核'
  },
  {
    status: 2,
    value: '审核拒绝'
  }
]
