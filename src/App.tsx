import { Routes, Route } from 'react-router-dom';
import InputPage from './pages/InputPage';
import GeneratePage from './pages/GeneratePage';
import './App.css'

function App() {

  return (
    <Routes>
      <Route path="/" element={<InputPage />} />
      <Route path="/generate" element={<GeneratePage />} />
    </Routes>
  )
}

export default App
