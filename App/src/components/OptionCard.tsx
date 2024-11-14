import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
import React from 'react';
import { IconType } from 'react-icons';
import { useHistory } from 'react-router-dom';
import '../styles/OptionCard.css';

interface OptionCardProps {
  title: string;
  description: string;
  link: string;
  Icon: IconType;
}

const OptionCard: React.FC<OptionCardProps> = ({ title, description, link, Icon }) => {
  const history = useHistory();
  const navigateTo = () => {
    history.push(link);
  };

  return (
    <IonCard 
      onClick={navigateTo} 
      className="option-card shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
    >
      <IonCardHeader className="flex flex-col justify-center items-center text-center px-4 pt-4 pb-2">
        <div className="text-dark-blue mb-2">
          <Icon size={36} />
        </div>
        <IonCardTitle className="text-xl font-bold text-dark-blue">{title}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent className="flex justify-center items-center text-center px-4 pb-4 text-dark-blue">
        {description}
      </IonCardContent>
    </IonCard>
  );
};

export default OptionCard;