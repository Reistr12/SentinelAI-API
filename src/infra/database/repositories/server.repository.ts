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
    ) { }

    async create(data: ServerEntity): Promise<ServerEntity | null> {
        try {
            const serverData: Partial<ServerModel> = {
                ip: data.ip,
                name: data.name,
                devices: '',  // Valor padrão vazio
            };

            if (data.id) {
                serverData.id = data.id;
            }

            const createdServer = await this.serverModel.create(serverData as any);

            if (!createdServer) {
                throw new Error('Failed to create server - no data returned');
            }

            return new ServerEntity({
                ip: createdServer.ip,
                name: createdServer.name,
            }, createdServer.id);
        } catch (error) {
            console.error('Error creating server:', error);
            throw error;
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
            devices: Array.isArray(server.devices)
                ? server.devices.map((device: any) => typeof device === "string" ? device : device.id)
                : undefined,
        }, server.id));
    }

    async findById(id: string): Promise<ServerEntity | null> {
        const server = await this.serverModel.findByPk(id);
        if (!server) return null;

        return new ServerEntity({
            ip: server.ip,
            name: server.name,
            devices: Array.isArray(server.devices)
                ? server.devices.map((device: any) => typeof device === "string" ? device : device.id)
                : undefined,
        }, server.id);
    }

    async findByIp(ip: string): Promise<ServerEntity | null> {
        const server = await this.serverModel.findOne({ where: { ip } });
        if (!server) return null;

        return new ServerEntity({
            ip: server.ip,
            name: server.name,
            devices: Array.isArray(server.devices)
                ? server.devices.map((device: any) => typeof device === "string" ? device : device.id)
                : undefined,
        }, server.id);
    }

    async update(id: string, data: Partial<ServerEntity>): Promise<ServerEntity | null> {
        const server = await this.serverModel.findByPk(id);
        if (!server) return null;

        // Map devices to the expected format for Sequelize
        const updateData: any = { ...data };
        if (data.devices !== undefined) {
            // If your model expects DeviceModel[] or device IDs, map accordingly
            updateData.devices = Array.isArray(data.devices)
                ? data.devices.map((device: any) => typeof device === "string" ? { id: device } : device)
                : undefined;
        }

        await server.update(updateData);

        return new ServerEntity({
            ip: server.ip,
            name: server.name,
            devices: Array.isArray(server.devices)
                ? server.devices.map((device: any) => typeof device === "string" ? device : device.id)
                : undefined,
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