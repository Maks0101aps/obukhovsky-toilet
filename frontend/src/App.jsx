import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Home from './pages/Home'
import Reviews from './pages/Reviews'
import Booking from './pages/Booking'
import Founders from './pages/Founders'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [toiletInfo, setToiletInfo] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:3000/api/info')
      .then(res => setToiletInfo(res.data))
      .catch(err => console.error('Помилка завантаження:', err))
  }, [])

  return (
    <div className="app">
      <header className="header">
        <nav className="nav">
          <button 
            className={`nav-btn ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => setCurrentPage('home')}
          >
            🏠 Головна
          </button>
          <button 
            className={`nav-btn ${currentPage === 'reviews' ? 'active' : ''}`}
            onClick={() => setCurrentPage('reviews')}
          >
            ⭐ Відгуки
          </button>
          <button 
            className={`nav-btn ${currentPage === 'booking' ? 'active' : ''}`}
            onClick={() => setCurrentPage('booking')}
          >
            📅 Бронь
          </button>
          <button 
            className={`nav-btn ${currentPage === 'founders' ? 'active' : ''}`}
            onClick={() => setCurrentPage('founders')}
          >
            👥 Засновники
          </button>
        </nav>
      </header>

      <main className="main">
        {currentPage === 'home' && <Home toiletInfo={toiletInfo} />}
        {currentPage === 'reviews' && <Reviews />}
        {currentPage === 'booking' && <Booking />}
        {currentPage === 'founders' && <Founders />}
      </main>

      <footer className="footer">
        <p>🚽 Легендарний Туалет Обухова © 2025</p>
        <p>Найкращий туалет біля автобусної зупинки "Центр"</p>
        <p className="copyright">Розробка: Lysak Maksym 2025</p>
      </footer>
    </div>
  )
}

export default App
