// HeroDataProvider.jsx
import React, { useState, useEffect, createContext, useContext } from 'react';

const HeroDataContext = createContext();

const HeroDataProvider = ({ children }) => {
  const [heroData, setHeroData] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchHeroes();
  }, []);

  return (
    <HeroDataContext.Provider value={{ heroData, loading }}>
      {children}
    </HeroDataContext.Provider>
  );
};

const useHeroData = () => {
  const context = useContext(HeroDataContext);
  if (!context) {
    throw new Error('useHeroData must be used within a HeroDataProvider');
  }
  return context;
};

export { HeroDataProvider, useHeroData };
