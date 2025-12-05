import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('info')
  getToiletInfo() {
    return this.appService.getToiletInfo();
  }

  @Get('reviews')
  getReviews() {
    return this.appService.getReviews();
  }

  @Post('reviews')
  addReview(@Body() review: { name: string; rating: number; text: string }) {
    return this.appService.addReview(review);
  }

  @Get('booking-time')
  getAvailableTime() {
    return this.appService.getAvailableTime();
  }

  @Post('booking')
  bookSlot(@Body() booking: { time: string; name: string; phone: string }) {
    return this.appService.bookSlot(booking);
  }
}
