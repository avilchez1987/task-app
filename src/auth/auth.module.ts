import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { CognitoService } from './cognito.service'; // ✅
import { UsersService } from '../users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // ✅ necesario para UsersService
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, CognitoService, UsersService], // ✅ añadidos
})
export class AuthModule {}
