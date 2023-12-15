import React from 'react';

const attributeMappings = {
  str: 'Strength',
  int: 'Intelligence',
  agi: 'Agility',
  all: "All"
};

const HeroCard = ({ hero }) => {
  const imageUrl = `https://api.opendota.com${hero.img}`;

  // Function to get the full attribute name
  const getFullAttributeName = (abbreviation) => {
    return attributeMappings[abbreviation.toLowerCase()] || abbreviation;
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: '200px' }}>
      <img src={imageUrl} alt={hero.localized_name} style={{ width: '100%', maxHeight: '150px', objectFit: 'cover' }} />
      <h3>{hero.localized_name}</h3>
      <p>Primary Attribute: {getFullAttributeName(hero.primary_attr)}</p>
      <p>Attack Type: {hero.attack_type}</p>
      <p>Roles: {hero.roles.join(' ')}</p>
    </div>
  );
};

export default HeroCard;
