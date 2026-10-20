import React, { useState, useMemo, useEffect } from 'react';
import productsData from './data/products.json';
import {
  Product,
  filterProducts,
  paginate,
  getTotalPages,
} from './utils/productLogic.ts';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { ProductGrid } from './components/ProductGrid.tsx';
import { DetailModal } from './components/DetailModal.tsx';
import { DonateModal } from './components/DonateModal.tsx';
import { FloatingContactWidget } from './components/FloatingContactWidget.tsx';
import { Footer } from './components/Footer.tsx';

const typedProducts = productsData as Product[];

export default function App() {
  const [activeTab, setActiveTab] = useState<'web' | 'app'>('web');
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [webPage, setWebPage] = useState<number>(1);
  const [appPage, setAppPage] = useState<number>(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDonateOpen, setIsDonateOpen] = useState<boolean>(false);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProduct(null);
        setIsDonateOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filtered lists
  const filteredWebProducts = useMemo(() => {
    return filterProducts(typedProducts, {
      tab: 'web',
      category: currentCategory,
      keyword: searchKeyword,
    });
  }, [currentCategory, searchKeyword]);

  const filteredAppProducts = useMemo(() => {
    return filterProducts(typedProducts, {
      tab: 'app',
      category: currentCategory,
      keyword: searchKeyword,
    });
  }, [currentCategory, searchKeyword]);

  // Overall counts for hero badges
  const totalWebCount = useMemo(() => {
    return filterProducts(typedProducts, { tab: 'web', category: 'all', keyword: '' }).length;
  }, []);

  const totalAppCount = useMemo(() => {
    return filterProducts(typedProducts, { tab: 'app', category: 'all', keyword: '' }).length;
  }, []);

  // Reset page when category or search changes
  const handleSelectCategory = (category: string) => {
    setCurrentCategory(category);
    setWebPage(1);
    setAppPage(1);
  };

  const handleSearchChange = (keyword: string) => {
    setSearchKeyword(keyword);
    setWebPage(1);
    setAppPage(1);
  };

  const handleSwitchTab = (tab: 'web' | 'app') => {
    setActiveTab(tab);
  };

  // Paginated slices
  const currentList = activeTab === 'web' ? filteredWebProducts : filteredAppProducts;
  const currentPage = activeTab === 'web' ? webPage : appPage;
  const totalPages = getTotalPages(currentList.length, 8);
  const pagedProducts = paginate(currentList, currentPage, 8);

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        currentCategory={currentCategory}
        onSelectCategory={handleSelectCategory}
        searchKeyword={searchKeyword}
        onSearchChange={handleSearchChange}
        onOpenDonate={() => setIsDonateOpen(true)}
      />

      <Hero
        activeTab={activeTab}
        onSwitchTab={handleSwitchTab}
        webCount={searchKeyword ? filteredWebProducts.length : totalWebCount}
        appCount={searchKeyword ? filteredAppProducts.length : totalAppCount}
      />

      <main className="container" id="main-content">
        {activeTab === 'web' ? (
          <section id="web-section">
            <div className="section-header">
              <h2 className="section-title">
                <i className="fa-solid fa-globe"></i> Website
                {searchKeyword && (
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 400 }}>
                    (Tìm thấy {filteredWebProducts.length} kết quả)
                  </span>
                )}
              </h2>
            </div>
            <ProductGrid
              products={pagedProducts}
              type="web"
              currentPage={webPage}
              totalPages={totalPages}
              onPageChange={setWebPage}
              onOpenDetail={(product) => setSelectedProduct(product)}
              onResetCategory={() => {
                setCurrentCategory('all');
                setSearchKeyword('');
              }}
            />
          </section>
        ) : (
          <section id="app-section">
            <div className="section-header">
              <h2 className="section-title">
                <i
                  className="fa-solid fa-laptop-code"
                  style={{ color: 'var(--accent-purple)' }}
                ></i>{' '}
                App / Game
                {searchKeyword && (
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 400 }}>
                    (Tìm thấy {filteredAppProducts.length} kết quả)
                  </span>
                )}
              </h2>
            </div>
            <ProductGrid
              products={pagedProducts}
              type="app"
              currentPage={appPage}
              totalPages={totalPages}
              onPageChange={setAppPage}
              onOpenDetail={(product) => setSelectedProduct(product)}
              onResetCategory={() => {
                setCurrentCategory('all');
                setSearchKeyword('');
              }}
            />
          </section>
        )}
      </main>

      <Footer />

      <DetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <DonateModal
        isOpen={isDonateOpen}
        onClose={() => setIsDonateOpen(false)}
      />

      <FloatingContactWidget />
    </div>
  );
}
