export declare class AppService {
    private reviews;
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
        time: string;
        name: string;
        phone: string;
    }): {
        success: boolean;
        message: string;
    };
}
