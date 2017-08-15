import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import ROUTES from 'routes'

export default class AppContainer extends Component {
  componentWillReceiveProps (nextProps) {

  }
  render () {
    return <div>
      <Route render={(props) => {
        return <Switch>
          {
            ROUTES.map(
                (item, i) => <Route key={i} exact path={item.path} component={item.page} />
            )
            }
        </Switch>
      }} />
    </div>
  }
}

// import React from 'react'
// import { connect } from 'react-redux'

// import { bindActionCreators } from 'redux';
// import { Route, Switch, HashRouter as Router } from 'react-router-dom'
// import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
// import createHistory from 'history/createHashHistory'
// const history = createHistory()

// /*
//  全局导入less
//  如果你发现你的样式没有起作用，那么很可能是没有在这里导入样式
//  */
// import './app.less'
// import 'containers/Home/styles/home.less'
// import 'containers/Search/styles/search.less'

// import * as globalActions from 'actions/global'
// import { asyncComponent } from './AsyncComponent'

// import homeContainer from 'containers/Home/HomeContainer'
// import Style from './app.less'
// import test from './test.css'
// import home from 'containers/Home/styles/home.less'
// const Search = asyncComponent(() => import(/* webpackChunkName: "search" */ "./containers/Search/SearchContainer"))
// const BookList = asyncComponent(() => import(/* webpackChunkName: "bookList" */ "./containers/BookList/BookListContainer"))
// import ROUTES  from  './routes'
// @connect (
//     state => state,
//     dispatch => bindActionCreators(globalActions, dispatch)
// )
// export default class App extends React.Component {
//     componentWillMount () {
//         Style.use()
//         home.use()
//         test.use()
//     }
//     componentDidMount() {
//         window.addEventListener('hashchange', () => {
//             this.props.currentAnimate('normal')
//         })
//     }

//     render() {
//         return <div>
//       <Route render={(props) => {
//         return  (
//            <Switch>
//             {ROUTES.map((item, i) => <Route key={i} {...props} exact path={item.path} component={item.page} />)}
//           </Switch>
//         )
//       }} />
//     </div>
//     // render() {
//     //   const { animateCls } = this.props.global
//     //   console.log(animateCls)
//     //   return (
//     //     <Route render={({ location }) => {
//     //         return(
//     //             <CSSTransitionGroup
//     //                 transitionName={animateCls}
//     //                 transitionEnter={true}
//     //                 transitionLeave={true}
//     //                 transitionEnterTimeout={400}
//     //                 transitionLeaveTimeout={400}
//     //             >
//     //             <Route render={(props) => {
//     //                 return  (
//     //                 <Switch>
//     //                     {ROUTES.map((item, i) =>
//     //                         <Route key={i}
//     //                         {...props}
//     //                         exact
//     //                         path={item.path} component={item.page}
//     //                         />
//     //                     )}
//     //                 </Switch>
//     //                 )
//     //             }} />
//     //             </CSSTransitionGroup>
//     //         )
//     //     }}/>
//     //   );
// //   }
// }}
