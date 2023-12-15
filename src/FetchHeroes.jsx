import React, { useState, useEffect } from 'react';
import HeroCard from './HeroCard';

const FetchHeroes = () => {
  const [heroData, setHeroData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const response = await fetch('https://api.opendota.com/api/heroStats');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const heroesData = await response.json();
        setHeroData(heroesData);
      } catch (error) {
        console.error('Error fetching heroes:', error.message);
      }
    };

    fetchHeroes();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredHeroes = heroData.filter((hero) =>
    hero.localized_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Hero Cards:</h1>
      <div>
        <input
          type="text"
          placeholder="Search for a hero..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ marginBottom: '10px' }}
        />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filteredHeroes.map((hero, index) => (
          <HeroCard key={index} hero={hero} />
        ))}
      </div>
    </div>
  );
};

export default FetchHeroes;
