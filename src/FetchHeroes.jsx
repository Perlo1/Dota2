import React, { useState, useEffect } from 'react';
import HeroCard from './HeroCard';

const FetchHeroes = () => {
  const [heroData, setHeroData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedAttackType, setSelectedAttackType] = useState(null);

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

  const handleAttributeFilter = (attribute) => {
    setSelectedAttribute(attribute);
  };

  const handleRoleFilter = (role) => {
    setSelectedRole(role);
  };

  const handleAttackTypeFilter = (attackType) => {
    setSelectedAttackType(attackType);
  };

  const handleResetFilters = () => {
    setSelectedAttribute(null);
    setSelectedRole(null);
    setSelectedAttackType(null);
  };

  const filteredHeroes = heroData.filter((hero) => {
    const nameMatch = hero.localized_name.toLowerCase().includes(searchTerm.toLowerCase());
    const attributeMatch =
      !selectedAttribute || hero.primary_attr.toLowerCase() === selectedAttribute;
    const roleMatch = !selectedRole || hero.roles.includes(selectedRole);
    const attackTypeMatch = !selectedAttackType || hero.attack_type.toLowerCase() === selectedAttackType;

    return nameMatch && attributeMatch && roleMatch && attackTypeMatch;
  });

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
      <div>
        <div>
          <button onClick={() => handleAttributeFilter('str')}>Strength</button>
          <button onClick={() => handleAttributeFilter('int')}>Intelligence</button>
          <button onClick={() => handleAttributeFilter('agi')}>Agility</button>
          <button onClick={() => handleAttributeFilter("all")}>All Attributes</button>
        </div>
        <div>
          <button onClick={() => handleRoleFilter('Carry')}>Carry</button>
          <button onClick={() => handleRoleFilter('Support')}>Support</button>
          <button onClick={() => handleRoleFilter('Escape')}>Escape</button>
          <button onClick={() => handleRoleFilter('Nuker')}>Nuker</button>
          <button onClick={() => handleRoleFilter('Initiator')}>Initiator</button>
          <button onClick={() => handleRoleFilter('Durable')}>Durable</button>
          <button onClick={() => handleRoleFilter('Disabler')}>Disabler</button>
          <button onClick={() => handleRoleFilter('Pusher')}>Pusher</button>
          <button onClick={() => handleRoleFilter(null)}>All Roles</button>
        </div>
        <div>
          <button onClick={() => handleAttackTypeFilter('melee')}>Melee</button>
          <button onClick={() => handleAttackTypeFilter('ranged')}>Ranged</button>
          <button onClick={() => handleAttackTypeFilter(null)}>All Attack Types</button>
        </div>
      </div>
      <div>
        <button onClick={handleResetFilters}>Reset Filters</button>
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
