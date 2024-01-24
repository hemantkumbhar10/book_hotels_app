// import { useState } from 'react'
import { Navigate, Route,Routes } from 'react-router-dom'
import Layout from './layouts/Layout'
import Register from './pages/Register'


function App() {

  return (
    <>
        <Routes>
          <Route path='/' element={<Layout><p>HomePage</p></Layout>}/>
          <Route path='/search' element={<Layout><p>Search Page</p></Layout>}/>
          <Route path='/register' element={<Layout><Register/></Layout>}/>
          <Route path='*' element={<Navigate to="/"/>}/>
        </Routes>
    </>
  )
}

export default App
