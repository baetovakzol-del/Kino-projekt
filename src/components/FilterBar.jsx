import { useState, useEffect } from 'react';
import '../styles/components/FilterBar.scss';

const FilterBar = ({ 
  genres = [], 
  selectedGenre = '', 
  selectedYear = '', 
  selectedRating = '', 
  sortBy = 'popularity.desc',
  onFilterChange, 
  onClearFilters 
}) => {
  // Generate years dynamically
  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= currentYear - 50; i--) {
      years.push(i);
    }
    return years;
  };

  const years = generateYears();

  const hasActiveFilters = selectedGenre || selectedYear || selectedRating;

  const handleFilterChange = (filterType, value) => {
    // Special handling for genre - use '' for "Все жанры"
    if (filterType === 'genre' && value === 'all') {
      value = '';
    }
    
    // Call the parent's filter change handler
    if (onFilterChange) {
      onFilterChange(filterType, value);
    }
  };

  const clearFilters = () => {
    // Call the parent's clear filters handler
    if (onClearFilters) {
      onClearFilters();
    }
  };

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="genre-filter">Жанр</label>
        <select
          id="genre-filter"
          value={selectedGenre || 'all'}
          onChange={(e) => handleFilterChange('genre', e.target.value)}
        >
          <option value="all">Все жанры</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="year-filter">Год</label>
        <select
          id="year-filter"
          value={selectedYear}
          onChange={(e) => handleFilterChange('year', e.target.value)}
        >
          <option value="">Все годы</option>
          {years.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="rating-filter">Рейтинг</label>
        <select
          id="rating-filter"
          value={selectedRating}
          onChange={(e) => handleFilterChange('rating', e.target.value)}
        >
          <option value="">Любой рейтинг</option>
          <option value="9">9+ (Отличные)</option>
          <option value="8">8+ (Очень хорошие)</option>
          <option value="7">7+ (Хорошие)</option>
          <option value="6">6+ (Средние)</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sort-filter">Сортировка</label>
        <select
          id="sort-filter"
          value={sortBy}
          onChange={(e) => handleFilterChange('sort', e.target.value)}
        >
          <option value="popularity.desc">По популярности</option>
          <option value="vote_average.desc">По рейтингу</option>
          <option value="release_date.desc">По дате выхода</option>
        </select>
      </div>

      {hasActiveFilters && (
        <button className="clear-filters-btn" onClick={clearFilters}>
          Очистить фильтры
        </button>
      )}
    </div>
  );
};

export default FilterBar;