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
            console.log("getting test runs");
            const snapshot = await db.collection("testRuns").get();
            const testRuns = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            // const testRuns = [
            //     {
            //         id: "0001",
            //         name: "Test Run 1",
            //     },
            //     {
            //         id: "0002",
            //         name: "Test Run 2",
            //     },
            //     {
            //         id: "0003",
            //         name: "Test Run 3",
            //     },
            // ];
            res.status(200).json(testRuns);
        } else if (req.method === "POST") {
            console.log("creating test run");
            const docRef = await db.collection("testRuns").add(req.body);
            const newDoc = await docRef.get();
            return res.status(200).json({ id: newDoc.id, ...newDoc.data() });
            // return res.status(200).json({ id: "0004", ...req.body });
        }
    } catch (error) {
        return res.status(500).json(JSON.stringify(error));
    }
}
