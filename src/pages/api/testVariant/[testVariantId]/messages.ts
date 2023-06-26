import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/firebase";
import firebase from "firebase-admin"; // assuming you're using firebase-admin

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (!db) {
        return res.status(500).json({ error: "No database connection" });
    }

    try {
        if (req.method === "GET") {
            return res.status(404).send("Get not implemented");
        } else if (req.method === "POST") {
            const {
                query: { testVariantId },
            } = req;

            const testVariantsRef = db
                .collection("testVariants")
                .doc(testVariantId as string);

            console.log("message to post", req.body);
            await testVariantsRef.update({
                messages: firebase.firestore.FieldValue.arrayUnion(req.body),
            });

            // return the updated test variant
            const updatedTestVariant = await testVariantsRef.get();
            return res
                .status(200)
                .json({
                    id: updatedTestVariant.id,
                    ...updatedTestVariant.data(),
                });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json(JSON.stringify(error));
    }
}
