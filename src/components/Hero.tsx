import React from 'react';

interface HeroProps {
  activeTab: 'web' | 'app';
  onSwitchTab: (tab: 'web' | 'app') => void;
  webCount: number;
  appCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  activeTab,
  onSwitchTab,
  webCount,
  appCount,
}) => {
  return (
    <div className="hero">
      <h1>Chào mừng bạn đến với vũ trụ tình yêu 🤍</h1>
      <p>Web gửi gắm yêu thương và phần mềm tiện ích.</p>

      <div className="tab-nav" role="tablist" aria-label="Lựa chọn loại sản phẩm">
        <button
          className={`tab-btn ${activeTab === 'web' ? 'active' : ''}`}
          type="button"
          role="tab"
          aria-selected={activeTab === 'web'}
          onClick={() => onSwitchTab('web')}
        >
          <i className="fa-solid fa-globe"></i> Web
          <span style={{ fontSize: '0.75rem', opacity: 0.75, marginLeft: '2px' }}>
            ({webCount})
          </span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'app' ? 'active' : ''}`}
          type="button"
          role="tab"
          aria-selected={activeTab === 'app'}
          onClick={() => onSwitchTab('app')}
        >
          <i className="fa-solid fa-mobile-screen-button"></i> App / Game
          <span style={{ fontSize: '0.75rem', opacity: 0.75, marginLeft: '2px' }}>
            ({appCount})
          </span>
        </button>
      </div>
    </div>
  );
};
