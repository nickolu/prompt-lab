import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/firebase";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const {
        query: { id },
    } = req;

    if (!db) {
        return res.status(500).json({ error: "No database connection" });
    }

    try {
        if (req.method === "GET") {
            const doc = db.collection("testRuns").doc(id as string);
            const item = await doc.get();
            const testRun = item.data();
            // const testRun = {
            //     id,
            //     name: "Test Run Name",
            // };

            if (!testRun) {
                res.status(404).send("Test run not found");
                return;
            }

            res.status(200).json(testRun);
        } else {
            // Handle any other HTTP method
            res.setHeader("Allow", ["GET"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        return res.status(500).json(JSON.stringify(error));
    }
}
