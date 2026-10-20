import React, { useState } from 'react';
import { Product, getItemDescription, getItemImage } from '../utils/productLogic.ts';

interface ProductCardProps {
  product: Product;
  type: 'web' | 'app';
  onOpenDetail: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  type,
  onOpenDetail,
}) => {
  const [imgError, setImgError] = useState(false);
  const imageUrl = getItemImage(product);
  const description = getItemDescription(product);
  const displayCategory =
    product.category && product.category.trim() !== ''
      ? product.category
      : type === 'app'
      ? 'App'
      : 'Tình yêu';

  const fallbackPlaceholder =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="180" viewBox="0 0 300 180" fill="%23111827"><rect width="300" height="180" fill="%230d1522"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="32" fill="%23ec4899">❤️</text><text x="50%" y="70%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%239ca3af">' +
    encodeURIComponent(product.name) +
    '</text></svg>';

  return (
    <div className="card">
      <div className="card-img-wrapper">
        <span className="badge">{displayCategory}</span>
        <img
          src={imgError ? fallbackPlaceholder : imageUrl}
          alt={product.name}
          loading="lazy"
          onError={() => setImgError(true)}
        />
      </div>

      <h3 title={product.name}>{product.name}</h3>
      <p title={description}>{description}</p>

      <div className="card-footer">
        <span className="price-tag">{product.price || 'Free'}</span>
        <button
          className="action-btn"
          type="button"
          onClick={() => onOpenDetail(product)}
          aria-label={`Mở ${product.name}`}
        >
          Mở
        </button>
      </div>
    </div>
  );
};
