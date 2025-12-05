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
export declare class AppService {
    private reviews;
    private cabinTypes;
    private timeSlots;
    private closedDates;
    private allBookings;
    private bookings;
    getToiletInfo(): {
        name: string;
        description: string;
        address: string;
        workingHours: string;
        rating: number;
        features: string[];
        price: string;
    };
    getCabinTypes(): CabinType[];
    getCabinById(id: string): CabinType;
    isWeekend(date: Date): boolean;
    getAvailableSlotsForDate(dateStr: string, cabinTypeId: string): {
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
    };
    getCalendarMonth(year: number, month: number): any[];
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
        date: string;
        time: string;
        cabinType: string;
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
