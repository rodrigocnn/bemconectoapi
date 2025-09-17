# Redis ping

redis-cli ping

# Verificar o status do serviço Redis

sudo systemctl status redis-server

# Serviço parado?

sudo systemctl start redis-server

# Garantir que sobe junto com o sistema

sudo systemctl enable redis

# Migration

npx prisma migrate dev --name create_patient
npx prisma migrate dev --name create_session
npx prisma migrate dev --name create_user
