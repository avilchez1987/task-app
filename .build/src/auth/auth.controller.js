"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const cognito_service_1 = require("./cognito.service");
const users_service_1 = require("../users/users.service");
const register_dto_1 = require("./dto/register.dto");
const login_dto_1 = require("./dto/login.dto");
let AuthController = class AuthController {
    cognitoService;
    usersService;
    constructor(cognitoService, usersService) {
        this.cognitoService = cognitoService;
        this.usersService = usersService;
    }
    async register(registerDto) {
        const { email, password } = registerDto;
        const exists = await this.usersService.findByEmail(email);
        if (exists)
            throw new common_1.ConflictException('Usuario ya existe');
        const cognitoRes = await this.cognitoService.signUp(email, password);
        await this.usersService.create(email, cognitoRes.UserSub);
        return { message: 'Usuario registrado. Verifica tu correo.' };
    }
    async confirmUser(body) {
        const { email, code } = body;
        const message = await this.cognitoService.confirmUser(email, code);
        return { message };
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const tokens = await this.cognitoService.login(email, password);
        return {
            accessToken: tokens.AccessToken,
            idToken: tokens.IdToken,
            refreshToken: tokens.RefreshToken,
        };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('confirm'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "confirmUser", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [cognito_service_1.CognitoService,
        users_service_1.UsersService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map