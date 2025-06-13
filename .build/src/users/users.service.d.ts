import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    create(email: string, cognitoId: string): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
}
