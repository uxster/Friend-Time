export interface ConfigFile {
    prefix: string;
    client: {
        token: string;
        intents: string[];
        disabledEvents: string[];
        partials: string[];
        caches: {
            guilds: boolean;
            roles: boolean;
            emojis: boolean;
            channels: boolean;
            overwrites: boolean;
            presences: boolean;
            messages: {
                size: number;
                lifetime: number;
                sweepInterval: number;
            };
        };
    };
    sharding: {
        clusterId: number;
        shardsPerCluster: number;
        serversPerShard: number;
        spawnDelay: number;
        spawnTimeout: number;
    };
    database: {
        type: string;
        host: string;
        port: number;
        database: string;
        username: string;
        password: string;
    };
    jobs: {
        updateServerCount: {
            schedule: string;
        };
    };
    rateLimiting: {
        commands: {
            amount: number;
            interval: number;
        };
        triggers: {
            amount: number;
            interval: number;
        };
        reactions: {
            amount: number;
            interval: number;
        };
    };
    experience: {
        promptExpireTime: number;
    };
    reactions: {
        convert: string;
    };
    validation: {
        timeResults: {
            countMax: number;
        };
        timeZones: {
            countMax: number;
        };
        bots: {
            countMax: number;
        };
        timeZone: {
            lengthMin: number;
        };
        timeResultText: {
            lengthMax: number;
            blacklist: string[];
        };
    };
    logging: {
        rateLimit: {
            minTimeout: number;
        };
    };
}
