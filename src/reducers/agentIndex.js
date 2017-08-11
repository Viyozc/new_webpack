//代理商
import agentLogin from './a/login/login'
import agentTeam from './a/team/'
import agentCount from './a/count/'
//BD代理 BDM代理
import agentBDHome from './a/agentBD/home/'
import agentBDSHOPList from './a/agentBD/shops/list'
import agentBDTeam from './a/agentBD/team/'
import agentBDTeamList from './a/agentBD/teamList/'
import agentBDCreateShop from './a/agentBD/shops/create'
import agentBDSearchShopList from './a/agentBD/shops/search'
import agentBDShopDetail from './a/agentBD/shops/detail'
import agentBDCancelSign from './a/agentBD/shops/cancel'

export default {
  //代理商
  agentLogin,
  agentTeam,
  agentCount,
  //BD代理 BDM代理
  agentBDHome,
  agentBDTeam,
  agentBDSHOPList,
  agentBDCreateShop,
  agentBDSearchShopList,
  agentBDShopDetail,
  agentBDCancelSign,
  agentBDTeamList
}
