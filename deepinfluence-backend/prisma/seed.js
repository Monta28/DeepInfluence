// prisma/seed.js – version CommonJS
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Suppression des anciennes données…');
  await prisma.message.deleteMany();
  await prisma.chat.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.formationEnrollment.deleteMany();
  await prisma.formationSession.deleteMany();
  await prisma.formation.deleteMany();
  await prisma.service.deleteMany();
  await prisma.expertDetails.deleteMany();
  await prisma.referral.deleteMany();
  await prisma.user.deleteMany();

  console.log('Création des utilisateurs…');
  const user = await prisma.user.create({
    data: {
      email: 'utilisateur@example.com',
      password: 'password123',
      firstName: 'Alice',
      lastName: 'Dupont',
      role: 'USER',
      coinsBalance: 1000,
    },
  });

  const expertUser = await prisma.user.create({
    data: {
      email: 'expert@example.com',
      password: 'password123',
      firstName: 'Bob',
      lastName: 'Expert',
      role: 'EXPERT',
      coinsBalance: 500,
    },
  });

  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: 'adminpassword',
      firstName: 'Admin',
      lastName: 'One',
      role: 'ADMIN',
    },
  });

  console.log('Création du profil expert…');
  const expertDetails = await prisma.expertDetails.create({
    data: {
      userId: expertUser.id,
      headline: 'Spécialiste en finance et bien‑être',
      expertiseFields: ['Finance', 'Bien‑être'],
      linkedinUrl: 'https://linkedin.com/in/bobexpert',
      instagramUrl: 'https://instagram.com/bobexpert',
      validationStatus: 'APPROVED',
    },
  });

  console.log('Création des services…');
  await prisma.service.createMany({
    data: [
      { expertId: expertDetails.id, type: 'TEXT_MESSAGE', priceInCoins: 10 },
      { expertId: expertDetails.id, type: 'VIDEO_MESSAGE', priceInCoins: 20 },
      { expertId: expertDetails.id, type: 'VIDEO_CALL_MINUTE', priceInCoins: 5 },
    ],
  });

  console.log('Création d’une formation…');
  await prisma.formation.create({
    data: {
      expertId: expertDetails.id,
      title: 'Gestion financière 101',
      description: 'Introduction à la gestion financière personnelle et professionnelle.',
      type: 'LIVE',
      priceInCoins: 50,
      sessions: {
        create: [
          {
            title: 'Session inaugurale',
            startTime: new Date(Date.now() + 3 * 864e5),
            endTime: new Date(Date.now() + 3 * 864e5 + 3600e3),
            location: 'En ligne',
          },
        ],
      },
    },
  });

  console.log('Création d’un rendez‑vous et de la transaction associée…');
  const appointment = await prisma.appointment.create({
    data: {
      clientId: user.id,
      expertId: expertDetails.id,
      startTime: new Date(Date.now() + 2 * 864e5),
      endTime: new Date(Date.now() + 2 * 864e5 + 1800e3),
      status: 'CONFIRMED',
      priceInCoins: 30,
    },
  });

  await prisma.transaction.create({
    data: {
      userId: user.id,
      type: 'PAYMENT',
      amountCoins: 30,
      status: 'COMPLETED',
      appointmentId: appointment.id,
    },
  });

  console.log('Création d’un chat et d’un message…');
  const chat = await prisma.chat.create({
    data: {
      participants: {
        connect: [{ id: user.id }, { id: expertUser.id }],
      },
    },
  });

  await prisma.message.create({
    data: {
      chatId: chat.id,
      senderId: user.id,
      contentType: 'TEXT',
      content: 'Bonjour, j’aimerais discuter de mes finances.',
    },
  });

  console.log('Peuplement terminé avec succès.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
