import React, { useState, useRef, useEffect } from 'react';
import { useMenu } from '../context/MenuContext';
import LivePagesList from './LivePagesList';
import DropdownOption from './DropdownOption';

function PageHeader({ activeTab, setActiveTab, onOpenAddItemsModal, onOpenMenuItemModal, onOpenCategoryModal }) {
  const [newMenuOpen, setNewMenuOpen] = useState(false);
  const newMenuDropdownRef = useRef(null);
  const [livePagesOpen, setLivePagesOpen] = useState(false);
  const livePagesDropdownRef = useRef(null);
  const [importExportOpen, setImportExportOpen] = useState(false);
  const importExportDropdownRef = useRef(null);

  // Handle outside click for new menu dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (newMenuDropdownRef.current && !newMenuDropdownRef.current.contains(event.target)) {
        setNewMenuOpen(false);
      }
    };

    if (newMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [newMenuOpen]);

  // Handle outside click for live pages dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (livePagesDropdownRef.current && !livePagesDropdownRef.current.contains(event.target)) {
        setLivePagesOpen(false);
      }
    };

    if (livePagesOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [livePagesOpen]);

  // Handle outside click for import/export dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (importExportDropdownRef.current && !importExportDropdownRef.current.contains(event.target)) {
        setImportExportOpen(false);
      }
    };

    if (importExportOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [importExportOpen]);

  return (
    <div className="page-header">
      <div className="page-header-content">
        <div className="page-title-section">
          <h1 className="page-title">Menu</h1>
          
          {/* Tabs */}
          <div className="page-tabs">
            <button
              className={`tab-button ${activeTab === 'online' ? 'active' : ''}`}
              onClick={() => setActiveTab('online')}
            >
              Online
            </button>
            <button
              className={`tab-button ${activeTab === 'internal' ? 'active' : ''}`}
              onClick={() => setActiveTab('internal')}
            >
              Internal
            </button>
            <button
              className={`tab-button ${activeTab === 'quantity' ? 'active' : ''}`}
              onClick={() => setActiveTab('quantity')}
            >
              Quantity
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="page-actions">
          {/* Import/Export Dropdown */}
          <div className="import-export-dropdown" ref={importExportDropdownRef}>
            <button
              className="import-export-button"
              onClick={() => setImportExportOpen(!importExportOpen)}
              title="Import/Export"
              aria-label="Import/Export"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v18"></path>
                <path d="M8 7l4-4 4 4"></path>
                <path d="M8 17l4 4 4-4"></path>
              </svg>
            </button>

            {importExportOpen && (
              <div className="import-export-options">
                <button
                  className="import-export-option"
                  onClick={() => {
                    setImportExportOpen(false);
                    // TODO: Implement import functionality
                  }}
                >
                  Import
                </button>
                <button
                  className="import-export-option"
                  onClick={() => {
                    setImportExportOpen(false);
                    // TODO: Implement export as CSV functionality
                  }}
                >
                  Export as CSV
                </button>
                <button
                  className="import-export-option"
                  onClick={() => {
                    setImportExportOpen(false);
                    // TODO: Implement export as Excel functionality
                  }}
                >
                  Export as Excel
                </button>
              </div>
            )}
          </div>
          
          {/* Live Pages Dropdown */}
          <div className="live-pages-dropdown" ref={livePagesDropdownRef}>
            <button
              className="live-pages-button"
              onClick={() => setLivePagesOpen(!livePagesOpen)}
            >
              <svg width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.75 0C7.01942 0 5.32769 0.513179 3.88876 1.47464C2.44983 2.4361 1.32832 3.80267 0.666058 5.40152C0.00379123 7.00037 -0.169488 8.75971 0.168133 10.457C0.505753 12.1544 1.33911 13.7135 2.56282 14.9372C3.78653 16.1609 5.34563 16.9943 7.04296 17.3319C8.7403 17.6695 10.4996 17.4962 12.0985 16.8339C13.6973 16.1717 15.0639 15.0502 16.0254 13.6112C16.9868 12.1723 17.5 10.4806 17.5 8.75C17.5 6.42936 16.5781 4.20376 14.9372 2.56282C13.2962 0.921872 11.0706 0 8.75 0V0ZM16.25 8.125H12.5C12.427 5.82318 11.8307 3.56822 10.7563 1.53125C12.2366 1.93619 13.5571 2.78553 14.5395 3.96464C15.5219 5.14375 16.1189 6.59587 16.25 8.125V8.125ZM8.75 16.25C8.61058 16.2594 8.47068 16.2594 8.33125 16.25C7.03643 14.1851 6.31782 11.8113 6.25 9.375H11.25C11.1878 11.8096 10.4757 14.1832 9.1875 16.25C9.04185 16.2602 8.89566 16.2602 8.75 16.25ZM6.25 8.125C6.31218 5.69042 7.02428 3.31676 8.3125 1.25C8.5908 1.21873 8.87171 1.21873 9.15 1.25C10.4514 3.313 11.1765 5.68691 11.25 8.125H6.25ZM6.725 1.53125C5.65706 3.56978 5.06716 5.82466 5 8.125H1.25C1.38107 6.59587 1.97809 5.14375 2.9605 3.96464C3.94291 2.78553 5.2634 1.93619 6.74375 1.53125H6.725ZM1.28125 9.375H5.03125C5.09648 11.6749 5.68424 13.9297 6.75 15.9687C5.27429 15.5595 3.95924 14.7082 2.9816 13.5295C2.00396 12.3507 1.41059 10.9009 1.28125 9.375V9.375ZM10.7563 15.9687C11.8307 13.9318 12.427 11.6768 12.5 9.375H16.25C16.1189 10.9041 15.5219 12.3562 14.5395 13.5354C13.5571 14.7145 12.2366 15.5638 10.7563 15.9687Z" fill="currentColor"/>
              </svg>
              Live pages
            </button>

            {livePagesOpen && (
              <LivePagesList onClose={() => setLivePagesOpen(false)} />
            )}
          </div>

          {/* New Menu Dropdown */}
          <div className="new-menu-dropdown" ref={newMenuDropdownRef}>
            <button
              className="button primary"
              onClick={() => setNewMenuOpen(!newMenuOpen)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              New
            </button>

            {newMenuOpen && (
              <div className="new-menu-options">
                <DropdownOption
                  icon={
                    <svg width="24" height="24" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g transform="translate(3.15, 3.15) scale(0.7)">
                        <path d="M11.8125 9.1875V0H9.1875V9.1875H0V11.8125H9.1875V21H11.8125V11.8125H21V9.1875H11.8125Z" fill="currentColor"/>
                      </g>
                    </svg>
                  }
                  title="Menu Item"
                  description="Add a new item to your menu"
                  onClick={() => {
                    setNewMenuOpen(false);
                    onOpenMenuItemModal();
                  }}
                />
                
                <DropdownOption
                  icon={
                    <svg width="24" height="24" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g>
                        <path d="M10.5 1.5C15.45 1.5 19.5 5.55 19.5 10.5C19.5 15.45 15.45 19.5 10.5 19.5C5.55 19.5 1.5 15.45 1.5 10.5C1.5 5.55 5.55 1.5 10.5 1.5ZM10.5 0C4.725 0 0 4.725 0 10.5C0 16.275 4.725 21 10.5 21C16.275 21 21 16.275 21 10.5C21 4.725 16.275 0 10.5 0Z" fill="currentColor"/>
                        <path d="M16.5 9.75H11.25V4.5H9.75V9.75H4.5V11.25H9.75V16.5H11.25V11.25H16.5V9.75Z" fill="currentColor"/>
                      </g>
                    </svg>
                  }
                  title="Multiple Menu Items"
                  description="Add up to 60 items at once"
                  onClick={() => {
                    setNewMenuOpen(false);
                    onOpenAddItemsModal();
                  }}
                />
                
                <div className="dropdown-divider"></div>
                
                <DropdownOption
                  icon={
                    <svg width="24" height="24" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g>
                        <path d="M18 3.75H12.75V5.25H18V3.75Z" fill="currentColor"/>
                        <path d="M18 7.5H12.75V9H18V7.5Z" fill="currentColor"/>
                        <path d="M18 11.25H12.75V12.75H18V11.25Z" fill="currentColor"/>
                        <path d="M8.25 3.75H3V5.25H8.25V3.75Z" fill="currentColor"/>
                        <path d="M8.25 7.5H3V9H8.25V7.5Z" fill="currentColor"/>
                        <path d="M8.25 11.25H3V12.75H8.25V11.25Z" fill="currentColor"/>
                        <path d="M19.5 0H1.5C1.1023 0.000397108 0.720997 0.15856 0.439778 0.439779C0.15856 0.720997 0.000397108 1.1023 0 1.5V15C0.000397108 15.3977 0.15856 15.779 0.439778 16.0602C0.720997 16.3414 1.1023 16.4996 1.5 16.5H19.5C19.8977 16.4996 20.279 16.3414 20.5602 16.0602C20.8414 15.779 20.9996 15.3977 21 15V1.5C20.9996 1.1023 20.8414 0.720997 20.5602 0.439779C20.279 0.15856 19.8977 0.000397108 19.5 0ZM1.5 1.5H9.75V15H1.5V1.5ZM11.25 15V1.5H19.5V15H11.25Z" fill="currentColor"/>
                      </g>
                    </svg>
                  }
                  title="Category"
                  description="Add a new category to your menu"
                  onClick={() => {
                    setNewMenuOpen(false);
                    if (onOpenCategoryModal) {
                      onOpenCategoryModal();
                    }
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageHeader;

