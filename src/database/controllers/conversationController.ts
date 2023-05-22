import { Controller } from "./controller";
import MessageController from "./messageController";
import { Conversation } from "../../graphql/generated/graphql";

const mc = new MessageController();

class ConversationController extends Controller {
    async getAllConversationsByUserId(id: number) {
        const rows = await this.query<Conversation>('SELECT * FROM conversations WHERE owner_id = $1', [id]);
        return rows;
    }

    async createConversation(owner_id: number, name: string) {
        console.log('owner_id: ', owner_id);
        const rows = await this.query<Conversation>(
            'INSERT INTO conversations (owner_id, name, created_at) VALUES ($1, $2, NOW()) RETURNING *',
            [owner_id, name]
        );
        return rows[0];
    }

    async addParticipant(conversation_id: string, user_id: number) {
        const rows = await this.query(
            'INSERT INTO conversation_participants (conversation_id, user_id) VALUES ($1, $2) RETURNING *',
            [conversation_id, user_id]
        );
        return rows[0];
    }

    async createConversationWithParticipants(owner_id: number, name: string, participantIds: string[]) {
        // use transaction to create conversation and add participants
        const conv = mc.transaction(async (client) => {
            const conversation = await this.createConversation(owner_id, name);
            const promises = participantIds.map(async (participantId) => {
                await this.addParticipant(conversation.id, parseInt(participantId));
            });
            await Promise.all(promises);
            return conversation;
        });
        return conv;
    }

    async getConversationMessages(conversationId: string) {
        const rows = await mc.getMessagesByConversationId(conversationId);
        return rows;
    }


    async getConversationMessagesWithUser(conversationId: string) {
        const rows = await mc.getMessagesByConversationId(conversationId);
        return rows;
    }
}

export default ConversationController;