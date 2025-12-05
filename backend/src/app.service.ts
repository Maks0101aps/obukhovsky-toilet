import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private reviews = [
    {
      id: 1,
      name: 'Осьмак Ярослав',
      rating: 5,
      text: 'Найвеличніший туалет у Обухові! Ще ніколи не було такого комфорту! 🚽✨',
    },
    {
      id: 2,
      name: 'Кириченко Артем',
      rating: 5,
      text: 'Я змінив своє життя! Тут я знайшов істинне щастя! Рекомендую всім! 💙',
    },
    {
      id: 3,
      name: 'Гончарук Мирослав',
      rating: 5,
      text: 'Був в туалетах по всьому світу - це найкраще місце! Повертаюсь щодня! 🌟',
    },
    {
      id: 4,
      name: 'Яхимович Назар',
      rating: 5,
      text: 'Неймовірно! Краще ніж дома! Все просто перфекто! 👌',
    },
    {
      id: 5,
      name: 'Андрей Вегера',
      rating: 5,
      text: 'Божественне місце! Це як рай на землі! Благаю, приходьте сюди! ✨🚽',
    },
  ];

  private bookings = [
    { time: '09:00', available: true },
    { time: '09:30', available: true },
    { time: '10:00', available: false },
    { time: '10:30', available: true },
    { time: '11:00', available: true },
    { time: '14:00', available: true },
    { time: '15:00', available: false },
  ];

  getToiletInfo() {
    return {
      name: 'Легендарний Туалет Обухова',
      description: 'Найкращий туалет у центрі Обухова! Розташований біля автобусної зупинки "Центр"',
      address: 'вул. Центральна, біля зупинки "Центр", Обухів, Київська область',
      workingHours: '08:00 - 20:00',
      rating: 4.9,
      features: [
        '✨ Преміум туалетна папір',
        '💧 Гарячої води завжди',
        '🧼 Безплатне мило',
        '🌹 Цвіти у туалеті',
        '🎵 Музика для релаксу',
        '☕ Бонус: запах кави',
      ],
      price: 'від 2 гривні',
    };
  }

  getReviews() {
    return this.reviews;
  }

  addReview(review: { name: string; rating: number; text: string }) {
    const newReview = {
      id: this.reviews.length + 1,
      ...review,
    };
    this.reviews.push(newReview);
    return newReview;
  }

  getAvailableTime() {
    return this.bookings;
  }

  bookSlot(booking: { time: string; name: string; phone: string }) {
    const slot = this.bookings.find((b) => b.time === booking.time);
    if (slot && slot.available) {
      slot.available = false;
      return { success: true, message: `Бронь прийнята на ${booking.time}!` };
    }
    return { success: false, message: 'Цей час недоступний' };
  }
}
