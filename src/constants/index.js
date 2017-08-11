export const API_CODE_NEED_LOGIN = 206
export const API_CODE_NO_ACCESS = 252
export const API_CODE_NO_ROLE = 253
export const QQ_MAP_KEY = 'DHFBZ-HV63X-AMM43-ZOAUQ-VHCT6-MJFFF'
export const SELLER_ROLE = 'seller'
export const AGENT_ROLE = 'agent'
export const COOKIT_OPTIONS = {
  expires: 30,
  httpOnly: false,
  domain: 'dian.so',
  path: '/'
}

//  请勿改变roleIndex的值
export const ROLE_STATUS = [
  {
    name: '店铺BD',
    role: 'agentSeller',
    roleIndex: 0
  },
  // {
  //   name: '安装施工',
  //   role: 'installer',
  //   roleIndex: 1
  // },
  {
    name: '仓库管理',
    role: 'warehouseKeeper',
    roleIndex: 2
  },
  {
    name: '客服',
    role: 'customerService',
    roleIndex: 3
  },
  {
    name: '数据中心',
    role: 'dataAnalyzer',
    roleIndex: 4
  },
  {
    name: 'BD主管',
    role: 'agentSellerManager',
    roleIndex: 5
  },
  // {
  //   name: '风控',
  //   role: 'riskManager',
  //   roleIndex: 6
  // },
  {
    name: 'CEO',
    role: 'ceo',
    roleIndex: 25
  },
  {
    name: '管理员',
    role: 'admin',
    roleIndex: 8
  },
  {
    name: '采购员',
    role: 'purchaseAgent',
    roleIndex: 10
  },
  {
    name: '渠道经理',
    role: 'channelManager',
    roleIndex: 22
  },
  {
    name: '财务经理',
    role: 'affairsManager',
    roleIndex: 23
  },
  {
    name: '仓库主管',
    role: 'warehouseManager',
    roleIndex: 11
  }
]
