export enum MessageType {
    AI = "ai",
    HUMAN = "human",
    SYSTEM = "system",
}

export interface Message {
    text: string;
    type: MessageType;
    id: string;
}
