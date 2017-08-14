import BookList from 'containers/BookList/BookListContainer'
import Home from 'containers/Home/HomeContainer'
import Search from 'containers/Search/SearchContainer'

export default {
  path: '/',
  getComponent (nextState, callback) {
    require.ensure([], (require) => {
      callback(null, require('./App').default)
    })
  },
  children: [
    {
      path: 'home',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, Home)
        })
      }
    },
    {
      path: 'list',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, BookList)
        })
      }
    },
    {
      path: 'search',
      getComponent (nextState, callback) {
        require.ensure([], (require) => {
          callback(null, Search)
        })
      }
    }
  ]
}

// export default [
//   {
//     path: '/',
//     page: BookList
//   },
//   {
//     path: '/home',
//     page: Home
//   },
//   {
//     path: '/search',
//     page: Search
//   }
// ]
