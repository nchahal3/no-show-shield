import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed users
  const user1 = await prisma.user.create({
    data: {
      email: 'owner1@example.com',
      password: 'password123', // In a real app, ensure to hash passwords
      businessName: 'Salon A',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'owner2@example.com',
      password: 'password123', // In a real app, ensure to hash passwords
      businessName: 'Gym B',
    },
  });

  // Seed bookings
  await prisma.booking.createMany({
    data: [
      {
        customerName: 'John Doe',
        date: new Date('2023-10-15T10:00:00Z'),
        status: 'confirmed',
        depositPaid: true,
        userId: user1.id,
      },
      {
        customerName: 'Jane Smith',
        date: new Date('2023-10-16T11:00:00Z'),
        status: 'confirmed',
        depositPaid: true,
        userId: user1.id,
      },
      {
        customerName: 'Alice Johnson',
        date: new Date('2023-10-17T12:00:00Z'),
        status: 'no-show',
        depositPaid: false,
        userId: user2.id,
      },
    ],
  });

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });