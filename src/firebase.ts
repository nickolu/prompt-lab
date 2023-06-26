import * as admin from "firebase-admin";
import serviceAccount from "../firebaseServiceAccountKey.json";

if (!admin.apps.length) {
    admin.initializeApp(
        {
            credential: admin.credential.cert(
                serviceAccount as admin.ServiceAccount
            ),
        },
        "prompt-lab"
    );
}

export const db = admin.apps.length
    ? admin.app("prompt-lab").firestore()
    : null;
