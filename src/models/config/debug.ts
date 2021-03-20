export interface DebugFile {
    skipCheck: {
        perms: boolean;
    };
    override: {
        shardMode: {
            enabled: boolean;
            value: string;
        };
        shardCount: {
            enabled: boolean;
            value: number;
        };
    };
    dummyMode: {
        enabled: boolean;
        whitelist: string[];
    };
}
