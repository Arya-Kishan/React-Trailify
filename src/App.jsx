import './App.css';
import Homepage from './pages/HomePage/Homepage';
import { useDispatch } from 'react-redux'
import { getCategory, getImagesUrl, getPopular } from '../src/store/HomeSlice'
import { lazy} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { getAuth } from 'firebase/auth'
import { app } from './Firebase/Firebase'
import Login from './pages/login/Login'
import { Suspense } from 'react';
import { fireContext } from './Firebase/FireContext';
import { useContext } from 'react';
import { useQueryApi } from './hooks/useQueryApi';



const Details = lazy(() => (import('./pages/Details/Details')))
const Navbar = lazy(() => (import('./components/Navbar/Navbar')))
const SearchPage = lazy(() => (import('./pages/SearchPage/SearchPage')))
const Explore = lazy(() => (import('./pages/explore/Explore')))
const Profile = lazy(() => (import('./pages/Profile/Profile')))
const Button = lazy(() => (import('./components/button/Button')))

const auth = getAuth(app)


function App() {

  const dispatch = useDispatch();
  const { userInfo, setUserInfo } = useContext(fireContext)

  let { data: img } = useQueryApi('/configuration')
  dispatch(getImagesUrl(`${img?.images?.secure_base_url}original`))

  let { data: res } = useQueryApi('/genre/movie/list')
  dispatch(getCategory(res?.genres))

  const { data: popular } = useQueryApi(`/movie/popular`)
  dispatch(getPopular(popular?.results))


  if (!userInfo) {
    return (<Login />)
  }

  return (
    <>
      {
        userInfo && (
          <>
            <BrowserRouter>
              <Suspense fallback={<h1>Loading...APP</h1>} >
                <Navbar />
                <Routes>
                  <Route path='/' element={<Homepage />} />
                  <Route path='/details/:type/:id' element={<Details />} />
                  <Route path='/search/:query' element={<SearchPage />} />
                  <Route path='/explore/:id/:name' element={<Explore />} />
                  <Route path='/profile' element={<Profile />} />
                </Routes>
                <Button />
              </Suspense>
            </BrowserRouter>
          </>
        )
      }
    </>
  );
}

export default App;
