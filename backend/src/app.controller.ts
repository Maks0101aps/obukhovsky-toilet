import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AppService, CabinType, BookingData } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('info')
  getToiletInfo() {
    return this.appService.getToiletInfo();
  }

  // Кабіни
  @Get('cabins')
  getCabins(): CabinType[] {
    return this.appService.getCabinTypes();
  }

  // Календар на місяць
  @Get('calendar')
  getCalendar(@Query('year') year: string, @Query('month') month: string) {
    const y = parseInt(year) || new Date().getFullYear();
    const m = parseInt(month) || new Date().getMonth();
    return this.appService.getCalendarMonth(y, m);
  }

  // Доступні слоти для конкретної дати і типу кабіни
  @Get('available-slots')
  getAvailableSlots(@Query('date') date: string, @Query('cabinType') cabinType: string) {
    if (!date || !cabinType) {
      return { error: 'date та cabinType параметри обов\'язкові' };
    }
    return this.appService.getAvailableSlotsForDate(date, cabinType);
  }

  // Відгуки
  @Get('reviews')
  getReviews() {
    return this.appService.getReviews();
  }

  @Post('reviews')
  addReview(@Body() review: { name: string; rating: number; text: string }) {
    return this.appService.addReview(review);
  }

  // Старий endpoint для сумісності
  @Get('booking-time')
  getAvailableTime() {
    return this.appService.getAvailableTime();
  }

  // Нове бронювання з датою та типом кабіни
  @Post('booking')
  bookSlot(
    @Body()
    booking: {
      date?: string;
      time: string;
      cabinType?: string;
      name: string;
      phone: string;
    }
  ) {
    // Якщо дата не передана, використовуємо сьогодні
    const date = booking.date || new Date().toISOString().split('T')[0];
    // Якщо тип кабіни не передан, використовуємо 'standard'
    const cabinType = booking.cabinType || 'standard';

    return this.appService.bookSlot({
      date,
      time: booking.time,
      cabinType,
      name: booking.name,
      phone: booking.phone,
    });
  }

  // Бронювання користувача за телефоном
  @Get('bookings')
  getUserBookings(@Query('phone') phone: string): BookingData[] {
    if (!phone) {
      return [];
    }
    return this.appService.getUserBookings(phone);
  }

  // Статистика бронювань
  @Get('booking-stats')
  getBookingStats() {
    return this.appService.getBookingStats();
  }
}
