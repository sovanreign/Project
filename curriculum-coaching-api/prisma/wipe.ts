import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Wiping data from all tables...');

    // Delete records from the most dependent tables first to avoid foreign key constraint errors

    // Wipe users (child of courses and departments)
    await prisma.user.deleteMany({});
    console.log('Deleted all users.');

    // Wipe courses (child of department)
    await prisma.course.deleteMany({});
    console.log('Deleted all courses.');

    // Wipe departments (parent of courses)
    await prisma.department.deleteMany({});
    console.log('Deleted all departments.');

    console.log('All data has been wiped successfully!');
  } catch (error) {
    console.error('Error wiping data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
