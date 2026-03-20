import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import { SchoolDetailPage } from './pages/SchoolDetailPage'
import { MDNFAboutPage } from './pages/MDNFAboutPage'
import { DateTimeBar } from './components/DateTimeBar'
import './style.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <DateTimeBar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/school/:slug" element={<SchoolDetailPage />} />
        <Route path="/mdnf" element={<MDNFAboutPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
