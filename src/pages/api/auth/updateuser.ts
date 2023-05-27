import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { options } from './[...nextauth]';
import { notFound } from 'next/navigation';
import { connectToMongoDB } from '@/lib/mongodb';
import { getServerSession } from 'next-auth';

const updateUserHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {email, fullName} = req.body
    console.log(req.body, 'req.body');
    


    // const session = await getServerSession(options)
    // console.log(session, 'session')
    // if (!session) {
    //     console.log();
        
    // }

    // try {
    //     const session = await getSession({ req });
    //     if (!session) {
    //         res.status(401).json({ message: 'Unauthorized' });
    //         return;
    //     }

    //     console.log(session, 'session');

    //     if (req.method !== 'PUT') {
    //         res.status(405).json({ message: 'Method not allowed' });
    //         return;
    //     }

    //     const { fullName, email } = req.body;
    //     const userId = session.user?.user_id;

    //     console.log(userId, 'userId');

    //     res.status(200).json({ message: 'User updated successfully' });
    // } catch (error) {
    //     res.status(500).json({ message: 'Internal server error' });
    // }
};

export default updateUserHandler;
