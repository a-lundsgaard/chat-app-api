import { Controller } from "./controller";
import { Message, User } from "../../graphql/generated/graphql";

// interface MessageWithUser extends Message {
//     username: string;
// }

interface addMessage {
    user_id: number;
    content: string;
    conversation_id: string;
}

class MessageController extends Controller {

    async getMessagesByConversationId(conversation_id: string) {
        const rows = await this.query<Message>('SELECT * FROM messages WHERE conversation_id = $1', [conversation_id]);
        return rows;
    }

    async getMessagesByConversationIdWithUser(conversation_id: string) {
        const rows = await this.query<Message>(
            'SELECT messages.*, users.username FROM messages JOIN users ON messages.user_id = users.id WHERE messages.conversation_id = $1',
            [conversation_id]
        );
        return rows;

    }

    async addMessage({ user_id, content, conversation_id }: addMessage) {
        console.log('user_id: ', user_id);

        const rows = await this.query<Message>(
            'INSERT INTO messages (user_id, content, conversation_id, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
            [user_id, content, conversation_id]
        );
        return rows[0];
    }


}

export default MessageController;