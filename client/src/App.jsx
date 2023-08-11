
import { useLocation, Route, Routes } from 'react-router-dom'
import Home from './views/Home/Home'
import Landing from './views/Landing/Landing'
import './App.css'


export default function App() {


  const location = useLocation()

  if(location.pathname === '/'){
    return (
      <>
        <Routes>
          <Route path='/' element={<Landing/>}/>
        </Routes>
      </>
    )
  } else {
    return (
      <>
        <Routes>
          <Route path='/home' element={<Home/>}/>
        </Routes>
      </>
    )
  }
}
