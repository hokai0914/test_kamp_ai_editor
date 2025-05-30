import { Routes, Route } from 'react-router-dom';
import InputPage from './pages/InputPage';
import GeneratePage from './pages/GeneratePage';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<InputPage />} />
      <Route path="/generate" element={<GeneratePage />} />
    </Routes>
  )
}

export default App
