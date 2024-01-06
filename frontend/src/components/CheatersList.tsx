import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';

interface CheaterProps {
    id: number;
    game: string;
    profile: string;
    esp_hacks: boolean;
    aimbot_hacks: boolean;
    crit_hacks?: boolean;
    has_microphone: boolean;
    in_party: boolean;
    notes?: string;
}

const CheatersList: React.FC = () => {
    const [cheaters, setCheaters] = useState<CheaterProps[]>([]);
  
    useEffect(() => {
      axios.get('http://localhost:5000/cheaters')
        .then(response => {
          setCheaters(response.data);
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    }, []);
  
    return (
      <div>
        {/* Render your cheaters list here */}
        <p>cheater list here</p>
      </div>
    );
  };
  
  export default CheatersList;