import { useState } from 'react'
import './Founders.css'

function Founders() {
  const [selectedFounder, setSelectedFounder] = useState(null)

  const founders = [
    {
      id: 1,
      name: 'Горовий Володимир',
      role: 'Головний Засновник',
      description: 'Геній архітектури, мрія якого змінила світ туалетів. Володимир присвятив своє життя створенню найкращого санітарного закладу у Обухові.',
      emoji: '🧠',
      avatar: '👨‍💼',
      contributions: ['Архітектурний дизайн', 'Бізнес-планування', 'Легенда індустрії'],
    },
    {
      id: 2,
      name: 'Роздобудько Захар',
      role: 'Головний Засновник',
      description: 'Амбітний підприємець, що втілив мрію в реальність. Захар управляв проектом з нульового дня і завжди знав, що це буде мегауспіхом!',
      emoji: '🚀',
      avatar: '👨‍💻',
      contributions: ['Управління проектом', 'Маркетинг', 'Інновації'],
    },
    {
      id: 3,
      name: 'Лисак Максим',
      role: 'Розробник & Дизайнер',
      description: 'Творець цього веб-сайту! Максим вклав душу в кожний піксель. Без його навичок цей проект ніколи б не побачив світ інтернету.',
      emoji: '💻',
      avatar: '👨‍🎨',
      contributions: ['Веб-розробка', 'UI/UX Дизайн', 'Творчість'],
    },
    {
      id: 4,
      name: 'Парфенов Степан',
      role: 'Технічний Менеджер',
      description: 'Забезпечує, щоб все працювало ідеально! Степан - людина, яка розуміється на технічних тонкощах та гарантує якість послуг.',
      emoji: '⚙️',
      avatar: '👨‍🔧',
      contributions: ['Технічна підтримка', 'Якість послуг', 'Надійність'],
    },
  ]

  return (
    <div className="founders-container">
      <h1>👥 Засновники Легенди</h1>
      <p className="subtitle">Люди, що створили найкращий туалет у Обухові!</p>

      <div className="founders-grid">
        {founders.map((founder) => (
          <div
            key={founder.id}
            className="founder-card"
            onClick={() => setSelectedFounder(founder)}
          >
            <div className="founder-avatar">
              <span className="avatar-emoji">{founder.avatar}</span>
              <span className="role-badge">{founder.emoji}</span>
            </div>
            <h3>{founder.name}</h3>
            <p className="role">{founder.role}</p>
            <button className="details-btn">Дізнатись більше →</button>
          </div>
        ))}
      </div>

      {selectedFounder && (
        <div className="modal-overlay" onClick={() => setSelectedFounder(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedFounder(null)}>✕</button>

            <div className="modal-header">
              <div className="modal-avatar">{selectedFounder.avatar}</div>
              <div className="modal-title">
                <h2>{selectedFounder.name}</h2>
                <p className="modal-role">{selectedFounder.role}</p>
              </div>
            </div>

            <div className="modal-body">
              <p className="modal-description">{selectedFounder.description}</p>

              <div className="contributions">
                <h4>Внески до проекту:</h4>
                <ul>
                  {selectedFounder.contributions.map((contribution, idx) => (
                    <li key={idx}>✨ {contribution}</li>
                  ))}
                </ul>
              </div>

              <div className="founder-quote">
                <p>"{selectedFounder.name} - це людина, що змінила світ туалетних закладів навіки!"</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Founders
