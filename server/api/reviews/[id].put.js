import Review from '~/server/models/Users/Review';
import Contractor from '~/server/models/Users/Contractor.js';
import User from '~/server/models/Users/User.js';
import { connectDB } from '~/server/utils/dbConnect';
import { disconnectDB } from '~/server/utils/dbDisconnect';

export default defineEventHandler(async (event) => {
    await connectDB(); // Ensure DB connection
    try {
        const body = await readBody(event);
        const reviewId = event.context.params.id;

        // console.log("Updating a review");

        const review = await Review.findById(reviewId);
        if (!review) {
            throw createError({ statusCode: 404, message: 'Review not found' });
        }

        Object.assign(review, body);
        await review.save();
        await disconnectDB();
        return review;
    } catch (error) {
        console.error('Error in PUT /api/reviews/:id:', error);
        throw createError({ statusCode: 500, message: 'Server Error' });
    }
});
