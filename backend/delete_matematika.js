const { PrismaClient } = require('@prisma/client');
process.env.DATABASE_URL = "postgresql://postgres:1234@localhost:5432/school_db";
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.$executeRawUnsafe(`DELETE FROM "Subject" WHERE name = 'Matematika' OR id = '' OR LENGTH(id) < 10`);
  console.log('Baris berhasil dihapus:', result);
  
  const remaining = await prisma.subject.findMany();
  console.log('Subject tersisa di database:', remaining);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
