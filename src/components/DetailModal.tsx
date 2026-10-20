import React, { useState } from 'react';
import {
  Product,
  getItemDescription,
  getItemUseLink,
  getItemDownloadLink,
} from '../utils/productLogic.ts';

interface DetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ product, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!product) return null;

  const description = getItemDescription(product);
  const useUrl = getItemUseLink(product);
  const downloadUrl = getItemDownloadLink(product);
  const buttonText = product.buttonText || 'Mở / Sử Dụng';

  const handleCopyLink = () => {
    const targetUrl = useUrl || downloadUrl || window.location.href;
    navigator.clipboard.writeText(targetUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      id="detail-modal"
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-content">
        <button
          className="close-modal-btn"
          type="button"
          onClick={onClose}
          aria-label="Đóng cửa sổ chi tiết"
        >
          &times;
        </button>

        <h2 id="modal-title">{product.name}</h2>
        <p id="modal-desc">{description}</p>
        <p>
          <strong>Tác giả: </strong>
          <span id="modal-author">{product.author || 'DevPan'}</span>
        </p>

        <div className="modal-actions" id="modal-links">
          {useUrl && (
            <a
              href={useUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-use"
            >
              <i className="fa-solid fa-rocket"></i> {buttonText}
            </a>
          )}

          {downloadUrl && (
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-download"
            >
              <i className="fa-solid fa-download"></i> Tải Source/File
            </a>
          )}

          {(useUrl || downloadUrl) && (
            <button
              type="button"
              className="btn-download"
              onClick={handleCopyLink}
              style={{ fontSize: '0.8rem', padding: '8px 12px' }}
            >
              <i className={`fa-solid ${copied ? 'fa-check' : 'fa-link'}`}></i>
              {copied ? 'Đã sao chép liên kết!' : 'Sao chép liên kết'}
            </button>
          )}

          {!useUrl && !downloadUrl && (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Đang cập nhật tính năng
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
