import { getAuth, clerkClient } from "@clerk/nextjs/server";
import type { NextApiRequest, NextApiResponse } from "next";

export const getUserIdFromClerk = async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId } = getAuth(req);

    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await clerkClient.users.getUser(userId);

    // use the user object to decide what data to return
    console.log("the user is : ", userId)
    return userId;
};