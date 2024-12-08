import { PrismaClient, Role, YearLevel } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const saltRounds = 12; // Define the salt rounds for bcrypt

async function main() {
  // Create departments
  const department1 = await prisma.department.create({
    data: {
      code: 'CCS',
      name: 'College of Computer Studies',
    },
  });

  const department2 = await prisma.department.create({
    data: {
      code: 'COE',
      name: 'College of Engineering',
    },
  });

  // Create courses
  const course1 = await prisma.course.create({
    data: {
      courseId: 'BSIT',
      code: 'BSIT',
      name: 'Bachelor of Science in Information Technology',
      departmentId: department1.id,
    },
  });

  const course2 = await prisma.course.create({
    data: {
      courseId: 'BSCS',
      code: 'BSCS',
      name: 'Bachelor of Science in Computer Science',
      departmentId: department1.id,
    },
  });

  const course3 = await prisma.course.create({
    data: {
      courseId: 'BSCE',
      code: 'BSCE',
      name: 'Bachelor of Science in Computer Engineering',
      departmentId: department2.id,
    },
  });

  // Create students (5 students)
  const students = [
    {
      username: 'student1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@student.com',
      yearLevel: YearLevel.FIRST,
      courseId: course1.id,
    },
    {
      username: 'student2',
      firstName: 'Emily',
      lastName: 'Davis',
      email: 'emily.davis@student.com',
      yearLevel: YearLevel.SECOND,
      courseId: course1.id,
    },
    {
      username: 'student3',
      firstName: 'Michael',
      lastName: 'Brown',
      email: 'michael.brown@student.com',
      yearLevel: YearLevel.THIRD,
      courseId: course2.id,
    },
    {
      username: 'student4',
      firstName: 'Sophia',
      lastName: 'Wilson',
      email: 'sophia.wilson@student.com',
      yearLevel: YearLevel.FOURTH,
      courseId: course2.id,
    },
    {
      username: 'student5',
      firstName: 'David',
      lastName: 'Taylor',
      email: 'david.taylor@student.com',
      yearLevel: YearLevel.FIFTH,
      courseId: course3.id,
    },
  ];

  // Create coaches (3 coaches)
  const coaches = [
    {
      username: 'coach1',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@coach.com',
      courseId: course1.id,
    },
    {
      username: 'coach2',
      firstName: 'Mark',
      lastName: 'Johnson',
      email: 'mark.johnson@coach.com',
      courseId: course2.id,
    },
    {
      username: 'coach3',
      firstName: 'Sarah',
      lastName: 'Williams',
      email: 'sarah.williams@coach.com',
      courseId: course3.id,
    },
  ];

  // Create admin (1 admin)
  const admin = {
    username: 'admin1',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@admin.com',
    role: Role.ADMIN,
    departmentId: department1.id,
  };

  // Function to hash the password
  const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, saltRounds);
  };

  // Hash passwords and create users
  const usersData = [
    ...students.map(async (student) => ({
      ...student,
      password: await hashPassword('password123'),
      uniqueId: `student-${student.username}`,
      address: 'Sample address',
      bio: 'Student bio',
      contactNumber: '09123456789',
      role: Role.STUDENT,
    })),
    ...coaches.map(async (coach) => ({
      ...coach,
      password: await hashPassword('password123'),
      uniqueId: `coach-${coach.username}`,
      address: 'Sample address',
      bio: 'Coach bio',
      contactNumber: '09876543211',
      role: Role.COACH,
    })),
    {
      ...admin,
      password: await hashPassword('admin123'),
      uniqueId: 'admin-001',
      address: 'Sample address',
      bio: 'Admin bio',
      contactNumber: '09265194831',
    },
  ];

  // Wait for all users to be hashed
  const users = await Promise.all(usersData);

  // Create users in the database
  await prisma.user.createMany({
    data: users,
  });

  console.log('Dummy data with hashed passwords created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
