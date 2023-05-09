import { NextApiRequest, NextApiResponse } from "next"
import { hash } from "bcryptjs"
import { connectToMongoDB } from "../../../lib/mongodb"
import User from "../../../../models/user"
import { IUser } from "../../../../types/db"
import bodyParser from 'body-parser'

const jsonParser = bodyParser.json()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await connectToMongoDB();

        if (req.method === "POST") {
            jsonParser(req, res, async () => {
                if (!req.body) return res.status(400).json({ error: "Data is missing" })

                const { fullName, email, password, interests } = req.body

                const userExists = await User.findOne({ email })

                if (userExists) {
                    return res.status(409).json({ error: "User Already exists" })
                } else {
                    if (password.length < 6)
                        return res.status(409).json({ error: "Password should be 6 characters long" })

                    const hashedPassword = await hash(password, 12)

                    const newUser: IUser = new User({
                        interests,
                        fullName,
                        email,
                        password: hashedPassword,
                    })

                    const savedUser = await newUser.save() as IUser

                    console.log('User saved to database:', savedUser);
                    return res.status(201).json({
                        success: true,
                        user: {
                            email: savedUser.email,
                            fullName: savedUser.fullName,
                            _id: savedUser._id,
                            interests: savedUser.interests
                        }
                    });
                }
            })
        } else {
            res.status(405).json({ error: "Method Not Allowed" })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export default handler;
