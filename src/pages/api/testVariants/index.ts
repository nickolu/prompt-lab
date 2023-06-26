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
            // console.log("getting test variants");
            // const snapshot = await db.collection("testVariants").get();
            // const testVariants = snapshot.docs.map((doc) => {
            //     console.log("doc", doc);
            //     console.log("messages", doc.data().messages);
            //     return {
            //         id: doc.id,
            //         ...doc.data(),
            //     };
            // });
            // const testVariants = [
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
            return res.status(404).send("Get not implemented");
        } else if (req.method === "POST") {
            console.log("creating variant", req.body);
            const docRef = await db.collection("testVariants").add(req.body);
            const newDoc = await docRef.get();
            return res.status(200).json({ id: newDoc.id, ...newDoc.data() });
            // return res.status(200).json({ id: "0004", ...req.body });
        }
    } catch (error) {
        return res.status(500).json(JSON.stringify(error));
    }
}
