import { AppService, CabinType, BookingData } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getToiletInfo(): {
        name: string;
        description: string;
        address: string;
        workingHours: string;
        rating: number;
        features: string[];
        price: string;
    };
    getCabins(): CabinType[];
    getCalendar(year: string, month: string): any[];
    getAvailableSlots(date: string, cabinType: string): {
        available: boolean;
        reason: string;
        date?: undefined;
        isWeekend?: undefined;
        cabinType?: undefined;
        slots?: undefined;
    } | {
        date: string;
        isWeekend: boolean;
        cabinType: string;
        slots: {
            time: string;
            available: boolean;
            bookedCount: number;
            maxSlots: number;
        }[];
        available?: undefined;
        reason?: undefined;
    } | {
        error: string;
    };
    getReviews(): {
        id: number;
        name: string;
        rating: number;
        text: string;
    }[];
    addReview(review: {
        name: string;
        rating: number;
        text: string;
    }): {
        name: string;
        rating: number;
        text: string;
        id: number;
    };
    getAvailableTime(): {
        time: string;
        available: boolean;
    }[];
    bookSlot(booking: {
        date?: string;
        time: string;
        cabinType?: string;
        name: string;
        phone: string;
    }): {
        success: boolean;
        message: string;
        booking?: undefined;
        cabin?: undefined;
        totalPrice?: undefined;
    } | {
        success: boolean;
        message: string;
        booking: BookingData;
        cabin: string;
        totalPrice: number;
    };
    getUserBookings(phone: string): BookingData[];
    getBookingStats(): {
        totalBookings: number;
        confirmed: number;
        completed: number;
        cancelled: number;
    };
}
