import { ActivityType, Client, ClientOptions, Presence } from 'discord.js-light';

export class CustomClient extends Client {
    constructor(clientOptions: ClientOptions) {
        super(clientOptions);
    }

    public async setPresence(type: ActivityType, name: string, url: string): Promise<Presence> {
        console.log('Client Info:', {
            shardIds: this.shard.ids,
            wsPing: this.ws.ping,
            wsStatus: this.ws.status,
            wsShards: this.ws.shards.map(shard => ({
                ping: shard.ping,
                status: shard.status,
            })),
        });

        return await this.user?.setPresence({
            activity: {
                type,
                name,
                url,
            },
        });
    }
}
