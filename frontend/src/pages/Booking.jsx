import { useState, useEffect } from 'react'
import axios from 'axios'
import './Booking.css'

function Booking() {
  const [cabins, setCabins] = useState([])
  const [selectedCabin, setSelectedCabin] = useState('standard')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [availableSlots, setAvailableSlots] = useState([])
  const [calendar, setCalendar] = useState([])
  
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    cabinType: 'standard',
    name: '',
    phone: ''
  })
  
  const [loading, setLoading] = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const [message, setMessage] = useState('')
  const [selectedCabinInfo, setSelectedCabinInfo] = useState(null)
  const [showCalendar, setShowCalendar] = useState(false)

  // Завантажити кабіни, календар та слоти при завантаженні
  useEffect(() => {
    fetchCabins()
    fetchCalendar()
  }, [])

  // Завантажити слоти при зміні дати або типу кабіни
  useEffect(() => {
    if (selectedCabin && selectedDate) {
      fetchAvailableSlots()
      updateFormData()
    }
  }, [selectedCabin, selectedDate])

  const fetchCabins = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/cabins')
      setCabins(response.data)
      if (response.data.length > 0) {
        setSelectedCabinInfo(response.data[0])
      }
      setLoading(false)
    } catch (err) {
      console.error('Помилка завантаження кабін:', err)
      setLoading(false)
    }
  }

  const fetchCalendar = async () => {
    try {
      const now = new Date()
      const response = await axios.get('http://localhost:3000/api/calendar', {
        params: {
          year: now.getFullYear(),
          month: now.getMonth()
        }
      })
      setCalendar(response.data)
    } catch (err) {
      console.error('Помилка завантаження календаря:', err)
    }
  }

  const fetchAvailableSlots = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/available-slots', {
        params: {
          date: selectedDate,
          cabinType: selectedCabin
        }
      })
      if (response.data.slots) {
        setAvailableSlots(response.data.slots)
      }
    } catch (err) {
      console.error('Помилка завантаження часів:', err)
    }
  }

  const updateFormData = () => {
    setFormData(prev => ({
      ...prev,
      date: selectedDate,
      cabinType: selectedCabin
    }))
  }

  const handleCabinChange = (cabinId) => {
    setSelectedCabin(cabinId)
    const cabin = cabins.find(c => c.id === cabinId)
    if (cabin) {
      setSelectedCabinInfo(cabin)
    }
  }

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    setShowCalendar(false)
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowCalendar(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.date || !formData.time || !formData.name.trim() || !formData.phone.trim()) {
      alert('Заповніть усі поля!')
      return
    }

    try {
      const response = await axios.post('http://localhost:3000/api/booking', {
        date: formData.date,
        time: formData.time,
        cabinType: formData.cabinType,
        name: formData.name,
        phone: formData.phone
      })
      
      if (response.data.success) {
        setMessage(`🎉 ${response.data.message}\n💰 Вартість: ${response.data.totalPrice} грн\n📍 ${response.data.cabin}`)
        setSubmitted(true)
        setFormData({ date: '', time: '', cabinType: 'standard', name: '', phone: '' })
        fetchAvailableSlots()
        
        setTimeout(() => {
          setSubmitted(false)
          setMessage('')
        }, 6000)
      }
    } catch (err) {
      alert('Помилка при бронюванні: ' + (err.response?.data?.message || 'Спробуйте пізніше'))
    }
  }

  const getCalendarDayClass = (day) => {
    const status = day.status
    if (day.isClosed) return 'closed'
    if (day.isWeekend) return 'weekend'
    return 'working'
  }

  if (loading) {
    return <div className="loading">⏳ Завантажується...</div>
  }

  return (
    <div className={`booking-container ${showCalendar ? 'calendar-open' : ''}`}>
      <h1>📅 Забронювати час відвідування</h1>
      
      <div className="booking-content">
        {/* Секція з інформацією та типами кабін */}
        <div className="booking-info">
          <div className="info-box">
            <h3>📍 Місце розташування</h3>
            <p>Обуховський туалет у центрі</p>
            <p>біля зупинки "Центр"</p>
          </div>

          <div className="cabin-types">
            <h3>🏘️ Типи кабін</h3>
            {cabins.map(cabin => (
              <div
                key={cabin.id}
                className={`cabin-card ${selectedCabin === cabin.id ? 'selected' : ''}`}
                onClick={() => handleCabinChange(cabin.id)}
              >
                <div className="cabin-emoji">{cabin.emoji}</div>
                <div className="cabin-details">
                  <h4>{cabin.name}</h4>
                  <p className="cabin-desc">{cabin.description}</p>
                  <p className="cabin-price">💰 {cabin.price} грн за 30 хв</p>
                  <p className="cabin-slots">📊 До {cabin.maxSlots} осіб одночасно</p>
                </div>
              </div>
            ))}
          </div>

          <div className="info-box">
            <h3>💡 Поради</h3>
            <ul>
              <li>📱 Не забудьте телефон</li>
              <li>⏰ Приходьте за 5 хвилин до часу</li>
              <li>💳 Мати при собі готівку</li>
              <li>🎉 Отримайте незабутній досвід!</li>
            </ul>
          </div>
        </div>

        {/* Секція форми бронювання */}
        <div className="booking-form-section">
          <form className="booking-form" onSubmit={handleSubmit}>
            {/* Вибір дати */}
            <div className="form-group">
              <label>📆 Виберіть дату:</label>
              <button
                type="button"
                className="date-picker-btn"
                onClick={() => setShowCalendar(!showCalendar)}
              >
                {selectedDate} 📅
              </button>
              
              {showCalendar && calendar.length > 0 && (
                <>
                  <div className="calendar-backdrop" onClick={handleBackdropClick}></div>
                  <div className="calendar-popup">
                    <div className="calendar-grid">
                      {calendar.map(day => (
                        <button
                          key={day.date}
                          type="button"
                          className={`calendar-day ${getCalendarDayClass(day)}`}
                          onClick={() => handleDateSelect(day.date)}
                          disabled={day.isClosed}
                          title={day.isClosed ? 'Закрито' : day.isWeekend ? 'Вихідний' : 'Робочий день'}
                        >
                          {day.day}
                          {day.isClosed && ' ❌'}
                          {day.isWeekend && !day.isClosed && ' 📅'}
                        </button>
                      ))}
                    </div>
                    <p className="calendar-legend">
                      🟩 Робочий • 📅 Вихідний • ❌ Закрито
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Вибір часу */}
            <div className="form-group">
              <label>⏰ Виберіть час:</label>
              {availableSlots.length > 0 ? (
                <div className="time-slots">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot.time}
                      type="button"
                      className={`time-slot ${formData.time === slot.time ? 'selected' : ''} ${!slot.available ? 'unavailable' : ''}`}
                      onClick={() => slot.available && setFormData({ ...formData, time: slot.time })}
                      disabled={!slot.available}
                      title={!slot.available ? `Зайнято (${slot.bookedCount}/${slot.maxSlots})` : ''}
                    >
                      {slot.time}
                      {!slot.available && ` ❌`}
                      <span className="slot-info">{slot.bookedCount}/{slot.maxSlots}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="no-slots">❌ На цю дату немає вільних часів</p>
              )}
            </div>

            {/* Ім'я та телефон */}
            <div className="form-group">
              <label htmlFor="name">👤 Ваше ім'я:</label>
              <input
                id="name"
                type="text"
                placeholder="Введіть ім'я"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">📞 Телефон:</label>
              <input
                id="phone"
                type="tel"
                placeholder="+380 ХХ XXX XX XX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            {/* Кнопка бронювання */}
            <button type="submit" className="booking-btn">
              ✅ Забронювати {selectedCabinInfo && `(${selectedCabinInfo.price} грн)`}
            </button>
          </form>

          {/* Повідомлення про успіх */}
          {submitted && (
            <div className="success-message">
              <p>{message}</p>
              <p>Дякуємо за довіру! Ми чекаємо на вас! 🚽</p>
            </div>
          )}
        </div>
      </div>

      <div className="promo">
        <h3>🎁 Спеціальна пропозиція</h3>
        <p>Перший раз у нас? Отримайте 10% знижку при бронюванні на цьому сайті!</p>
        <p>VIP-кабіна включає: 👑 люкс оформлення, 🧻 преміум папір, 🌸 запашні палички</p>
      </div>
    </div>
  )
}

export default Booking
