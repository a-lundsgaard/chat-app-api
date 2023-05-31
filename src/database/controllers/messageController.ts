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
        // const rows = await this.query<Message>('SELECT * FROM messages WHERE conversation_id = $1', [conversation_id]);
        // return rows;
        const query = `
        SELECT m.*, u.id AS user_id, u.email, u.username, u.id
        FROM messages m
        JOIN users u ON m.user_id = u.id
        WHERE m.conversation_id = $1
        ORDER BY m.created_at ASC
      `;
        const values = [conversation_id];
        const rows = await this.query<Message>(query, values);
        return rows;
    }

    async getMessagesByConversationIdWithUser(conversation_id: string) {
        const rows = await this.query<Message>(
            'SELECT messages.*, users.username FROM messages JOIN users ON messages.user_id = users.id WHERE messages.conversation_id = $1 ORDER BY messages.created_at ASC',
            [conversation_id]
        );
        return rows;

    }

    async addMessage({ user_id, content, conversation_id }: addMessage) {
        console.log('user_id: ', user_id);

        const user = await this.query<User>('SELECT username FROM users WHERE id = $1', [user_id]);

        const rows = await this.query<Message>(
            'INSERT INTO messages (user_id, content, conversation_id, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
            [user_id, content, conversation_id]
        );
        rows[0].username = user[0].username;
        return rows[0];
    }


}

export default MessageController;