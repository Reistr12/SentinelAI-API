import { Injectable } from "@nestjs/common";
import { ServerEntity } from "src/domain/entities/server.entity";
import { IServerRepository } from "src/domain/interfaces/server-interface.repository";
import { InjectModel } from "@nestjs/sequelize";
import { ServerModel } from "../models/create-server.model";

@Injectable()
export class ServerRepository implements IServerRepository {
    constructor(
        @InjectModel(ServerModel)
        private serverModel: typeof ServerModel
    ) {}

    async create(data: ServerEntity): Promise<ServerEntity | null> {
        try {
            const serverData = {
                ip: data.ip,
                name: data.name,
            } as any;

            if (data.id) {
                serverData.id = data.id;
            }

            const createdServer = await this.serverModel.create(serverData);

            return new ServerEntity({
                ip: createdServer.ip,
                name: createdServer.name,
            }, createdServer.id);
        } catch (error) {
            return null;
        }
    }

    async findAll(
        filter?: { name?: string }
    ): Promise<ServerEntity[]> {
        const where = filter?.name ? { name: filter.name } : {};
        const servers = await this.serverModel.findAll({ where });
        
        return servers.map(server => new ServerEntity({
            ip: server.ip,
            name: server.name,
        }, server.id));
    }

    async findById(id: string): Promise<ServerEntity | null> {
        const server = await this.serverModel.findByPk(id);
        if (!server) return null;

        return new ServerEntity({
            ip: server.ip,
            name: server.name,
        }, server.id);
    }

    async findByIp(ip: string): Promise<ServerEntity | null> {
        const server = await this.serverModel.findOne({ where: { ip } });
        if (!server) return null;
        
        return new ServerEntity({
            ip: server.ip,
            name: server.name,
        }, server.id);
    }

    async update(id: string, data: Partial<ServerEntity>): Promise<ServerEntity | null> {
        const server = await this.serverModel.findByPk(id);
        if (!server) return null;

        await server.update(data);

        return new ServerEntity({
            ip: server.ip,
            name: server.name,
        }, server.id);
    }

    async delete(id: string): Promise<void> {
        await this.serverModel.destroy({ where: { id } });
    }

    async existsByIp(ip: string): Promise<boolean> {
        const count = await this.serverModel.count({ where: { ip } });
        return count > 0;
    }
}