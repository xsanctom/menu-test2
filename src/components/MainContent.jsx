import React, { useState } from 'react';
import { useMenu } from '../context/MenuContext';
import MenuTableEnhanced from './MenuTableEnhanced';
import MenuCardGrid from './MenuCardGrid';
import ColumnVisibilityDropdown from './ColumnVisibilityDropdown';
import BulkActionBar from './BulkActionBar';
import FilterPanel from './FilterPanel';
import BulkEditParameterModal from './BulkEditParameterModal';
import BulkEditFormModal from './BulkEditFormModal';

const DEFAULT_VISIBLE_COLUMNS = ['image', 'tagline', 'price', 'status', 'meals', 'days'];

function MainContent({ onEditItem }) {
  const { state, setViewMode, setSearch, deleteMenuItem, setSelectedItems, bulkUpdateMenuItems } = useMenu();
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleColumns, setVisibleColumns] = useState(() => {
    const saved = localStorage.getItem('visibleColumns');
    return saved ? JSON.parse(saved) : DEFAULT_VISIBLE_COLUMNS;
  });
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [isParameterModalOpen, setIsParameterModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedParameter, setSelectedParameter] = useState(null);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setSearch(query);
  };

  const handleToggleColumn = (columnId) => {
    const newVisibleColumns = visibleColumns.includes(columnId)
      ? visibleColumns.filter(id => id !== columnId)
      : [...visibleColumns, columnId];
    setVisibleColumns(newVisibleColumns);
    localStorage.setItem('visibleColumns', JSON.stringify(newVisibleColumns));
  };

  const handleBulkArchive = () => {
    if (window.confirm(`Archive ${state.selectedItems.length} selected item(s)?`)) {
      bulkUpdateMenuItems(state.selectedItems, { status: 'Archived' });
      setSelectedItems([]);
    }
  };

  const handleBulkUnarchive = () => {
    if (window.confirm(`Unarchive ${state.selectedItems.length} selected item(s)?`)) {
      bulkUpdateMenuItems(state.selectedItems, { status: 'Disabled' });
      setSelectedItems([]);
    }
  };

  const isArchivedView = state.filters.status?.includes('Archived');

  const handleBulkEdit = () => {
    setIsParameterModalOpen(true);
  };

  const handleSelectParameter = (parameter) => {
    setSelectedParameter(parameter);
    setIsParameterModalOpen(false);
    setIsFormModalOpen(true);
  };

  const handleBulkSave = (itemIds, updates) => {
    bulkUpdateMenuItems(itemIds, updates);
    setIsFormModalOpen(false);
    setSelectedParameter(null);
    setSelectedItems([]);
  };

  const handleCloseParameterModal = () => {
    setIsParameterModalOpen(false);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setSelectedParameter(null);
  };

  const handleBackToParameterSelection = () => {
    setIsFormModalOpen(false);
    setSelectedParameter(null);
    setIsParameterModalOpen(true);
  };

  const handleClearSelection = () => {
    setSelectedItems([]);
  };

  const getActiveFilterCount = () => {
    return Object.values(state.filters).reduce((total, arr) => total + arr.length, 0);
  };

  return (
    <div className="main-content" style={{ padding: '24px' }}>
      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="filter-left">
          {/* View Toggle */}
          <div className="view-toggle">
            <button
              className={`view-button ${state.viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
              title="Table view"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <button
              className={`view-button ${state.viewMode === 'cards' ? 'active' : ''}`}
              onClick={() => setViewMode('cards')}
              title="Card view"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </button>
          </div>

          {/* Search */}
          <input
            type="text"
            className="search-input"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
          />

          {/* Filter Button */}
          <div className="filter-button-container" style={{ position: 'relative' }}>
            <button 
              className="filter-button"
              onClick={() => setFilterPanelOpen(!filterPanelOpen)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              Filters
              {getActiveFilterCount() > 0 && (
                <span className="filter-indicator">{getActiveFilterCount()}</span>
              )}
            </button>

            <FilterPanel 
              isOpen={filterPanelOpen}
              onClose={() => setFilterPanelOpen(false)}
            />
          </div>
        </div>

        <div className="filter-right">
          {/* Column Visibility Toggle */}
          {state.viewMode === 'table' && (
            <ColumnVisibilityDropdown 
              visibleColumns={visibleColumns}
              onToggleColumn={handleToggleColumn}
            />
          )}
        </div>
      </div>

      {/* Content based on view mode */}
      {state.viewMode === 'table' ? (
        <MenuTableEnhanced onEditItem={onEditItem} visibleColumns={visibleColumns} />
      ) : (
        <MenuCardGrid onEditItem={onEditItem} />
      )}

      {/* Bulk Action Bar */}
      <BulkActionBar
        selectedCount={state.selectedItems.length}
        onBulkEdit={handleBulkEdit}
        onBulkArchive={handleBulkArchive}
        onBulkUnarchive={handleBulkUnarchive}
        isArchivedView={isArchivedView}
        onClearSelection={handleClearSelection}
      />

      {/* Bulk Edit Modals */}
      <BulkEditParameterModal
        isOpen={isParameterModalOpen}
        onClose={handleCloseParameterModal}
        selectedCount={state.selectedItems.length}
        onSelectParameter={handleSelectParameter}
      />

      <BulkEditFormModal
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        onBack={handleBackToParameterSelection}
        selectedParameter={selectedParameter}
        selectedItemIds={state.selectedItems}
        onSave={handleBulkSave}
      />
    </div>
  );
}

export default MainContent;

