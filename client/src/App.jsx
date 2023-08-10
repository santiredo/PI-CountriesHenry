


import Landing from './views/Landing/Landing'
import './App.css'
import { useLocation, Route, Routes } from 'react-router-dom'

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
  }
}
