const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.$executeRawUnsafe(`DELETE FROM "Subject" WHERE name = 'Matematika' OR id = ''`);
  console.log('Baris berhasil dihapus:', result);
  
  const remaining = await prisma.subject.findMany();
  console.log('Subject tersisa di database:', remaining);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
