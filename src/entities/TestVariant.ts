import {
    AIChatMessage,
    BaseChatMessage,
    HumanChatMessage,
    SystemChatMessage,
} from "langchain/schema";

export enum MessageType {
    AI = "ai",
    Human = "human",
    System = "system",
}

type TestVariantMessageInput = {
    text: string;
    type: MessageType;
};

export type TestVariantProps = {
    id: string;
    temperature: number;
    model: string;
    description?: string;
    result?: string;
    testRunId: string;
    messages: TestVariantMessageInput[];
};

export default class TestVariant {
    id: string;
    temperature: number;
    model: string;
    description: string;
    messages: BaseChatMessage[] = [];
    result: string;
    testRunId: string;

    constructor({
        id,
        temperature,
        model,
        description = "",
        messages,
        testRunId,
        result = "",
    }: TestVariantProps) {
        this.id = id;
        this.temperature = temperature;
        this.model = model;
        this.description = description;
        this.result = result;
        this.testRunId = testRunId;
        this.messages = messageInputsToChatMessages(messages);
    }
}

function messageInputsToChatMessages(inputs: TestVariantMessageInput[]) {
    return inputs.map((message) => {
        if (message.type === "ai") {
            return new AIChatMessage(message.text);
        } else if (message.type === "human") {
            return new HumanChatMessage(message.text);
        } else if (message.type === "system") {
            return new SystemChatMessage(message.text);
        } else {
            throw new Error(`Unknown message type: ${message.type}`);
        }
    });
}
