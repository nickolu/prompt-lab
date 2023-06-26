import AddMessageForm from "@/components/AddMessageForm";
import PageTemplate from "@/components/PageTemplate";
import TestVariantForm, {
    TestVariantFormProps,
} from "@/components/TestVariantForm";
import { Message, MessageType } from "@/entities/Message";
import TestRun from "@/entities/TestRun";
import TestVariant, { TestVariantProps } from "@/entities/TestVariant";
import useTestRuns from "@/hooks/useTestRuns";
import useTestVariants from "@/hooks/useTestVariants";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type ChatMessageInput = Partial<Message>;

const ChatMessage = ({
    prefix,
    message,
}: {
    prefix: JSX.Element;
    message: ChatMessageInput;
}) => {
    return (
        <Box display={"flex"}>
            {prefix} <Typography>{message.text}</Typography>
        </Box>
    );
};

const SystemMessage = ({ message }: { message: ChatMessageInput }) => {
    return (
        <ChatMessage
            prefix={<Typography>System:</Typography>}
            message={message}
        />
    );
};
const AiMessage = ({ message }: { message: ChatMessageInput }) => {
    return (
        <ChatMessage prefix={<Typography>Ai:</Typography>} message={message} />
    );
};
const HumanMessage = ({ message }: { message: ChatMessageInput }) => {
    return (
        <ChatMessage
            prefix={<Typography>Human:</Typography>}
            message={message}
        />
    );
};

const MessageComponent = ({ message }: { message: Message }) => {
    if (message.type === MessageType.SYSTEM) {
        return <SystemMessage message={message} />;
    }
    if (message.type === MessageType.AI) {
        return <AiMessage message={message} />;
    }
    if (message.type === MessageType.HUMAN) {
        return <HumanMessage message={message} />;
    }
    return <Box>unknown message type</Box>;
};

export default function TestRunPage() {
    const { query } = useRouter();
    const { getTestRunById } = useTestRuns();
    const {
        variants,
        setVariants,
        getVariantsByTestRunId,
        addTestVariant,
        addMessageToTestVariant,
    } = useTestVariants();

    const [testRun, setTestRun] = useState<TestRun | null>(null);

    useEffect(() => {
        async function fetchTestRun() {
            if (!query?.id) {
                return;
            }
            const testRun = await getTestRunById(query.id as string);
            setTestRun(testRun);
        }
        fetchTestRun();
    }, [getTestRunById, query.id]);

    useEffect(() => {
        async function fetchVariants() {
            if (!query?.id) {
                return;
            }
            const variants = await getVariantsByTestRunId({
                testRunId: query.id as string,
            });
            setVariants(variants);
        }
        fetchVariants();
    }, [testRun, getVariantsByTestRunId, query.id, setVariants]);

    if (!testRun || !variants) {
        return "loading";
    }

    return (
        <PageTemplate>
            <Box>
                <Typography variant="h2">{testRun.name}</Typography>
                {variants.map((variant: TestVariant) => (
                    <Box key={variant.id}>
                        <Typography variant="h3">
                            Variant {variant.id}
                        </Typography>
                        <Typography>
                            Temperature: {variant.temperature}
                        </Typography>
                        <Typography>Model: {variant.model}</Typography>
                        {variant.messages.map((message) => {
                            return (
                                <MessageComponent
                                    key={message.id}
                                    message={message}
                                />
                            );
                        })}
                        {variant.result && (
                            <Box
                                display="flex"
                                sx={{ border: "1px solid green" }}
                            >
                                <AiMessage
                                    message={{
                                        text: variant.result,
                                    }}
                                />
                            </Box>
                        )}
                        <AddMessageForm
                            onSubmit={async ({
                                text,
                                type,
                            }: {
                                text: string;
                                type: string;
                            }) => {
                                const newMessage =
                                    await addMessageToTestVariant({
                                        testVariantId: variant.id,
                                        message: {
                                            text,
                                            type: type as MessageType,
                                        },
                                    });
                            }}
                        />
                    </Box>
                ))}
            </Box>
            <Typography variant="h3">Add a new variant</Typography>
            <TestVariantForm
                onSubmit={async ({
                    temperature,
                    model,
                    description,
                }: {
                    temperature: number;
                    model: string;
                    description: string;
                }) => {
                    const newVariant = await addTestVariant({
                        testRunId: testRun.id,
                        model,
                        temperature,
                        description,
                    });
                }}
            />
        </PageTemplate>
    );
}
