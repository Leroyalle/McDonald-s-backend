import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.productItem.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Создаем категории
  const burgers = await prisma.category.create({
    data: {
      id: 'burgers',
      name: 'Бургеры',
    },
  });

  const snacks = await prisma.category.create({
    data: {
      id: 'snacks',
      name: 'Снэки',
    },
  });

  const drinks = await prisma.category.create({
    data: {
      id: 'drinks',
      name: 'Напитки',
    },
  });

  const desserts = await prisma.category.create({
    data: {
      id: 'desserts',
      name: 'Десерты',
    },
  });

  // Бургеры
  await prisma.product.create({
    data: {
      name: 'Атлантик Бургер',
      description: 'Сочный бургер с рыбой',
      isNew: true,
      bonusMultiplier: 2,
      categoryId: burgers.id,
      items: {
        create: [
          {
            weight: '170 г',
            image:
              'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=300&h=200&fit=crop',
            price: 272,
            quantity: 1,
          },
          {
            weight: '200 г',
            image:
              'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=300&h=200&fit=crop',
            price: 320,
            quantity: 1,
          },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: 'Биг Тейсти',
      description: 'Сочный бургер с говяжьей котлетой',
      isNew: false,
      bonusMultiplier: 1,
      categoryId: burgers.id,
      items: {
        create: [
          {
            weight: '180 г',
            image:
              'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop',
            price: 299,
            quantity: 1,
          },
          {
            weight: '220 г',
            image:
              'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop',
            price: 350,
            quantity: 1,
          },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: 'Чикен Бургер',
      description: 'Бургер с куриной котлетой',
      isNew: true,
      bonusMultiplier: 1,
      categoryId: burgers.id,
      items: {
        create: [
          {
            weight: '150 г',
            image:
              'https://images.unsplash.com/photo-1513185158878-8d8c2a2a3da3?w=300&h=200&fit=crop',
            price: 199,
            quantity: 1,
          },
          {
            weight: '180 г',
            image:
              'https://images.unsplash.com/photo-1513185158878-8d8c2a2a3da3?w=300&h=200&fit=crop',
            price: 249,
            quantity: 1,
          },
        ],
      },
    },
  });

  // Снэки
  await prisma.product.create({
    data: {
      name: 'Картофель Фри',
      description: 'Хрустящий картофель фри',
      isNew: false,
      bonusMultiplier: 1,
      categoryId: snacks.id,
      items: {
        create: [
          {
            weight: '100 г',
            image:
              'https://images.unsplash.com/photo-1630389917978-9fd59a8e3f1f?w=300&h=200&fit=crop',
            price: 99,
            quantity: 1,
          },
          {
            weight: '150 г',
            image:
              'https://images.unsplash.com/photo-1630389917978-9fd59a8e3f1f?w=300&h=200&fit=crop',
            price: 149,
            quantity: 1,
          },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: 'Наггетсы',
      description: 'Куриные наггетсы',
      isNew: false,
      bonusMultiplier: 1,
      categoryId: snacks.id,
      items: {
        create: [
          {
            weight: '100 г',
            image:
              'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=300&h=200&fit=crop',
            price: 149,
            quantity: 1,
          },
          {
            weight: '150 г',
            image:
              'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=300&h=200&fit=crop',
            price: 199,
            quantity: 1,
          },
        ],
      },
    },
  });

  // Напитки
  await prisma.product.create({
    data: {
      name: 'Кока-Кола',
      description: 'Освежающий напиток',
      isNew: false,
      bonusMultiplier: 1,
      categoryId: drinks.id,
      items: {
        create: [
          {
            weight: '0.5 л',
            image:
              'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=300&h=200&fit=crop',
            price: 99,
            quantity: 1,
          },
          {
            weight: '1 л',
            image:
              'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=300&h=200&fit=crop',
            price: 149,
            quantity: 1,
          },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: 'Молочный коктейль',
      description: 'Сливочный молочный коктейль',
      isNew: true,
      bonusMultiplier: 1,
      categoryId: drinks.id,
      items: {
        create: [
          {
            weight: '0.3 л',
            image:
              'https://images.unsplash.com/photo-1572490122747-f8b0e3e0f1c1?w=300&h=200&fit=crop',
            price: 199,
            quantity: 1,
          },
          {
            weight: '0.5 л',
            image:
              'https://images.unsplash.com/photo-1572490122747-f8b0e3e0f1c1?w=300&h=200&fit=crop',
            price: 299,
            quantity: 1,
          },
        ],
      },
    },
  });

  // Десерты
  await prisma.product.create({
    data: {
      name: 'Мороженое',
      description: 'Сливочное мороженое',
      isNew: false,
      bonusMultiplier: 1,
      categoryId: desserts.id,
      items: {
        create: [
          {
            weight: '100 г',
            image:
              'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&h=200&fit=crop',
            price: 99,
            quantity: 1,
          },
          {
            weight: '150 г',
            image:
              'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&h=200&fit=crop',
            price: 149,
            quantity: 1,
          },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: 'Яблочный пирог',
      description: 'Свежеиспеченный яблочный пирог',
      isNew: true,
      bonusMultiplier: 1,
      categoryId: desserts.id,
      items: {
        create: [
          {
            weight: '100 г',
            image:
              'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=300&h=200&fit=crop',
            price: 149,
            quantity: 1,
          },
          {
            weight: '150 г',
            image:
              'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=300&h=200&fit=crop',
            price: 199,
            quantity: 1,
          },
        ],
      },
    },
  });

  console.log('seed done');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
