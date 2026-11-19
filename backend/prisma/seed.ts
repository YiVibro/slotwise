import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const mentorConfigs = [
  {
    name: "Mentor 1",
    email: "mentor1@slotwise.local",
    timezone: "Asia/Kolkata",
    startTime: "09:00",
    endTime: "21:00",
  },
  {
    name: "Mentor 2",
    email: "mentor2@slotwise.local",
    timezone: "Asia/Kolkata",
    startTime: "09:00",
    endTime: "21:00",
  },
  {
    name: "Mentor 3",
    email: "mentor3@slotwise.local",
    timezone: "Asia/Kolkata",
    startTime: "09:00",
    endTime: "21:00",
  },
  {
    name: "Mentor 4",
    email: "mentor4@slotwise.local",
    timezone: "Asia/Kolkata",
    startTime: "09:00",
    endTime: "21:00",
  },

  {
    name: "Mentor 5",
    email: "mentor5@slotwise.local",
    timezone: "Europe/London",
    startTime: "09:00",
    endTime: "17:00",
  },
  {
    name: "Mentor 6",
    email: "mentor6@slotwise.local",
    timezone: "Europe/London",
    startTime: "09:00",
    endTime: "17:00",
  },
  {
    name: "Mentor 7",
    email: "mentor7@slotwise.local",
    timezone: "Europe/London",
    startTime: "09:00",
    endTime: "17:00",
  },

  {
    name: "Mentor 8",
    email: "mentor8@slotwise.local",
    timezone: "America/New_York",
    startTime: "09:00",
    endTime: "17:00",
  },
  {
    name: "Mentor 9",
    email: "mentor9@slotwise.local",
    timezone: "America/New_York",
    startTime: "09:00",
    endTime: "17:00",
  },
  {
    name: "Mentor 10",
    email: "mentor10@slotwise.local",
    timezone: "America/New_York",
    startTime: "09:00",
    endTime: "17:00",
  },
];

async function main() {
  await prisma.booking.deleteMany();
  await prisma.parent.deleteMany();
  await prisma.mentorAvailability.deleteMany();
  await prisma.mentor.deleteMany();

  for (const mentorConfig of mentorConfigs) {
    const mentor = await prisma.mentor.create({
      data: {
        name: mentorConfig.name,
        email: mentorConfig.email,
        timezone: mentorConfig.timezone,
        active: true,
      },
    });

    for (let dayOfWeek = 1; dayOfWeek <= 6; dayOfWeek++) {
      await prisma.mentorAvailability.create({
        data: {
          mentorId: mentor.id,
          dayOfWeek,
          startTime: mentorConfig.startTime,
          endTime: mentorConfig.endTime,
        },
      });
    }
  }

  console.log("Database seeded successfully.");
}

main()
  .catch((error) => {
    console.error("Database seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
