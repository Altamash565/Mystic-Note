import { Message } from "@/model/User";

export interface Apiresponse{
    success: boolean;
    message: string;
    isAcceptingMessages?: boolean;
    messages?: Array<Message>
}