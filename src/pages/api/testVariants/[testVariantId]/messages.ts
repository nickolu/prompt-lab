import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/firebase";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (!db) {
        return res.status(500).json({ error: "No database connection" });
    }

    try {
        if (req.method === "GET") {
            return res.status(404).send("Get not implementeds");
        } else if (req.method === "POST") {
            const {
                query: { id },
            } = req;

            const testVariantsRef = db.collection("testVariants").doc(id as string);
            const res = await testVariantsRef.collection("messages").add(req.body);
        }
    } catch (error) {
        return res.status(500).json(JSON.stringify(error));
    }
}
