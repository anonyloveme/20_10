import React, { useState } from 'react';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DonateModal: React.FC<DonateModalProps> = ({ isOpen, onClose }) => {
  const [copiedSTK, setCopiedSTK] = useState(false);

  if (!isOpen) return null;

  const handleCopySTK = () => {
    navigator.clipboard.writeText('42515647').then(() => {
      setCopiedSTK(true);
      setTimeout(() => setCopiedSTK(false), 2000);
    });
  };

  return (
    <div
      id="donate-modal"
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="donate-title"
    >
      <div className="modal-content">
        <button
          className="close-modal-btn"
          type="button"
          onClick={onClose}
          aria-label="Đóng cửa sổ ủng hộ"
        >
          &times;
        </button>

        <h2 id="donate-title">Ủng Hộ Tác Giả ☕</h2>

        <div className="qr-container">
          <img
            src="/assets/bank.png"
            alt="Mã QR Chuyển Khoản ACB"
            className="qr-image"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'https://devpan.vercel.app/assets/bank.png';
            }}
          />
        </div>

        <p>
          Ngân hàng: <strong>ACB Bank</strong>
        </p>
        <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          STK: <strong>4251 5647</strong>
          <button
            type="button"
            onClick={handleCopySTK}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              borderRadius: '6px',
              padding: '2px 8px',
              fontSize: '0.75rem',
              cursor: 'pointer',
            }}
            title="Sao chép số tài khoản"
          >
            <i className={`fa-solid ${copiedSTK ? 'fa-check' : 'fa-copy'}`}></i>{' '}
            {copiedSTK ? 'Đã chép' : 'Chép'}
          </button>
        </p>
        <p>
          Chủ TK: <strong>Phan Quốc Đạt</strong>
        </p>

        <p style={{ fontSize: '0.82rem', marginTop: '12px', color: 'var(--text-muted)' }}>
          Quét mã QR để mời tác giả ly cà phê nhé! Cảm ơn bạn rất nhiều! ❤️
        </p>
      </div>
    </div>
  );
};
