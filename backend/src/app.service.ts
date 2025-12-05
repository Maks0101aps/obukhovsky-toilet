import { Injectable } from '@nestjs/common';

export interface CabinType {
  id: string;
  name: string;
  price: number;
  description: string;
  emoji: string;
  maxSlots: number;
}

export interface BookingData {
  id: string;
  date: string;
  time: string;
  cabinType: string;
  name: string;
  phone: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  totalPrice: number;
}

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

  // Типи кабін з цінами та описами
  private cabinTypes: CabinType[] = [
    {
      id: 'standard',
      name: 'Стандарт',
      price: 15,
      description: 'Звичайна кабіна з усіма зручностями',
      emoji: '🚽',
      maxSlots: 3,
    },
    {
      id: 'vip',
      name: 'VIP-кабіна',
      price: 30,
      description: 'Люкс оформлення, преміум папір, запашні палички',
      emoji: '👑',
      maxSlots: 2,
    },
    {
      id: 'quiet',
      name: 'Тихий режим',
      price: 20,
      description: 'Звукоізоляція, спокійна атмосфера, медитативна музика',
      emoji: '🧘',
      maxSlots: 2,
    },
  ];

  // Базові часові слоти
  private timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30',
  ];

  // Закриті дати (ремонт, санітарна обробка)
  private closedDates = [
    '2025-12-25', // Новий рік
    '2025-01-07', // Рождество
  ];

  // Бронювання по датам/часам/типам
  private allBookings: BookingData[] = [];

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

  // Методи для управління кабінами
  getCabinTypes() {
    return this.cabinTypes;
  }

  getCabinById(id: string) {
    return this.cabinTypes.find((cabin) => cabin.id === id);
  }

  // Перевірка, чи дата - вихідний день
  isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 0 || day === 6;
  }

  // Отримати розписання для певної дати та типу кабіни
  getAvailableSlotsForDate(dateStr: string, cabinTypeId: string) {
    // Перевірка на закриту дату
    if (this.closedDates.includes(dateStr)) {
      return { available: false, reason: 'Заклад закритий на цю дату (ремонт/санітарна обробка)' };
    }

    const date = new Date(dateStr);
    const isWeekend = this.isWeekend(date);

    // Розписання: будні 09:00-11:30, 14:00-18:30; вихідні 10:00-12:00, 14:00-18:00
    let availableSlots = this.timeSlots;
    if (isWeekend) {
      availableSlots = this.timeSlots.filter(
        (t) => (t >= '10:00' && t <= '12:00') || (t >= '14:00' && t <= '18:00')
      );
    }

    // Отримати бронювання на цю дату та кабіну
    const bookingsForDateAndCabin = this.allBookings.filter(
      (b) => b.date === dateStr && b.cabinType === cabinTypeId && b.status === 'confirmed'
    );

    const cabin = this.getCabinById(cabinTypeId);

    // Перевірити, які слоти зайняті
    const slotStatus = availableSlots.map((slot) => {
      const slotBookings = bookingsForDateAndCabin.filter((b) => b.time === slot);
      const isAvailable = slotBookings.length < (cabin?.maxSlots || 1);
      return {
        time: slot,
        available: isAvailable,
        bookedCount: slotBookings.length,
        maxSlots: cabin?.maxSlots || 1,
      };
    });

    return {
      date: dateStr,
      isWeekend,
      cabinType: cabinTypeId,
      slots: slotStatus,
    };
  }

  // Отримати календар на місяць
  getCalendarMonth(year: number, month: number) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const calendar = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateStr = date.toISOString().split('T')[0];
      const isWeekend = this.isWeekend(date);
      const isClosed = this.closedDates.includes(dateStr);

      calendar.push({
        date: dateStr,
        day,
        isWeekend,
        isClosed,
        status: isClosed ? 'closed' : isWeekend ? 'weekend' : 'working',
      });
    }

    return calendar;
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

  // Нове бронювання з датою, часом та типом кабіни
  bookSlot(booking: {
    date: string;
    time: string;
    cabinType: string;
    name: string;
    phone: string;
  }) {
    const cabin = this.getCabinById(booking.cabinType);
    if (!cabin) {
      return { success: false, message: 'Невідомий тип кабіни' };
    }

    // Перевірити доступність слота
    const slots = this.getAvailableSlotsForDate(booking.date, booking.cabinType);
    if ('reason' in slots && !slots.available) {
      return { success: false, message: slots.reason };
    }

    if ('slots' in slots) {
      const slot = slots.slots.find((s) => s.time === booking.time);
      if (!slot || !slot.available) {
        return { success: false, message: 'Цей час недоступний' };
      }
    }

    // Створити нове бронювання
    const newBooking: BookingData = {
      id: `booking_${Date.now()}`,
      date: booking.date,
      time: booking.time,
      cabinType: booking.cabinType,
      name: booking.name,
      phone: booking.phone,
      status: 'confirmed',
      totalPrice: cabin.price,
    };

    this.allBookings.push(newBooking);

    return {
      success: true,
      message: `Бронь прийнята на ${booking.date} о ${booking.time}!`,
      booking: newBooking,
      cabin: cabin.name,
      totalPrice: cabin.price,
    };
  }

  // Отримати всі бронювання користувача (опціонально за номером телефону)
  getUserBookings(phone: string) {
    return this.allBookings.filter((b) => b.phone === phone);
  }

  // Отримати статистику бронювань
  getBookingStats() {
    return {
      totalBookings: this.allBookings.length,
      confirmed: this.allBookings.filter((b) => b.status === 'confirmed').length,
      completed: this.allBookings.filter((b) => b.status === 'completed').length,
      cancelled: this.allBookings.filter((b) => b.status === 'cancelled').length,
    };
  }
}