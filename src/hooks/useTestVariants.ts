import { MessageType } from "@/entities/Message";
import TestVariant from "@/entities/TestVariant";
import axios from "axios";
import { useCallback, useState } from "react";

export default function useTestVariants() {
    const [variants, setVariants] = useState<TestVariant[]>([]);
    function _addVariantToState(variant: TestVariant) {
        if (variant) {
            setVariants([...variants, variant]);
        }
    }

    function _updateVariantInState(variant: TestVariant) {
        setVariants((prevVariants) => {
            if (prevVariants) {
                return prevVariants.map((prevVariant) => {
                    if (prevVariant.id === variant.id) {
                        return variant;
                    }
                    return prevVariant;
                });
            }
            return [];
        });
    }

    const getVariantsByTestRunId = useCallback(
        async ({
            testRunId,
        }: {
            testRunId: string;
        }): Promise<TestVariant[]> => {
            const response = await axios.get(`/api/testVariants/${testRunId}`);
            console.log("response.data", response.data);
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
            console.log({
                testRunId,
                model,
                temperature,
                description,
            });
            const response = await axios.post("/api/testVariants", {
                testRunId,
                model,
                temperature,
                description,
            });

            console.log(response.data);

            const variant = new TestVariant({
                description,
                testRunId,
                model,
                temperature,
                messages: [],
                id: response.data.id,
            });
            setVariants((prevVariants) => [...prevVariants, variant]);
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
                `/api/testVariant/${testVariantId}/messages`,
                message
            );
            console.log("addMessageToTestVariant", response.data);
            const variant = new TestVariant(response.data);
            console.log("new variant", variant);
            _updateVariantInState(variant);
        },
        []
    );

    return {
        getVariantsByTestRunId,
        addTestVariant,
        addMessageToTestVariant,
        variants,
        setVariants,
    };
}
