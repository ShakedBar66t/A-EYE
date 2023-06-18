import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { connectToMongoDB } from '@/lib/mongodb';
import User from '@/models/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { email, fullName, sessionId } = req.body;

    try {
        await connectToMongoDB();

        // Find the user document based on the session ID
        const user = await User.findOne({ sessionId });

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        // Update the user's email and fullName
        user.email = email;
        user.fullName = fullName;
        await user.save();

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

