const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const subjects = await prisma.subject.findMany();
  console.log('All Subjects:', subjects);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
