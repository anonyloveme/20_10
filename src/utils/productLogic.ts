/**
 * Core product filtering, pagination, and URL resolution logic for LoveLy
 */

export interface Product {
  name: string;
  image?: string;
  img?: string;
  descriptions?: string;
  description?: string;
  price?: string;
  paymentLink?: string;
  paymentLinks?: string;
  paymentLinkss?: string;
  paymentLinksss?: string;
  paymentLinkssss?: string;
  demoLink?: string;
  link?: string;
  downloadLink?: string;
  buttonText?: string;
  category?: string;
  author?: string;
}

const DEVPAN_BASE_URL = 'https://devpan.vercel.app';

export function resolveUrl(url: string | undefined | null): string | null {
  if (!url || url === '#' || url.trim() === '') return null;
  const trimmed = url.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  if (trimmed.startsWith('/')) {
    return `${DEVPAN_BASE_URL}${trimmed}`;
  }
  if (trimmed.startsWith('./')) {
    return `${DEVPAN_BASE_URL}/${trimmed.slice(2)}`;
  }
  return `${DEVPAN_BASE_URL}/${trimmed}`;
}

export function getItemDescription(item: Product): string {
  return item.descriptions || item.description || 'Chưa có mô tả chi tiết.';
}

export function getItemUseLink(item: Product): string | null {
  const link =
    item.paymentLinksss ||
    item.paymentLinkssss ||
    item.paymentLinkss ||
    item.paymentLinks ||
    item.demoLink ||
    item.link;
  return resolveUrl(link);
}

export function getItemDownloadLink(item: Product): string | null {
  const link = item.downloadLink || item.paymentLink;
  return resolveUrl(link);
}

export function getItemImage(item: Product): string {
  const img = item.image || item.img;
  if (!img || img === '#') {
    return 'https://raw.githubusercontent.com/Panbap/anh/refs/heads/main/icon1.png';
  }
  return img;
}

export function isAppOrGame(item: Product): boolean {
  const cat = (item.category || '').toLowerCase();
  return cat.includes('app') || cat.includes('game') || cat.includes('tool');
}

export interface FilterOptions {
  tab?: 'web' | 'app';
  category?: string;
  keyword?: string;
}

export function filterProducts(products: Product[], options: FilterOptions): Product[] {
  const { tab = 'web', category = 'all', keyword = '' } = options;

  let list = products.filter(item => {
    const isApp = isAppOrGame(item);
    return tab === 'app' ? isApp : !isApp;
  });

  if (category && category.toLowerCase() !== 'all') {
    const targetCat = category.toLowerCase().trim();
    list = list.filter(item => {
      const itemCat = (item.category || '').toLowerCase();
      return itemCat.includes(targetCat);
    });
  }

  if (keyword && keyword.trim() !== '') {
    const term = keyword.toLowerCase().trim();
    list = list.filter(item => {
      const nameMatch = item.name.toLowerCase().includes(term);
      const descMatch = getItemDescription(item).toLowerCase().includes(term);
      const catMatch = (item.category || '').toLowerCase().includes(term);
      return nameMatch || descMatch || catMatch;
    });
  }

  return list;
}

export function getTotalPages(totalItems: number, pageSize: number = 8): number {
  if (totalItems <= 0 || pageSize <= 0) return 1;
  return Math.ceil(totalItems / pageSize);
}

export function paginate<T>(items: T[], page: number, pageSize: number = 8): T[] {
  const validPage = Math.max(1, page);
  const start = (validPage - 1) * pageSize;
  return items.slice(start, start + pageSize);
}
