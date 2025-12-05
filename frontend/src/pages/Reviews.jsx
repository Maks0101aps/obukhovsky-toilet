import { useState, useEffect } from 'react'
import axios from 'axios'
import './Reviews.css'

function Reviews() {
  const [reviews, setReviews] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    text: ''
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/reviews')
      setReviews(response.data)
      setLoading(false)
    } catch (err) {
      console.error('Помилка завантаження відгуків:', err)
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.text.trim()) {
      alert('Заповніть усі поля!')
      return
    }

    if (formData.rating <= 2) {
      const confirmed = window.confirm(
        `Ти точно офігів?! 🤯\n\nТи готовий дати ${formData.rating} зірок найкращому туалету Обухова?!\n\nГалло? Галло?! Це найкраще місце на Землі! 🚽✨\n\nПродовжити?`
      )
      if (!confirmed) return
    }

    try {
      await axios.post('http://localhost:3000/api/reviews', formData)
      setFormData({ name: '', rating: 5, text: '' })
      fetchReviews()
    } catch (err) {
      console.error('Помилка відправки відгуку:', err)
    }
  }

  if (loading) {
    return <div className="loading">⏳ Завантажується...</div>
  }

  return (
    <div className="reviews-container">
      <h1>⭐ Відгуки клієнтів</h1>
      
      <div className="reviews-section">
        <div className="reviews-list">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <h3 className="reviewer-name">👤 {review.name}</h3>
                <div className="review-rating">
                  {'⭐'.repeat(review.rating)}
                </div>
              </div>
              <p className="review-text">"{review.text}"</p>
            </div>
          ))}
        </div>

        <div className="review-form-wrapper">
          <h2>✍️ Залишити свій відгук</h2>
          <form className="review-form" onSubmit={handleSubmit}>
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
              <label htmlFor="rating">Рейтинг (1-5 зірок):</label>
              <select
                id="rating"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
              >
                <option value="1">⭐ - Погано</option>
                <option value="2">⭐⭐ - Задовільно</option>
                <option value="3">⭐⭐⭐ - Добре</option>
                <option value="4">⭐⭐⭐⭐ - Дуже добре</option>
                <option value="5">⭐⭐⭐⭐⭐ - Чудово!</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="text">Ваш відгук:</label>
              <textarea
                id="text"
                placeholder="Поділіться своїм досвідом..."
                rows="5"
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              📤 Відправити відгук
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Reviews
