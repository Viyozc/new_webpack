import BookList from 'containers/BookList/BookListContainer'
import Home from 'containers/Home/HomeContainer'
import Search from 'containers/Search/SearchContainer'

export default [
  {
    path: '/home',
    page: Home
  },
  {
    path: '/list',
    page: BookList
  },
  {
    path: '/search',
    page: Search
  }
]
