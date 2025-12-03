import React from 'react';
import PropTypes from 'prop-types';
import { Search } from 'lucide-react';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSearch, onFilter }) => {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchInputWrapper}>
        <Search size={20} className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Pesquisar por título..."
          onChange={(e) => onSearch(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      <select onChange={(e) => onFilter(e.target.value)} className={styles.filterSelect}>
        <option value="">Todas as Áreas</option>
        <option value="Desenvolvedor">Desenvolvedor</option>
        <option value="Engenheiro de Software">Engenheiro de Software</option>
        <option value="UI/UX Designer">UI/UX Designer</option>
        <option value="Analista de Dados">Analista de Dados</option>
        <option value="Marketing">Marketing</option>
      </select>
    </div>
  );
};

export default SearchBar;
