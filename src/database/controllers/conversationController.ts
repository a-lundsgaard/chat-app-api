import { Controller } from "./controller";
import MessageController from "./messageController";
import { Conversation } from "../../graphql/generated/graphql";

const mc = new MessageController();

class ConversationController extends Controller {
    async getAllConversationsByUserId(id: number) {

        // const rows = await this.query<Conversation>('SELECT * FROM conversations WHERE owner_id = $1', [id]);
        const query = `
        SELECT  c.*
        FROM conversations c
        JOIN conversation_participants cp ON c.id = cp.conversation_id
        JOIN users u ON u.id = cp.user_id
        WHERE u.id = $1;
        `

        // const convs = mc.transaction(async (client) => {
        const rows = await this.query<Conversation>(query, [id]);
        const findUsersInConversation = async (conversation: Conversation) => {
            const userIds = await this.query(
                'SELECT user_id as id from conversation_participants WHERE conversation_id = $1', [conversation.id]
            );
            return userIds;
        }
        const promises = rows.map(async (conversation) => {
            const userIds = await findUsersInConversation(conversation);
            // console.log('userIds: ', userIds[0].user_id);
            const ids = userIds.map((u: any) => u.id);
            conversation.participantIds = ids;

            // if only one participant, then set name to the participant's username that is not the current user
            if (ids.length == 2 && conversation.name == null) {
                const oppositeId = ids[0] == id ? ids[1] : ids[0];
                const user = await this.query('SELECT username FROM users WHERE id = $1', [oppositeId]);
                conversation.name = user[0].username;
            }
            return conversation;
        });
        const results = await Promise.all(promises);
        return results;
        // });
        // return convs;

        // return rows;
    }

    async createConversation(owner_id: number, name: string | null) {
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

    async createConversationWithParticipants(owner_id: number, name: string | null, participantIds: number[]) {
        // use transaction to create conversation and add participants
        const conv = mc.transaction(async (client) => {
            const conversation = await this.createConversation(owner_id, name);
            const promises = participantIds.map(async (participantId) => {
                await this.addParticipant(conversation.id, participantId);
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