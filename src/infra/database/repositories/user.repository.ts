import { Injectable } from "@nestjs/common";
import { UserEntity } from "src/domain/entities/user.entity";
import { IUserRepository } from "src/domain/interfaces/user-interface.repository";
import { Role, UserModel } from "../models/user.model";
import { InjectModel } from "@nestjs/sequelize";
import { randomUUID } from "crypto";

@Injectable()
export class UserRepository implements IUserRepository{
    constructor(
        @InjectModel(UserModel) private readonly userModel: typeof UserModel,
    ) {}

    async create(data: UserEntity): Promise<UserEntity | null> {
        const createdUser = await this.userModel.create({
            id: data.id ?? randomUUID(),
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role,
        } as any);
        
        return createdUser
    }

    async findAll (
        filter?: { role?: Role; name?: string }
    ): Promise<UserEntity[]> {
        return [];
    }

    async findById(id: string): Promise<UserEntity | null> {
        return null;
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        const user = await this.userModel.findOne({ where: { email } });
        if (!user) return null;
        
        return new UserEntity({
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role,
        }, user.id);
    }

    async update(id: string, data: Partial<UserEntity>): Promise<UserEntity | null> {
        return null;
    }

    async delete(id: string): Promise<void> {
        return;
    }

    async existsByEmail(email: string): Promise<boolean> {
        return false;
    }
}