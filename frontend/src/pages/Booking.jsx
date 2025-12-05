import { useState, useEffect } from 'react'
import axios from 'axios'
import './Booking.css'

function Booking() {
  const [availableSlots, setAvailableSlots] = useState([])
  const [formData, setFormData] = useState({
    time: '',
    name: '',
    phone: ''
  })
  const [loading, setLoading] = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchAvailableSlots()
  }, [])

  const fetchAvailableSlots = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/booking-time')
      setAvailableSlots(response.data)
      setLoading(false)
    } catch (err) {
      console.error('Помилка завантаження часу:', err)
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.time || !formData.name.trim() || !formData.phone.trim()) {
      alert('Заповніть усі поля!')
      return
    }

    try {
      const response = await axios.post('http://localhost:3000/api/booking', formData)
      setMessage(response.data.message)
      setSubmitted(true)
      setFormData({ time: '', name: '', phone: '' })
      fetchAvailableSlots()
      
      setTimeout(() => {
        setSubmitted(false)
        setMessage('')
      }, 5000)
    } catch (err) {
      alert('Помилка при бронюванні: ' + err.response?.data?.message)
    }
  }

  if (loading) {
    return <div className="loading">⏳ Завантажується...</div>
  }

  return (
    <div className="booking-container">
      <h1>📅 Забронювати час відвідування</h1>
      
      <div className="booking-content">
        <div className="booking-info">
          <div className="info-box">
            <h3>📍 Місце розташування</h3>
            <p>Обуховський туалет у центрі</p>
            <p>біля зупинки "Центр"</p>
          </div>

          <div className="info-box">
            <h3>💰 Вартість послуги</h3>
            <p className="price">2 гривні за 30 хвилин</p>
            <p className="price-note">Найдешевша розкіш у місті! 👑</p>
          </div>

          <div className="info-box">
            <h3>💡 Поради</h3>
            <ul>
              <li>📱 Не забудьте телефон</li>
              <li>⏰ Приходьте за 5 хвилин до часу</li>
              <li>💳 Має бути 2+ гривні</li>
              <li>🎉 Отримайте незабутній досвід!</li>
            </ul>
          </div>
        </div>

        <div className="booking-form-section">
          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="time">Виберіть час:</label>
              <div className="time-slots">
                {availableSlots.map((slot) => (
                  <button
                    key={slot.time}
                    type="button"
                    className={`time-slot ${formData.time === slot.time ? 'selected' : ''} ${!slot.available ? 'unavailable' : ''}`}
                    onClick={() => slot.available && setFormData({ ...formData, time: slot.time })}
                    disabled={!slot.available}
                  >
                    {slot.available ? slot.time : `${slot.time} ❌`}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="name">Ваше ім'я:</label>
              <input
                id="name"
                type="text"
                placeholder="Введіть ім'я"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Телефон:</label>
              <input
                id="phone"
                type="tel"
                placeholder="+380 ХХ XXX XX XX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <button type="submit" className="booking-btn">
              ✅ Забронювати
            </button>
          </form>

          {submitted && (
            <div className="success-message">
              <p>🎉 {message}</p>
              <p>Дякуємо за довіру! Ми чекаємо на вас! 🚽</p>
            </div>
          )}
        </div>
      </div>

      <div className="promo">
        <h3>🎁 Спеціальна пропозиція</h3>
        <p>Перший раз у нас? Отримайте 10% знижку при бронюванні на цьому сайті!</p>
      </div>
    </div>
  )
}

export default Booking
