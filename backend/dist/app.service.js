"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
let AppService = class AppService {
    constructor() {
        this.reviews = [
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
        this.cabinTypes = [
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
        this.timeSlots = [
            '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
            '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
            '17:00', '17:30', '18:00', '18:30',
        ];
        this.closedDates = [
            '2025-12-25',
            '2025-01-07',
        ];
        this.allBookings = [];
        this.bookings = [
            { time: '09:00', available: true },
            { time: '09:30', available: true },
            { time: '10:00', available: false },
            { time: '10:30', available: true },
            { time: '11:00', available: true },
            { time: '14:00', available: true },
            { time: '15:00', available: false },
        ];
    }
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
    getCabinTypes() {
        return this.cabinTypes;
    }
    getCabinById(id) {
        return this.cabinTypes.find((cabin) => cabin.id === id);
    }
    isWeekend(date) {
        const day = date.getDay();
        return day === 0 || day === 6;
    }
    getAvailableSlotsForDate(dateStr, cabinTypeId) {
        if (this.closedDates.includes(dateStr)) {
            return { available: false, reason: 'Заклад закритий на цю дату (ремонт/санітарна обробка)' };
        }
        const date = new Date(dateStr);
        const isWeekend = this.isWeekend(date);
        let availableSlots = this.timeSlots;
        if (isWeekend) {
            availableSlots = this.timeSlots.filter((t) => (t >= '10:00' && t <= '12:00') || (t >= '14:00' && t <= '18:00'));
        }
        const bookingsForDateAndCabin = this.allBookings.filter((b) => b.date === dateStr && b.cabinType === cabinTypeId && b.status === 'confirmed');
        const cabin = this.getCabinById(cabinTypeId);
        const slotStatus = availableSlots.map((slot) => {
            const slotBookings = bookingsForDateAndCabin.filter((b) => b.time === slot);
            const isAvailable = slotBookings.length < ((cabin === null || cabin === void 0 ? void 0 : cabin.maxSlots) || 1);
            return {
                time: slot,
                available: isAvailable,
                bookedCount: slotBookings.length,
                maxSlots: (cabin === null || cabin === void 0 ? void 0 : cabin.maxSlots) || 1,
            };
        });
        return {
            date: dateStr,
            isWeekend,
            cabinType: cabinTypeId,
            slots: slotStatus,
        };
    }
    getCalendarMonth(year, month) {
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
    addReview(review) {
        const newReview = Object.assign({ id: this.reviews.length + 1 }, review);
        this.reviews.push(newReview);
        return newReview;
    }
    getAvailableTime() {
        return this.bookings;
    }
    bookSlot(booking) {
        const cabin = this.getCabinById(booking.cabinType);
        if (!cabin) {
            return { success: false, message: 'Невідомий тип кабіни' };
        }
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
        const newBooking = {
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
    getUserBookings(phone) {
        return this.allBookings.filter((b) => b.phone === phone);
    }
    getBookingStats() {
        return {
            totalBookings: this.allBookings.length,
            confirmed: this.allBookings.filter((b) => b.status === 'confirmed').length,
            completed: this.allBookings.filter((b) => b.status === 'completed').length,
            cancelled: this.allBookings.filter((b) => b.status === 'cancelled').length,
        };
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map