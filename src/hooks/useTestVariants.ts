import TestRun from "@/entities/TestRun";
import TestVariant, { MessageType } from "@/entities/TestVariant";
import axios from "axios";
import { useCallback } from "react";

export default function useTestVariants() {
    const getVariantsByTestRunId = useCallback(
        async ({
            testRunId,
        }: {
            testRunId: string;
        }): Promise<TestVariant[]> => {
            const response = await axios.get(`/api/testVariants/${testRunId}`);
            console.log(response.data);
            return response.data.map(
                (testVariant: any) => new TestVariant(testVariant)
            );
        },
        []
    );

    const addTestVariant = useCallback(
        async ({
            testRunId,
            model,
            temperature,
            description,
        }: {
            testRunId: string;
            model: string;
            temperature: number;
            description?: string;
        }) => {
            const response = await axios.post("/api/testVariants", {
                testRunId,
                model,
                temperature,
                description,
            });

            return new TestVariant({
                description,
                testRunId,
                model,
                temperature,
                messages: [],
                id: response.data.id,
            });
        },
        []
    );

    const addMessageToTestVariant = useCallback(
        async ({
            testVariantId,
            message,
        }: {
            testVariantId: string;
            message: { text: string; type: MessageType };
        }) => {
            const response = await axios.post(
                `/api/testVariants/${testVariantId}/messages`,
                { message }
            );
            console.log(response.data);
            return new TestVariant(response.data);
        },
        []
    );

    return { getVariantsByTestRunId, addTestVariant, addMessageToTestVariant };
}
