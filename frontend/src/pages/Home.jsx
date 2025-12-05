import './Home.css'

function Home({ toiletInfo }) {
  if (!toiletInfo) {
    return <div className="loading">⏳ Завантажується...</div>
  }

  return (
    <div className="home-container">
      <div className="hero">
        <div className="hero-content">
          <h1 className="title">
            🚽 {toiletInfo.name}
          </h1>
          <p className="tagline">
            ✨ Найкращий туалет у центрі Обухова! ✨
          </p>
          <p className="description">
            {toiletInfo.description}
          </p>
        </div>
        
        <div className="toilet-paper-animation">
          <div className="roll">🧻</div>
          <div className="roll">🧻</div>
          <div className="roll">🧻</div>
        </div>
      </div>

      <div className="info-cards">
        <div className="card info-card">
          <h3>📍 Адреса</h3>
          <p>{toiletInfo.address}</p>
        </div>

        <div className="card info-card">
          <h3>🕐 Час роботи</h3>
          <p>{toiletInfo.workingHours}</p>
        </div>

        <div className="card info-card">
          <h3>💰 Вартість</h3>
          <p className="price">{toiletInfo.price}</p>
        </div>

        <div className="card info-card">
          <h3>⭐ Рейтинг</h3>
          <p className="rating">{'⭐'.repeat(5)}</p>
          <p className="rating-text">{toiletInfo.rating}/5</p>
        </div>
      </div>

      <div className="features">
        <h2>🌟 Наші особливості:</h2>
        <div className="features-grid">
          {toiletInfo.features.map((feature, idx) => (
            <div key={idx} className="feature-item">
              <p>{feature}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="testimonial">
        <h2>💬 Оцінки від задоволених клієнтів:</h2>
        <div className="testimonial-box">
          <p className="quote">
            "Я змінив своє життя після першого відвідування цього прекрасного місця!"
          </p>
          <p className="author">— Аноніма</p>
        </div>
      </div>

      <div className="cta">
        <h2>🎉 Готові до незабутнього досвіду?</h2>
        <p>Приходьте до нас сьогодні та відчуйте розкіш!</p>
      </div>
    </div>
  )
}

export default Home
