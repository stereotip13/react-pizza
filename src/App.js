import React from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import About from './pages/About'
import Order from './pages/Order'
import Footer from './components/Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  // Навбар и футер должны быть на всех страницах, поэтому оборач-м только в браузРоутер, но не в роутес (внутри роутес переходы)
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/order" element={<Order />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
