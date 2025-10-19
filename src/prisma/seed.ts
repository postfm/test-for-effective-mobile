import { PrismaClient } from '@prisma/client';
import { fakerRU as faker } from '@faker-js/faker';

const INIT_COUNT_VALUE = 0;
const COUNT_VALUE = 20;

function getUsers() {
  const emails = faker.helpers.uniqueArray(faker.internet.email, COUNT_VALUE);
  const users = [];
  for (let i = INIT_COUNT_VALUE; i < COUNT_VALUE; i++) {
    users.push({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      birthday: faker.date.birthdate(),
      email: emails[i],
      password: faker.internet.password(),
      role: faker.helpers.arrayElement(['ADMIN', 'USER']),
      status: faker.helpers.arrayElement(['ACTIVE', 'NOT_ACTIVE']),
    });
  }
  return users;
}

async function seedDb(prismaClient: PrismaClient) {
  const mockUsers = getUsers();
  for (const user of mockUsers) {
    await prismaClient.user.upsert({
      where: { id: user.id },
      update: {},
      create: {
        id: user.id,
        name: user.name,
        birthday: user.birthday,
        email: user.email,
        password: user.password,
        role: user.role,
        status: user.status,
      },
    });
  }

  console.info('🤘️ Database was filled');
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();
