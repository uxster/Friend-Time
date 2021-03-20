import { ShardingManager, ShardingManagerMode } from 'discord.js-light';

import { UpdateServerCountJob } from './jobs';
import { Manager } from './manager';
import { ConfigFile, DebugFile } from './models/config';
import { HttpService, Logger } from './services';
import { MathUtils, ShardUtils } from './utils';

let Config: ConfigFile = require('../config/config.json');
let Debug: DebugFile = require('../config/debug.json');
let Logs = require('../lang/logs.json');

async function start(): Promise<void> {
    Logger.info(Logs.info.started);
    let httpService = new HttpService();

    // Sharding
    let totalShards = 0;
    try {
        totalShards = Debug.override.shardCount.enabled
            ? Debug.override.shardCount.value
            : await ShardUtils.recommendedShards(
                  Config.client.token,
                  Config.sharding.serversPerShard,
                  Config.sharding.shardsPerCluster
              );
    } catch (error) {
        Logger.error(Logs.error.retrieveShardCount, error);
        return;
    }

    let myShardIds = Debug.override.shardCount.enabled
        ? MathUtils.range(0, Debug.override.shardCount.value)
        : ShardUtils.myShardIds(Config.sharding.clusterId, Config.sharding.shardsPerCluster);

    if (myShardIds.length === 0) {
        Logger.warn(Logs.warn.noShards);
        return;
    }

    let shardManager = new ShardingManager('dist/start.js', {
        token: Config.client.token,
        mode: Debug.override.shardMode.enabled
            ? (Debug.override.shardMode.value as ShardingManagerMode)
            : 'worker',
        respawn: true,
        totalShards,
        shardList: myShardIds,
    });

    let updateServerCountJob = new UpdateServerCountJob(
        Config.jobs.updateServerCount.schedule,
        shardManager,
        httpService
    );

    let manager = new Manager(shardManager, [updateServerCountJob]);

    // Start
    await manager.start();
}

start();
