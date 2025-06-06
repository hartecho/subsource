import Contractor from '~/server/models/Users/Contractor.js';
import { connectDB } from '~/server/utils/dbConnect';
import { disconnectDB } from '~/server/utils/dbDisconnect';

export default defineEventHandler(async (event) => {
  await connectDB(); // Ensure DB connection
  try {
    const body = await readBody(event);
    body._id = null;
    const contractor = new Contractor(body);
    await contractor.save();
    const savedContractor = await Contractor.findOne({company: contractor.company});
    await disconnectDB();
    return savedContractor;
  } catch (error) {
    console.error('Error in POST /api/contractors:', error);
    throw createError({ statusCode: 500, message: 'Server Error' });
  }
});
