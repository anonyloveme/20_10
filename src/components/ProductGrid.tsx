import React from 'react';
import { Product } from '../utils/productLogic.ts';
import { ProductCard } from './ProductCard.tsx';

interface ProductGridProps {
  products: Product[];
  type: 'web' | 'app';
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onOpenDetail: (product: Product) => void;
  onResetCategory?: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  type,
  currentPage,
  totalPages,
  onPageChange,
  onOpenDetail,
  onResetCategory,
}) => {
  if (products.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          color: 'var(--text-muted)',
          padding: '60px 16px',
          background: 'var(--bg-card)',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          marginTop: '16px',
        }}
      >
        <i
          className="fa-solid fa-heart-crack"
          style={{ fontSize: '2.5rem', color: 'var(--accent-pink)', marginBottom: '14px', display: 'inline-block' }}
        ></i>
        <h3 style={{ fontSize: '1.15rem', color: 'var(--text-main)', margin: '0 0 6px' }}>
          Không tìm thấy kết quả nào
        </h3>
        <p style={{ margin: '0 0 16px', fontSize: '0.88rem' }}>
          Thử tìm từ khóa khác hoặc chuyển sang danh mục Tất cả xem nhé!
        </p>
        {onResetCategory && (
          <button
            type="button"
            className="action-btn"
            style={{ padding: '8px 18px', fontSize: '0.88rem' }}
            onClick={onResetCategory}
          >
            <i className="fa-solid fa-rotate-left" style={{ marginRight: '6px' }}></i>
            Xem tất cả
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="grid-container" id={`${type}-grid`}>
        {products.map((product) => (
          <ProductCard
            key={product.name}
            product={product}
            type={type}
            onOpenDetail={onOpenDetail}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination" id={`${type}-pagination`} role="navigation" aria-label="Phân trang">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              className={pageNum === currentPage ? 'active-page' : ''}
              onClick={() => {
                onPageChange(pageNum);
                window.scrollTo({ top: 120, behavior: 'smooth' });
              }}
              aria-current={pageNum === currentPage ? 'page' : undefined}
            >
              {pageNum}
            </button>
          ))}
        </div>
      )}
    </>
  );
};
