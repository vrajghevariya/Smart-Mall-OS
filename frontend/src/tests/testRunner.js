// ============================================
// SMART MALL — Automated Test Suite
// Run: node src/tests/testRunner.js
// ============================================

import {
  products, stores, categories, offers, departments,
  getProductById, getStoreById, getProductsByStore, getOffersByStore,
  getRecommendations, filterProducts, formatPrice,
  intelligentSearch, extractSearchIntent,
  validateCatalog, getPriceHistory, getPriceStats, getCrossStoreComparison
} from '../services/data.js';

let passed = 0, failed = 0, total = 0;

function test(name, fn) {
  total++;
  try {
    fn();
    passed++;
    console.log(`  ✅ ${name}`);
  } catch (e) {
    failed++;
    console.log(`  ❌ ${name}`);
    console.log(`     → ${e.message}`);
  }
}

function assert(condition, msg) {
  if (!condition) throw new Error(msg || 'Assertion failed');
}

function assertEqual(a, b, msg) {
  if (a !== b) throw new Error(msg || `Expected ${b}, got ${a}`);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
console.log('\n━━━ MODULE 1: DATA INTEGRITY ━━━');
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

test('TC-001: Products array has 58 items', () => {
  assertEqual(products.length, 58);
});

test('TC-002: Stores array has 10 items', () => {
  assertEqual(stores.length, 10);
});

test('TC-003: Categories array has 8 items', () => {
  assertEqual(categories.length, 8);
});

test('TC-004: Offers array has 12+ items', () => {
  assert(offers.length >= 12, `Only ${offers.length} offers`);
});

test('TC-005: Departments array has 8 items', () => {
  assertEqual(departments.length, 8);
});

test('TC-006: validateCatalog() returns zero errors', () => {
  const result = validateCatalog();
  assertEqual(result.valid, true, `Errors: ${result.errors.join(', ')}`);
  assertEqual(result.errors.length, 0);
});

test('TC-007: All products have required fields', () => {
  products.forEach(p => {
    assert(p.id, `Product missing id`);
    assert(p.name, `Product ${p.id} missing name`);
    assert(p.price > 0, `Product ${p.name} has invalid price`);
    assert(p.brand, `Product ${p.name} missing brand`);
    assert(p.image, `Product ${p.name} missing image`);
    assert(p.category, `Product ${p.name} missing category`);
    assert(p.subcategory, `Product ${p.name} missing subcategory`);
    assert(p.storeId, `Product ${p.name} missing storeId`);
    assert(p.rating >= 0 && p.rating <= 5, `Product ${p.name} invalid rating`);
  });
});

test('TC-008: All stores have required fields', () => {
  stores.forEach(s => {
    assert(s.id, `Store missing id`);
    assert(s.name, `Store ${s.id} missing name`);
    assert(s.category, `Store ${s.name} missing category`);
    assert(s.floor, `Store ${s.name} missing floor`);
    assert(s.rating >= 0 && s.rating <= 5, `Store ${s.name} invalid rating`);
    assert(typeof s.isOpen === 'boolean', `Store ${s.name} isOpen not boolean`);
  });
});

test('TC-009: All product images are valid URLs', () => {
  products.forEach(p => {
    assert(p.image.startsWith('http'), `Product ${p.name} image is not a URL: ${p.image}`);
  });
});

test('TC-010: No duplicate product IDs', () => {
  const ids = products.map(p => p.id);
  const unique = new Set(ids);
  assertEqual(ids.length, unique.size, `Duplicate IDs found`);
});

test('TC-011: No duplicate store IDs', () => {
  const ids = stores.map(s => s.id);
  const unique = new Set(ids);
  assertEqual(ids.length, unique.size);
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
console.log('\n━━━ MODULE 2: CROSS-CATEGORY POLLUTION ━━━');
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

test('TC-012: No electronics in fashion stores', () => {
  const fashionStores = stores.filter(s => s.department === 'fashion');
  const electronicsInFashion = products.filter(p =>
    fashionStores.some(s => s.id === p.storeId) &&
    ['Smartphones', 'Laptops', 'Audio', 'Tablets', 'TVs'].includes(p.subcategory)
  );
  assertEqual(electronicsInFashion.length, 0, `Found ${electronicsInFashion.length} electronics in fashion stores`);
});

test('TC-013: No fashion in electronics stores', () => {
  const elecStores = stores.filter(s => s.department === 'electronics');
  const fashionInElec = products.filter(p =>
    elecStores.some(s => s.id === p.storeId) &&
    ['Jeans', 'Shirts', 'Dresses', 'Hoodies', 'T-Shirts', 'Sarees'].includes(p.subcategory)
  );
  assertEqual(fashionInElec.length, 0);
});

test('TC-014: No beauty products in food stores', () => {
  const foodStores = stores.filter(s => s.department === 'food');
  const beautyInFood = products.filter(p =>
    foodStores.some(s => s.id === p.storeId) &&
    ['Lipstick', 'Perfume', 'Skincare', 'Makeup'].includes(p.subcategory)
  );
  assertEqual(beautyInFood.length, 0);
});

test('TC-015: Every product belongs to a valid store', () => {
  products.forEach(p => {
    const store = getStoreById(p.storeId);
    assert(store, `Product "${p.name}" has invalid storeId: ${p.storeId}`);
  });
});

test('TC-016: Product store name matches actual store name', () => {
  products.forEach(p => {
    const store = getStoreById(p.storeId);
    assertEqual(p.store, store.name, `Product "${p.name}": store="${p.store}" vs store.name="${store.name}"`);
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
console.log('\n━━━ MODULE 3: SEARCH & LOOKUP ━━━');
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

test('TC-017: getProductById returns correct product', () => {
  const p = getProductById(1);
  assert(p, 'Product 1 not found');
  assert(p.name, 'Product 1 has no name');
  assertEqual(p.id, 1);
});

test('TC-018: getProductById returns null for invalid ID', () => {
  const p = getProductById(99999);
  assertEqual(p, undefined);
});

test('TC-019: getStoreById returns correct store', () => {
  const s = getStoreById(1);
  assert(s, 'Store 1 not found');
  assertEqual(s.name, 'Croma');
});

test('TC-020: getProductsByStore returns only that store\'s products', () => {
  const storeProducts = getProductsByStore(1);
  assert(storeProducts.length > 0, 'No products for store 1');
  storeProducts.forEach(p => {
    assertEqual(p.storeId, 1, `Product "${p.name}" has storeId ${p.storeId}, expected 1`);
  });
});

test('TC-021: getRecommendations excludes the source product', () => {
  const recs = getRecommendations(1);
  assert(recs.length > 0, 'No recommendations');
  recs.forEach(r => {
    assert(r.id !== 1, 'Recommendation includes source product');
  });
});

test('TC-022: formatPrice formats correctly', () => {
  const formatted = formatPrice(1500);
  assert(formatted.includes('1,500'), `Expected "1,500" in "${formatted}"`);
  assert(formatted.includes('₹'), `Expected "₹" in "${formatted}"`);
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
console.log('\n━━━ MODULE 4: INTELLIGENT SEARCH (NLP) ━━━');
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

test('TC-023: Search "Nike" returns Nike products', () => {
  const { results } = intelligentSearch('Nike');
  assert(results.length > 0, 'No results for Nike');
  results.forEach(r => {
    assert(r.brand === 'Nike' || r.store === 'Nike', `Non-Nike product: ${r.name} (brand: ${r.brand})`);
  });
});

test('TC-024: Search "Samsung phone" returns Samsung phones', () => {
  const { results } = intelligentSearch('Samsung phone');
  assert(results.length > 0, 'No results');
  assert(results.some(r => r.brand === 'Samsung'), 'No Samsung products');
});

test('TC-025: Search "under 5000" returns products below ₹5000', () => {
  const { results } = intelligentSearch('under 5000');
  assert(results.length > 0, 'No results');
  results.forEach(r => {
    assert(r.price <= 5000, `Product "${r.name}" costs ₹${r.price}, expected under 5000`);
  });
});

test('TC-026: Search "shoes under 10000" filters by price AND category', () => {
  const { results } = intelligentSearch('shoes under 10000');
  results.forEach(r => {
    assert(r.price <= 10000, `Product "${r.name}" costs ₹${r.price}`);
  });
});

test('TC-027: extractSearchIntent detects brand', () => {
  const intent = extractSearchIntent('Nike shoes');
  assertEqual(intent.brand, 'Nike');
});

test('TC-028: extractSearchIntent detects price limit', () => {
  const intent = extractSearchIntent('laptop under 50000');
  assertEqual(intent.maxPrice, 50000);
});

test('TC-029: extractSearchIntent detects gift intent', () => {
  const intent = extractSearchIntent('gift for my brother');
  assertEqual(intent.isGift, true);
});

test('TC-030: Search empty string returns 0 results (no query = no search)', () => {
  const { results } = intelligentSearch('');
  assertEqual(results.length, 0);
});

test('TC-031: Search "xyzabc123" returns 0 results', () => {
  const { results } = intelligentSearch('xyzabc123nonsense');
  assertEqual(results.length, 0);
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
console.log('\n━━━ MODULE 5: PRICE HISTORY ━━━');
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

test('TC-032: getPriceHistory returns 30 days', () => {
  const history = getPriceHistory(1);
  assertEqual(history.length, 30);
});

test('TC-033: Last price in history matches current product price', () => {
  const product = getProductById(1);
  const history = getPriceHistory(1);
  assertEqual(history[history.length - 1].price, product.price);
});

test('TC-034: All history dates are valid', () => {
  const history = getPriceHistory(1);
  history.forEach(h => {
    assert(h.date.match(/^\d{4}-\d{2}-\d{2}$/), `Invalid date: ${h.date}`);
    assert(h.dateLabel, `Missing dateLabel`);
    assert(h.price > 0, `Invalid price: ${h.price}`);
  });
});

test('TC-035: History dates are in chronological order', () => {
  const history = getPriceHistory(1);
  for (let i = 1; i < history.length; i++) {
    assert(history[i].date >= history[i - 1].date, `Dates not sorted: ${history[i - 1].date} > ${history[i].date}`);
  }
});

test('TC-036: getPriceHistory is deterministic (same data on re-call)', () => {
  const h1 = getPriceHistory(5);
  const h2 = getPriceHistory(5);
  assertEqual(JSON.stringify(h1), JSON.stringify(h2));
});

test('TC-037: getPriceStats returns all required fields', () => {
  const stats = getPriceStats(1);
  assert(stats, 'No stats returned');
  assert(stats.currentPrice > 0, 'No currentPrice');
  assert(stats.lowestPrice > 0, 'No lowestPrice');
  assert(stats.highestPrice > 0, 'No highestPrice');
  assert(stats.avgPrice > 0, 'No avgPrice');
  assert(stats.lowestPrice <= stats.currentPrice || stats.isAtLowest, 'Lowest > current but not at lowest');
  assert(stats.highestPrice >= stats.currentPrice || stats.isAtHighest, 'Highest < current but not at highest');
  assert(['dropping', 'rising', 'stable'].includes(stats.trend), `Invalid trend: ${stats.trend}`);
});

test('TC-038: getPriceStats lowest <= average <= highest', () => {
  const stats = getPriceStats(1);
  assert(stats.lowestPrice <= stats.avgPrice, 'Lowest > average');
  assert(stats.avgPrice <= stats.highestPrice, 'Average > highest');
});

test('TC-039: getPriceHistory for invalid product returns empty', () => {
  const history = getPriceHistory(99999);
  assertEqual(history.length, 0);
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
console.log('\n━━━ MODULE 6: PRICE COMPARISON ━━━');
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

test('TC-040: getCrossStoreComparison returns at least 1 entry', () => {
  const comps = getCrossStoreComparison(1);
  assert(comps.length >= 1, 'No comparison entries');
});

test('TC-041: First comparison entry is the current store', () => {
  const product = getProductById(1);
  const comps = getCrossStoreComparison(1);
  assertEqual(comps[0].isCurrent, true);
  assertEqual(comps[0].storeName, product.store);
  assertEqual(comps[0].price, product.price);
});

test('TC-042: Exactly one "best price" marked', () => {
  const comps = getCrossStoreComparison(1).filter(c => c.inStock);
  const bestCount = comps.filter(c => c.isBest).length;
  assertEqual(bestCount, 1, `Expected 1 best price, got ${bestCount}`);
});

test('TC-043: Best price is actually the lowest', () => {
  const comps = getCrossStoreComparison(1).filter(c => c.inStock);
  const best = comps.find(c => c.isBest);
  comps.forEach(c => {
    assert(best.price <= c.price, `Best (${best.price}) is not lowest; ${c.storeName} has ${c.price}`);
  });
});

test('TC-044: All comparison entries have required fields', () => {
  const comps = getCrossStoreComparison(1);
  comps.forEach(c => {
    assert(c.storeName, 'Missing storeName');
    assert(c.price > 0, 'Invalid price');
    assert(c.rating > 0, 'Invalid rating');
    assert(typeof c.inStock === 'boolean', 'inStock not boolean');
    assert(c.delivery, 'Missing delivery');
  });
});

test('TC-045: Comparison is deterministic', () => {
  const c1 = getCrossStoreComparison(3);
  const c2 = getCrossStoreComparison(3);
  assertEqual(JSON.stringify(c1), JSON.stringify(c2));
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
console.log('\n━━━ MODULE 7: BRAND INTEGRITY ━━━');
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

test('TC-046: Croma only has electronics', () => {
  const cromaProducts = products.filter(p => p.store === 'Croma');
  assert(cromaProducts.length > 0, 'No Croma products');
  cromaProducts.forEach(p => {
    assertEqual(p.category, 'Electronics', `Croma has non-electronics: ${p.name} (${p.category})`);
  });
});

test('TC-047: H&M only has fashion', () => {
  const hmProducts = products.filter(p => p.store === 'H&M');
  assert(hmProducts.length > 0);
  hmProducts.forEach(p => {
    assertEqual(p.category, 'Fashion', `H&M has non-fashion: ${p.name}`);
  });
});

test('TC-048: Starbucks only has food & beverage', () => {
  const sbProducts = products.filter(p => p.store === 'Starbucks');
  assert(sbProducts.length > 0);
  sbProducts.forEach(p => {
    assertEqual(p.category, 'Food & Beverage', `Starbucks has wrong category: ${p.name}`);
  });
});

test('TC-049: Sephora only has beauty products', () => {
  const sepProducts = products.filter(p => p.store === 'Sephora');
  assert(sepProducts.length > 0);
  sepProducts.forEach(p => {
    assertEqual(p.category, 'Beauty', `Sephora has non-beauty: ${p.name}`);
  });
});

test('TC-050: Every store has at least 3 products', () => {
  stores.forEach(s => {
    const count = products.filter(p => p.storeId === s.id).length;
    assert(count >= 3, `Store "${s.name}" only has ${count} products`);
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`\n📊 RESULTS: ${passed}/${total} passed, ${failed} failed\n`);

if (failed > 0) {
  console.log('❌ SOME TESTS FAILED\n');
  process.exit(1);
} else {
  console.log('✅ ALL TESTS PASSED\n');
  process.exit(0);
}
