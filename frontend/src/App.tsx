// import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './layouts/Layout'
import Register from './pages/Register'
import Login from './pages/Login'
import { useAppContext } from './contexts/AppContext'
import AddNewHotel from './pages/AddNewHotel'


function App() {

  const { isLoggedIn } = useAppContext();

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout><p>HomePage</p></Layout>} />
        <Route path='/search' element={<Layout><p>Search Page</p></Layout>} />
        <Route path='/register' element={<Layout><Register /></Layout>} />
        <Route path='/sign-in' element={<Layout><Login /></Layout>} />
        {
          isLoggedIn && <>
            <Route path='/add-hotel' element={<Layout><AddNewHotel /></Layout>} />
          </>
        }
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App
