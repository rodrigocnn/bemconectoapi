// src/jobs/notificationQueue.ts
import { Queue } from "bullmq";
import { RedisOptions } from "ioredis";

const connection: RedisOptions = {
  host: "localhost", // ajuste se seu Redis estiver em outro host
  port: 6379,
};

export const notificationQueue = new Queue("notifications", { connection });
