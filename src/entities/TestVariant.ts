import {
    AIChatMessage,
    BaseChatMessage,
    HumanChatMessage,
    SystemChatMessage,
} from "langchain/schema";

import { v4 as uuidv4 } from "uuid";
import { Message } from "./Message";

export type TestVariantProps = {
    id: string;
    temperature: number;
    model: string;
    description?: string;
    result?: string;
    testRunId: string;
    messages: Message[];
};

export default class TestVariant {
    id: string;
    temperature: number;
    model: string;
    description: string;
    messages: Message[] = [];
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
        this.id = id ?? uuidv4();
        this.temperature = temperature;
        this.model = model;
        this.description = description;
        this.result = result;
        this.testRunId = testRunId;
        this.messages = messages;
    }
}

function messageInputsToChatMessages(inputs: Message[]) {
    if (!inputs) {
        return [];
    }
    console.log(inputs);
    return inputs.map((message) => {
        if (message.type === "ai") {
            return new AIChatMessage(message.text);
        } else if (message.type === "human") {
            return new HumanChatMessage(message.text);
        } else if (message.type === "system") {
            return new SystemChatMessage(message.text);
        } else {
            console.log(message);
            throw new Error(`Unknown message type: ${message.type}`);
        }
    });
}
