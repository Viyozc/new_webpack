export const TabConfig = [{
  label: '待审核',
  status: 0
}, {
  label: '已拒绝',
  status: 1
}, {
  label: '已通过',
  status: 2
}]

export const ApprovalTabConfig = [{
  label: '待审核',
  status: 0
}, {
  label: '待发货',
  status: 1
}, {
  label: '已发货',
  status: 2
}]

export const DataTabConfig = [{
  label: '全部',
  status: 0
}, {
  label: '在线',
  status: 3
}, {
  label: '急需维护',
  status: 1
}, {
  label: '全店离线',
  status: 2
}]
export const DataOfflineTabConfig = [{
  label: '全部',
  status: 0
}, {
  label: '急需维护',
  status: 1
}, {
  label: '全店离线',
  status: 2
}]
export const DataTotalOrderConfig = [{name: '扫码次数', key: 'TOTAL_SCAN_NUM'}, {name: '创建订单', key: 'TOTAL_ORDER_NUM'}, {name: '成功订单', key: 'TOTAL_PAY_NUM'}, {name: '退款订单', key: 'TOTAL_REFUND_NUM'}, {name: '设备日均订单', key: 'TOTAL_AVERAGE_ORDER'}]
export const DataOrderConfig = [{name: '扫码次数', key: 'SCAN_NUM'}, {name: '创建订单', key: 'ORDER_NUM'}, {name: '成功订单', key: 'PAY_NUM'}, {name: '退款订单', key: 'REFUND_NUM'}, {name: '设备日均订单', key: 'AVERAGE_ORDER'}]
export const DataOfflineOrderConfig = [{name: '离线小时数', key: 'OFFLINE_TIME'}, {name: '今日扫码次数', key: 'SCAN_NUM'}, {name: '累计成功订单', key: 'TOTAL_PAY_NUM'}, {name: '累计退款订单', key: 'TOTAL_REFUND_NUM'}]
export const DataSortType = ['DESC', 'ASC']
export const REASONS = [{key: '离线原因', value: '0'}, {key: '电池低电量', value: 'LOW_BATTERY'}, {key: '电池断网', value: 'NO_NETWORK'}, {key: '交流电断网或断电', value: 'AC_NO_NETWORK'}]
