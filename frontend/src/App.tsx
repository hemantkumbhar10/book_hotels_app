// import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import Layout from './layouts/Layout'


function App() {

  return (
    <>
        <Routes>
          <Route path='/' element={<Layout><p>HomePage</p></Layout>}/>
          <Route path='/search' element={<Layout><p>Search Page</p></Layout>}/>
        </Routes>
    </>
  )
}

export default App
