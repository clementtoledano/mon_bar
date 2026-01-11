import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create sample products
  const products = [
    // Beers
    { name: 'Kronenbourg 1664', category: 'beer', subcategory: 'lager', brand: 'Kronenbourg', volume_ml: 250, base_cost: 0.8, selling_price: 3.5 },
    { name: 'Heineken', category: 'beer', subcategory: 'lager', brand: 'Heineken', volume_ml: 250, base_cost: 0.9, selling_price: 4.0 },
    { name: 'Guinness', category: 'beer', subcategory: 'stout', brand: 'Guinness', volume_ml: 330, base_cost: 1.2, selling_price: 5.0 },
    { name: 'Leffe Blonde', category: 'beer', subcategory: 'abbey_ale', brand: 'Leffe', volume_ml: 330, base_cost: 1.0, selling_price: 4.5 },

    // Wines
    { name: 'Bordeaux Rouge', category: 'wine', subcategory: 'red', brand: 'Maison', volume_ml: 150, base_cost: 2.5, selling_price: 6.0 },
    { name: 'Chardonnay', category: 'wine', subcategory: 'white', brand: 'Maison', volume_ml: 150, base_cost: 2.3, selling_price: 5.5 },
    { name: 'Rosé de Provence', category: 'wine', subcategory: 'rose', brand: 'Maison', volume_ml: 150, base_cost: 2.4, selling_price: 5.8 },

    // Spirits
    { name: 'Jack Daniels', category: 'spirit', subcategory: 'whiskey', brand: 'Jack Daniels', volume_ml: 40, base_cost: 2.0, selling_price: 7.0 },
    { name: 'Absolut Vodka', category: 'spirit', subcategory: 'vodka', brand: 'Absolut', volume_ml: 40, base_cost: 1.5, selling_price: 6.0 },
    { name: 'Bacardi Rum', category: 'spirit', subcategory: 'rum', brand: 'Bacardi', volume_ml: 40, base_cost: 1.4, selling_price: 5.5 },
    { name: 'Tanqueray Gin', category: 'spirit', subcategory: 'gin', brand: 'Tanqueray', volume_ml: 40, base_cost: 1.8, selling_price: 6.5 },

    // Soft drinks
    { name: 'Coca-Cola', category: 'soft', subcategory: null, brand: 'Coca-Cola', volume_ml: 250, base_cost: 0.5, selling_price: 2.5 },
    { name: 'Orangina', category: 'soft', subcategory: null, brand: 'Orangina', volume_ml: 250, base_cost: 0.5, selling_price: 2.5 },
    { name: 'Perrier', category: 'soft', subcategory: null, brand: 'Perrier', volume_ml: 330, base_cost: 0.6, selling_price: 2.8 },

    // Food
    { name: 'Chips', category: 'food', subcategory: 'snack', brand: 'Lays', volume_ml: null, base_cost: 0.8, selling_price: 3.0 },
    { name: 'Cacahuètes', category: 'food', subcategory: 'snack', brand: 'Maison', volume_ml: null, base_cost: 0.6, selling_price: 2.5 },
    { name: 'Sandwich Club', category: 'food', subcategory: 'meal', brand: 'Maison', volume_ml: null, base_cost: 2.5, selling_price: 6.5 },
  ];

  console.log('📦 Creating products...');
  for (const product of products) {
    await prisma.product.upsert({
      where: { id: `${product.name.toLowerCase().replace(/\s+/g, '-')}` },
      update: {},
      create: {
        id: `${product.name.toLowerCase().replace(/\s+/g, '-')}`,
        ...product,
      },
    });
  }
  console.log(`✅ Created ${products.length} products`);

  // Create sample suppliers
  const suppliers = [
    { name: 'Brasseries Kronenbourg', delivery_time_min: 24, delivery_time_max: 48, reliability_score: 90 },
    { name: 'Metro Pro', delivery_time_min: 4, delivery_time_max: 12, reliability_score: 95 },
    { name: 'Drinks & Co', delivery_time_min: 48, delivery_time_max: 96, reliability_score: 80 },
  ];

  console.log('🚚 Creating suppliers...');
  for (const supplier of suppliers) {
    await prisma.supplier.upsert({
      where: { id: `${supplier.name.toLowerCase().replace(/\s+/g, '-')}` },
      update: {},
      create: {
        id: `${supplier.name.toLowerCase().replace(/\s+/g, '-')}`,
        ...supplier,
      },
    });
  }
  console.log(`✅ Created ${suppliers.length} suppliers`);

  console.log('✨ Database seed completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
