import { combineReducers } from 'redux'
import assign from 'lodash/assign'
import { routerReducer } from 'react-router-redux'
import errorMessage from './errorMessage'
import agentIndex from './agentIndex'
import login from './login'
import pcLogin from './pcLogin'
import shopCreate from './shopCreate'
import shopList from './shopList'
import shopDetail from './shopDetail'
import shopInfo from './shopInfo'
import shopType from './shopType'
import shopSign from './shopSign'
import deviceList from './deviceList'
import deviceBind from './deviceBind'
import chooseIdentity from './chooseIdentity'
import dc from './dc'
import workOrderList from './workOrderList'
import workOrder from './workOrderDetail'
import device from './device'
import home from './home'
import shopDeviceList from './shop/device/list'
import shopAllDeviceList from './shop/device/totalList'
import shopDeviceOfflineList from './shop/device/offlineList'
import shopOrderList from './shop/orderList'
import shopDeviceOrderList from './shop/device/orderList'
import userTeam from './user/team'
import userTeamMember from './user/teamMember'
import user from './user'
import resultOptions from './resultOptions'
import repairDeviceList from './shop/device/repairDeviceList'
import shopCompanyList from './shopCompanyList'
import shopRepairList from './shopRepairList'
import shopRepairAdd from './shopRepairAdd'
import shopExamineList from './shopExamineList'
import shopExamineDetail from './shopExamineDetail'
import shopExamineReason from './shopExamineReason'
import shopExceptionList from './shopExceptionList'
import shopExceptionDetail from './shopExceptionDetail'
import shopExceptionReason from './shopExceptionReason'
import shopSearch from './shopSearch'
import shopSearchSigned from './shopSearchSigned'
import shopAddress from './shop/detail/address'
import bHome from './b/home'
import maxReplace from './recyle/maxReplace'
import bShop from './b/shop'
import deviceManager from './b/deviceManage'
import tabCount from './tabCount'
import { repairDetail } from './warehouse/repairDetail'
import outReducer from './warehouse/out'
import commonReducer from './common'
import shopPosition from './shop/position'
import userMineShopList from './user/mine/shop/list'
import userMineShopDevice from './user/mine/shop/device'
import shopBdInstallDetail from './shop/bd/install/detail'
import reclaimDevices from './reclaim/device'
import reclaimDeviceList from './reclaim/deviceList'
import reclaimBdDevice from './reclaim/bd/device'
import reclaimAdapterBoardNum from './reclaim/adapterBoard'
import shopDeviceRecycleList from './shop/device/recycleList'
import shopDeviceAvgDayOnlineRateList from './shop/device/avgDayOnlineRateList'
import shopAvgDayOrderList from './shop/avgDayOrderList'
import shopFakeBD from './shop/fake/'
import bdDeviceReducer from './bd/device'
import bdShopBoxapplyReducer from './shop/boxapply'

import channelIndexReducer from './channel/'
import channelAgentReducer from './channel/agent'
import channelAgentBDReducer from './channel/agentBD'
import channelPurchaseReducer from './channel/purchase'
import channelDataReducer from './channel/data'
import channelShopAuditing from './channel/auditing'
import aPurchaseReducer from './a/purchase'

import bdIndexReducer from './bd/'
import bdDataReducer from './bd/data'
import boxData from './bd/boxData'

import shopAllocateReducer from './shop/allocate'
import shopEditReducer from './shop/edit'
import heziTest from './repair/heziTest/index'

import * as replaceBD from './a/replaceBD'
import shopChooseBD from './shop/chooseBD'

export default combineReducers(assign({
  routing: routerReducer,
  errorMessage,
  login,
  user,
  pcLogin,
  shopCreate,
  shopList,
  shopType,
  deviceList,
  repairDeviceList,
  deviceBind,
  chooseIdentity,
  shopDetail,
  shopInfo,
  shopAddress,
  shopSign,
  dc,
  workOrderList,
  workOrder,
  device,
  home,
  shopDeviceList,
  shopAllDeviceList,
  shopDeviceOrderList,
  userTeam,
  userTeamMember,
  resultOptions,
  shopDeviceOfflineList,
  shopCompanyList,
  shopRepairList,
  shopRepairAdd,
  shopExamineList,
  shopExamineDetail,
  shopExamineReason,
  shopExceptionList,
  shopExceptionDetail,
  shopExceptionReason,
  bHome,
  maxReplace,
  bShop: bShop.bShopReducer,
  bShopEditComment: bShop.bShopEditComment,
  isUnBind: bShop.unbind,
  setDeviceManager: deviceManager.setDeviceManager,
  getDeviceManager: deviceManager.getDeviceManager,
  deleteDeviceManager: deviceManager.deleteDeviceManager,
  tabCount,
  repairDetail,
  shopOrderList,
  shopPosition,
  outList: outReducer.outList,
  outDetail: outReducer.outApplyDetail,
  reclaimBdDevice,
  reclaimDevices,
  reclaimDeviceList,
  reclaimAdapterBoardNum,
  common: commonReducer.common,
  shopSearch,
  shopSearchSigned,
  userMineShopList,
  userMineShopDevice,
  shopBdInstallDetail,
  shopDeviceRecycleList,
  shopDeviceAvgDayOnlineRateList,
  shopAvgDayOrderList,
  shopFakeBD,
  heziTest,
  supplyPage: bdDeviceReducer.supplyPage,
  bdDeviceListPage: bdDeviceReducer.listPage,
  bdDeviceRecyclePage: bdDeviceReducer.recyclePage,
  bdDeviceApplyPage: bdDeviceReducer.applyPage,
  bdDeviceLosePage: bdDeviceReducer.losePage,
  bdDeviceLostApplyPage: bdDeviceReducer.lostDevicePage,
  bdHandleLostPage: bdDeviceReducer.bdHandleLostPage,
  bdExchangePage: bdDeviceReducer.bdExchangePage,
  channelIndexPage: channelIndexReducer.IndexPage,
  channelAgentIndexPage: channelAgentReducer.IndexPage,
  channelAgentSearchPage: channelAgentReducer.SearchPage,
  channelAgentCreatePage: channelAgentReducer.CreatePage,
  channelAgentBDIndexPage: channelAgentBDReducer.IndexPage,
  channelAgentBDSearchPage: channelAgentBDReducer.SearchPage,
  channelAgentBDCreatePage: channelAgentBDReducer.CreatePage,
  channelPurchaseApprovalPage: channelPurchaseReducer.ApprovalPage,
  channelPurchaseCreateExpressPage: channelPurchaseReducer.CreateExpressPage,
  channelDataTodayNewInstallDevicePage: channelDataReducer.TodayNewInstallDevicePage,
  channelDataTodayOfflineDevicePage: channelDataReducer.TodayOfflineDevicePage,
  channelDataTotalInstallShopPage: channelDataReducer.TotalInstallShopPage,
  channelDataTodaySuccessOrderPage: channelDataReducer.TodaySuccessOrderPage,
  channelShopAuditing,
  aPurchaseIndexPage: aPurchaseReducer.IndexPage,
  aPurchaseApplyPage: aPurchaseReducer.ApplyPage,
  aPurchaseConfirmBookPage: aPurchaseReducer.ConfirmBookPage,
  bdShopBoxapplyIndexPage: bdShopBoxapplyReducer.IndexPage,
  bdIndexPage: bdIndexReducer.IndexPage,
  bdDataTodaySuccessOrderPage: bdDataReducer.TodaySuccessOrderPage,
  bdSummaryDataRecoveryPage: bdDataReducer.SummaryDataRecovery,
  bdMonthDataPage: bdDataReducer.MonthData,
  shopAllocateIndexPage: shopAllocateReducer.IndexPage,
  shopAllocateChosePage: shopAllocateReducer.ChosePage,
  shopEditReducerIndexPage: shopEditReducer.IndexPage,

  boxData,
  replaceBD: replaceBD.replaceBD,
  replaceBDChose: replaceBD.replaceBDChose,
  shopChooseBD: shopChooseBD,
}, agentIndex))
