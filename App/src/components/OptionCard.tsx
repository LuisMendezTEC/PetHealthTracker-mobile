// src/components/OptionCard.tsx
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/OptionCard.css';

interface OptionCardProps {
  title: string;
  description: string;
  link: string;
}

const OptionCard: React.FC<OptionCardProps> = ({ title, description, link }) => {
  const history = useHistory();
  const navigateTo = () => {
    history.push(link);
  };

  return (
    <IonCard 
      onClick={navigateTo} 
      className="option-card bg-brown-100 hover:bg-brown-200 text-brown-800 hover:text-brown-900 shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
    >
      <IonCardHeader>
        <IonCardTitle className="text-lg font-semibold">{title}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent className="text-sm">{description}</IonCardContent>
    </IonCard>
  );
};

export default OptionCard;
