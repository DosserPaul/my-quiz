import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const quiz = await prisma.quiz.create({
    data: {
      title: 'DevOps',
      questions: {
        create: [
          {
            text: 'What is the primary goal of DevOps?',
            answers: {
              create: [
                { text: 'To create more documentation', isCorrect: false },
                { text: 'To develop software without testing', isCorrect: false },
                { text: 'To work in silos', isCorrect: false },
                { text: 'To improve collaboration between development and operations teams', isCorrect: true },
              ],
            },
          },
          {
            text: 'What does CI/CD stand for in DevOps?',
            answers: {
              create: [
                { text: 'To create more bugs', isCorrect: false },
                { text: 'To isolate applications and their dependencies', isCorrect: true },
                { text: 'To make software development slower', isCorrect: false },
                { text: 'To increase the size of applications', isCorrect: false },
              ],
            },
          },
          {
            text: 'Which tool is commonly used for version control in DevOps?',
            answers: {
              create: [
                { text: 'JIRA', isCorrect: false },
                { text: 'Jenkins', isCorrect: false },
                { text: 'Docker', isCorrect: false },
                { text: 'Git', isCorrect: true },
              ],
            },
          },
          {
            text: 'What is the main purpose of using containers in DevOps?',
            answers: {
              create: [
                { text: 'Slower release cycles', isCorrect: false },
                { text: 'Increased collaboration', isCorrect: true },
                { text: 'More manual processes', isCorrect: false },
                { text: 'Greater separation of teams', isCorrect: false },
              ],
            },
          },
        ],
      },
    },
  });

  console.log({ quiz });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
