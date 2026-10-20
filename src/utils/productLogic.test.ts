import test from 'node:test';
import assert from 'node:assert/strict';
import {
  resolveUrl,
  getItemDescription,
  getItemUseLink,
  getItemDownloadLink,
  isAppOrGame,
  filterProducts,
  paginate,
  getTotalPages,
} from './productLogic.ts';
import type { Product } from './productLogic.ts';

test('resolveUrl handles absolute and relative URLs properly', () => {
  assert.equal(resolveUrl('https://example.com/demo'), 'https://example.com/demo');
  assert.equal(resolveUrl('/inputs/flower.html'), 'https://devpan.vercel.app/inputs/flower.html');
  assert.equal(resolveUrl('./download/taive.html?id=1'), 'https://devpan.vercel.app/download/taive.html?id=1');
  assert.equal(resolveUrl('#'), null);
  assert.equal(resolveUrl(''), null);
  assert.equal(resolveUrl(undefined), null);
});

test('getItemDescription returns description or fallback', () => {
  assert.equal(getItemDescription({ name: 'A', descriptions: 'Custom Desc' }), 'Custom Desc');
  assert.equal(getItemDescription({ name: 'B', description: 'Alt Desc' }), 'Alt Desc');
  assert.equal(getItemDescription({ name: 'C' }), 'Chưa có mô tả chi tiết.');
});

test('isAppOrGame correctly separates apps/games/tools from web items', () => {
  assert.equal(isAppOrGame({ name: 'Game 1', category: 'Game' }), true);
  assert.equal(isAppOrGame({ name: 'Tool 1', category: 'Tool' }), true);
  assert.equal(isAppOrGame({ name: 'App 1', category: 'App' }), true);
  assert.equal(isAppOrGame({ name: 'Heart', category: 'Trái tim' }), false);
  assert.equal(isAppOrGame({ name: 'Valentine', category: 'Tình yêu' }), false);
});

test('filterProducts filters by tab, category, and keyword search', () => {
  const sampleProducts: Product[] = [
    { name: 'Hoa Valentine', category: 'Tình yêu', descriptions: 'Tang hoa' },
    { name: 'Trai tim pha le', category: 'Trái tim', descriptions: 'Loi nhan' },
    { name: 'Game Ban Bong', category: 'Game', descriptions: 'Tro choi tinh yeu' },
    { name: 'Tool Code', category: 'Tool', descriptions: 'Cong cu tien ich' },
  ];

  const webOnly = filterProducts(sampleProducts, { tab: 'web' });
  assert.equal(webOnly.length, 2);
  assert.equal(webOnly[0].name, 'Hoa Valentine');

  const appOnly = filterProducts(sampleProducts, { tab: 'app' });
  assert.equal(appOnly.length, 2);
  assert.equal(appOnly[0].name, 'Game Ban Bong');

  const searchFiltered = filterProducts(sampleProducts, { tab: 'web', keyword: 'pha le' });
  assert.equal(searchFiltered.length, 1);
  assert.equal(searchFiltered[0].name, 'Trai tim pha le');

  const categoryFiltered = filterProducts(sampleProducts, { tab: 'web', category: 'Tình yêu' });
  assert.equal(categoryFiltered.length, 1);
  assert.equal(categoryFiltered[0].name, 'Hoa Valentine');
});

test('paginate and getTotalPages calculate pages accurately', () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  assert.equal(getTotalPages(items.length, 8), 2);
  assert.equal(getTotalPages(0, 8), 1);

  const page1 = paginate(items, 1, 8);
  assert.equal(page1.length, 8);
  assert.deepEqual(page1, [1, 2, 3, 4, 5, 6, 7, 8]);

  const page2 = paginate(items, 2, 8);
  assert.equal(page2.length, 2);
  assert.deepEqual(page2, [9, 10]);
});
