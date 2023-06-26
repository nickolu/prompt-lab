import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/firebase";
import TestVariant from "@/entities/TestVariant";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const {
        query: { testRunId },
    } = req;

    if (!db) {
        return res.status(500).json({ error: "No database connection" });
    }

    try {
        if (req.method === "GET") {
            const testVariantsRef = db.collection("testVariants");
            const snapshot = await testVariantsRef
                .where("testRunId", "==", testRunId)
                .get();

            if (snapshot.empty) {
                return res.status(200).json([]);
            }

            let testVariants: any[] = [];
            snapshot.forEach((doc) => {
                console.log("snapshot", doc.data());
                let variantData = doc.data();
                variantData.id = doc.id; // Include the doc ID in the data
                testVariants.push(variantData);
            });

            console.log("test variants", testVariants);

            // const testVariants = [
            //     {
            //         testRunId,
            //         id: "0001",
            //         name: "Test Variant 1",
            //         temperature: 0.5,
            //         model: "gpt-4",
            //         result: "Fine, how are you?",
            //         messages: [
            //             {
            //                 type: "system",
            //                 text: "You are a cool bot",
            //             },
            //             {
            //                 type: "human",
            //                 text: "Hello bot",
            //             },
            //             {
            //                 type: "ai",
            //                 text: "Hello human",
            //             },
            //             {
            //                 type: "human",
            //                 text: "How are you?",
            //             },
            //         ],
            //     },
            //     {
            //         testRunId,
            //         id: "0002",
            //         name: "Test Variant 1",
            //         temperature: 0.5,
            //         model: "gpt-4",
            //         result: "Fine, how are you?",
            //         messages: [
            //             {
            //                 type: "system",
            //                 text: "You are a cool bot",
            //             },
            //             {
            //                 type: "human",
            //                 text: "Hello bot",
            //             },
            //             {
            //                 type: "ai",
            //                 text: "Hello human",
            //             },
            //             {
            //                 type: "human",
            //                 text: "How are you?",
            //             },
            //         ],
            //     },
            //     {
            //         testRunId,
            //         id: "0003",
            //         name: "Test Variant 1",
            //         temperature: 0.5,
            //         model: "gpt-4",
            //         result: "Fine, how are you?",
            //         messages: [
            //             {
            //                 type: "system",
            //                 text: "You are a cool bot",
            //             },
            //             {
            //                 type: "human",
            //                 text: "Hello bot",
            //             },
            //             {
            //                 type: "ai",
            //                 text: "Hello human",
            //             },
            //             {
            //                 type: "human",
            //                 text: "How are you?",
            //             },
            //         ],
            //     },
            // ];

            return res.status(200).json(testVariants);
        } else {
            // Handle any other HTTP method
            res.setHeader("Allow", ["GET"]);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        return res.status(500).json(JSON.stringify(error));
    }
}
