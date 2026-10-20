import React, { useState, useRef, useEffect } from 'react';

interface HeaderProps {
  currentCategory: string;
  onSelectCategory: (category: string) => void;
  searchKeyword: string;
  onSearchChange: (keyword: string) => void;
  onOpenDonate: () => void;
}

const CATEGORIES = [
  { id: 'all', label: 'Tất cả', icon: 'fa-solid fa-border-all' },
  { id: 'Trái tim', label: 'Trái tim', icon: 'fa-solid fa-heart', color: 'var(--accent-pink)' },
  { id: 'Tình yêu', label: 'Tình Yêu', icon: 'fa-solid fa-heart', color: 'var(--accent-pink)' },
  { id: 'Cặp đôi', label: 'Cặp đôi', icon: 'fa-solid fa-heart', color: 'var(--accent-pink)' },
  { id: 'Thiệp', label: 'Thiệp', icon: 'fa-solid fa-heart', color: 'var(--accent-pink)' },
  { id: 'Sinh nhật', label: 'Sinh nhật', icon: 'fa-solid fa-heart', color: 'var(--accent-pink)' },
  { id: 'App', label: 'App', icon: 'fa-solid fa-gamepad', color: 'var(--accent-purple)' },
  { id: 'Tool', label: 'Tool', icon: 'fa-solid fa-gamepad', color: 'var(--accent-purple)' },
  { id: 'Game', label: 'Game', icon: 'fa-solid fa-gamepad', color: 'var(--accent-purple)' },
  { id: 'Khác', label: 'Khác', icon: 'fa-solid fa-ellipsis' },
];

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  searchKeyword,
  onSearchChange,
  onOpenDonate,
}) => {
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsExploreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeCategoryObj = CATEGORIES.find(c => c.id === currentCategory) || CATEGORIES[0];

  return (
    <header>
      <div className="header-content">
        <a href="#" className="logo" aria-label="LoveLy trang chủ">
          <img
            src="https://raw.githubusercontent.com/Panbap/anh/refs/heads/main/icon1.png"
            alt="LoveLy Logo"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ec4899"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
            }}
          />
          <span>LoveLy</span>
        </a>

        <div className="header-actions">
          <div className="explore-dropdown-wrapper" ref={dropdownRef}>
            <button
              className="explore-btn"
              type="button"
              onClick={() => setIsExploreOpen((prev) => !prev)}
              aria-expanded={isExploreOpen}
              aria-label="Khám phá danh mục"
            >
              {activeCategoryObj.id === 'all' ? (
                <>
                  <i className="fa-solid fa-compass"></i> Khám phá
                </>
              ) : (
                <>
                  <i
                    className={activeCategoryObj.icon}
                    style={activeCategoryObj.color ? { color: activeCategoryObj.color } : {}}
                  ></i>{' '}
                  {activeCategoryObj.label}
                </>
              )}
              <i className="fa-solid fa-chevron-down" style={{ fontSize: '0.7rem' }}></i>
            </button>

            {isExploreOpen && (
              <div className="explore-menu" role="menu">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    className={`menu-item ${currentCategory === cat.id ? 'active' : ''}`}
                    onClick={() => {
                      onSelectCategory(cat.id);
                      setIsExploreOpen(false);
                    }}
                    role="menuitem"
                  >
                    <i
                      className={cat.icon}
                      style={cat.color ? { color: cat.color } : {}}
                    ></i>
                    {cat.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="search-wrapper">
            <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchKeyword}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Tìm kiếm sản phẩm"
            />
          </div>

          <button
            id="donate-btn"
            className="donate-btn"
            type="button"
            onClick={onOpenDonate}
            aria-label="Ủng hộ tác giả"
          >
            ☕ Ủng hộ
          </button>
        </div>
      </div>
    </header>
  );
};
