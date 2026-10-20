import React, { useState, useEffect, useRef } from 'react';

const TOOLTIP_MESSAGES = [
  'Website miễn phí! 🎁',
  'Gửi gắm yêu thương! 💌',
  'Nếu cần hỗ trợ? ✨',
  'Nhắn cho mình nhé! 💖',
];

export const FloatingContactWidget: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [messageIndex, setMessageIndex] = useState(3); // Start with 'Nhắn cho mình nhé! 💖'
  const [isFading, setIsFading] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showTooltip) return;

    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setMessageIndex((prev) => (prev + 1) % TOOLTIP_MESSAGES.length);
        setIsFading(false);
      }, 400);
    }, 3500);

    return () => clearInterval(interval);
  }, [showTooltip]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isVisible) return null;

  return (
    <div id="contact-widget" ref={widgetRef}>
      {showTooltip && !isMenuOpen && (
        <div className="widget-tooltip" id="widget-tooltip">
          <span id="tooltip-text" className={isFading ? 'fade-out' : ''}>
            {TOOLTIP_MESSAGES[messageIndex]}
          </span>
          <button
            className="tooltip-close-btn"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            aria-label="Tắt gợi ý"
          >
            &times;
          </button>
        </div>
      )}

      {isMenuOpen && (
        <div className="widget-menu show" id="widget-menu">
          <a
            href="https://zalo.me/0948339082"
            target="_blank"
            rel="noopener noreferrer"
            className="zalo"
          >
            <i className="fa-solid fa-comment" style={{ color: '#0084ff' }}></i>
            <span>Zalo</span>
          </a>
          <a
            href="https://www.facebook.com/people/Dev-Pan/61571915535119/"
            target="_blank"
            rel="noopener noreferrer"
            className="fb"
          >
            <i className="fa-brands fa-facebook-f" style={{ color: '#1877f2' }}></i>
            <span>Facebook</span>
          </a>
          <a
            href="https://www.tiktok.com/@panbap369"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-tiktok"></i>
            <span>TikTok</span>
          </a>
          <a
            href="https://www.youtube.com/@Panbap369/videos"
            target="_blank"
            rel="noopener noreferrer"
            className="yt"
          >
            <i className="fa-brands fa-youtube" style={{ color: '#ff0000' }}></i>
            <span>YouTube</span>
          </a>
          <button
            type="button"
            className="widget-close-item"
            onClick={() => setIsVisible(false)}
          >
            <i className="fa-solid fa-xmark"></i>
            <span>Tắt nút này</span>
          </button>
        </div>
      )}

      <button
        type="button"
        className="widget-btn"
        onClick={() => {
          setIsMenuOpen((prev) => !prev);
          setShowTooltip(false);
        }}
        aria-label="Liên hệ hỗ trợ"
      >
        <i className="fa-solid fa-headset"></i>
      </button>
    </div>
  );
};
