// src/jobs/notificationWorker.ts
import { Worker } from "bullmq";
import { RedisOptions } from "ioredis";

const connection: RedisOptions = {
  host: "localhost",
  port: 6379,
};

// Worker que processa jobs da fila "notifications"
export const notificationWorker = new Worker(
  "notifications",
  async (job) => {
    console.log("📩 Processando notificação:", job.data);

    // Aqui futuramente você chamaria o recurso real (WhatsApp, email, etc.)
    console.log("aqui será chamada recurso , no caso pode ser WhatsApp");
  },
  { connection }
);

notificationWorker.on("completed", (job) => {
  console.log(`✅ Job ${job.id} concluído`);
});

notificationWorker.on("failed", (job, err) => {
  console.error(`❌ Job ${job?.id} falhou:`, err);
});
