import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Create dummy users
    const user1 = await prisma.user.create({
        data: {
            email: 'owner1@example.com',
            password: 'password123', // In a real app, ensure to hash passwords
            role: 'business_owner',
        },
    });

    const user2 = await prisma.user.create({
        data: {
            email: 'owner2@example.com',
            password: 'password123', // In a real app, ensure to hash passwords
            role: 'business_owner',
        },
    });

    // Create dummy bookings
    await prisma.booking.createMany({
        data: [
            {
                customerName: 'John Doe',
                date: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day from now
                status: 'confirmed',
                depositPaid: true,
                userId: user1.id,
            },
            {
                customerName: 'Jane Smith',
                date: new Date(Date.now() + 48 * 60 * 60 * 1000), // 2 days from now
                status: 'confirmed',
                depositPaid: true,
                userId: user1.id,
            },
            {
                customerName: 'Alice Johnson',
                date: new Date(Date.now() + 72 * 60 * 60 * 1000), // 3 days from now
                status: 'no-show',
                depositPaid: false,
                userId: user2.id,
            },
        ],
    });

    console.log('Seeding completed.');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });