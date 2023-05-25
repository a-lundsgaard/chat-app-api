import { Controller } from "./controller";
import { User } from "../../graphql/generated/graphql";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { GraphQLError } from "graphql";

interface RegisterUser {
    username: string;
    password: string;
    email: string;
}

class UserController extends Controller {
    async getAllUsers() {
        const rows = await this.query<User>('SELECT * FROM users');
        return rows;
    }

    async find(email: string): Promise<User | undefined> {
        const user = await this.query<User>('SELECT * FROM users WHERE email = $1', [email]);
        return user[0];
    }

    async registerUser({ username, password, email }: RegisterUser) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const rows = await this.query<User>(
            'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *',
            [username, hashedPassword, email]
        );
        return rows[0];
    }

    async getUserById(id: number) {
        const rows = await this.query<User>('SELECT * FROM users WHERE id = $1', [id]);
        return rows[0];
    }

    async login(username: string, password: string) {
        const u = await this.query<User>('SELECT * FROM users WHERE username = $1', [username]);
        const user = u[0]
        if (!user) {
            throw new Error('User not found');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Incorrect password');
        }

        // Generate JWT token
        const token = jwt.sign({ user }, process.env.JWT_SECRET as string, { expiresIn: '1d' }) as string

        // Return token and user information
        return token
    }

    // async login(username: string, password: string) {
    //     const u = await this.query<User>('SELECT * FROM users WHERE username = $1', [username]);
    //     const user = u[0]
    //     if (!user) {
    //         throw new Error('User not found');
    //     }
    //     const isPasswordValid = await bcrypt.compare(password, user.password);
    //     if (!isPasswordValid) {
    //         throw new Error('Incorrect password');
    //     }
    //     // return a jwt token and user
    //     // your code here
    // }
}

export default UserController;