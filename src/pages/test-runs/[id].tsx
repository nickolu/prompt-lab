import TestVariantForm, {
    TestVariantFormProps,
} from "@/components/TestVariantForm";
import TestRun from "@/entities/TestRun";
import TestVariant, { TestVariantProps } from "@/entities/TestVariant";
import useTestRuns from "@/hooks/useTestRuns";
import useTestVariants from "@/hooks/useTestVariants";
import { Box, Typography } from "@mui/material";
import {
    AIChatMessage,
    BaseChatMessage,
    HumanChatMessage,
    SystemChatMessage,
} from "langchain/schema";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ChatMessage = ({
    prefix,
    message,
}: {
    prefix: JSX.Element;
    message: BaseChatMessage;
}) => {
    return (
        <Box display={"flex"}>
            {prefix} <Typography>{message.text}</Typography>
        </Box>
    );
};
const SystemMessage = ({ message }: { message: BaseChatMessage }) => {
    return (
        <ChatMessage
            prefix={<Typography>System:</Typography>}
            message={message}
        />
    );
};
const AiMessage = ({ message }: { message: BaseChatMessage }) => {
    return (
        <ChatMessage prefix={<Typography>Ai:</Typography>} message={message} />
    );
};
const HumanMessage = ({ message }: { message: BaseChatMessage }) => {
    return (
        <ChatMessage
            prefix={<Typography>Human:</Typography>}
            message={message}
        />
    );
};

const MessageComponent = ({ message }: { message: BaseChatMessage }) => {
    if (message instanceof SystemChatMessage) {
        return <SystemMessage message={message} />;
    }
    if (message instanceof AIChatMessage) {
        return <AiMessage message={message} />;
    }
    if (message instanceof HumanChatMessage) {
        return <HumanMessage message={message} />;
    }
    return <Box>unknown message type</Box>;
};

export default function TestRunPage() {
    const { query } = useRouter();
    const { getTestRunById } = useTestRuns();
    const { getVariantsByTestRunId, addTestVariant, addMessageToTestVariant } =
        useTestVariants();
    const [testRun, setTestRun] = useState<TestRun | null>(null);
    const [variants, setVariants] = useState<TestVariant[] | null>(null);

    useEffect(() => {
        async function fetchTestRun() {
            const testRun = await getTestRunById(query.id as string);
            setTestRun(testRun);
        }
        fetchTestRun();
    }, [getTestRunById, query.id]);

    useEffect(() => {
        async function fetchVariants() {
            const variants = await getVariantsByTestRunId({
                testRunId: query.id as string,
            });
            setVariants(variants);
        }
        fetchVariants();
    }, [testRun, getVariantsByTestRunId, query.id]);

    if (!testRun || !variants) {
        return "loading";
    }

    return (
        <>
            <Box>
                <Typography variant="h1">Test Run {testRun.name}</Typography>
                {variants.map((variant: TestVariant) => (
                    <Box key={variant.id}>
                        <Typography variant="h2">
                            Variant {variant.id}
                        </Typography>
                        <Typography>
                            Temperature: {variant.temperature}
                        </Typography>
                        <Typography>Model: {variant.model}</Typography>
                        {variant.messages.map((message) => {
                            return (
                                <MessageComponent
                                    key={message.text}
                                    message={message}
                                />
                            );
                        })}
                        {variant.result && (
                            <Box
                                display="flex"
                                sx={{ border: "1px solid green" }}
                            >
                                <Typography>Ai: </Typography>
                                <Typography>{variant.result}</Typography>
                            </Box>
                        )}
                    </Box>
                ))}
            </Box>
            <Typography variant="h2">Add a new variant</Typography>
            <TestVariantForm
                onSubmit={async ({
                    temperature,
                    model,
                    description,
                }: {
                    temperature: TestVariantProps["temperature"];
                    model: TestVariantProps["model"];
                    description: TestVariantProps["description"];
                }) => {
                    const newVariant = await addTestVariant({
                        testRunId: testRun.id,
                        model,
                        temperature,
                        description,
                    });
                    setVariants([...variants, newVariant]);
                }}
            />
        </>
    );
}
