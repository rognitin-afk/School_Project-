import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import { SchoolDetailPage } from './pages/SchoolDetailPage'
import './style.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/school/:slug" element={<SchoolDetailPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
