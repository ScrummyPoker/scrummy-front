import React from 'react';
import IconButton from '../../components/IconButton';
import Button from '../../components/Button';
import DeckCard from '../../components/DeckCard';
import Input from '../../components/Input';
import { BellIcon } from '@heroicons/react/outline';

const HomePage = props => {
  return (
    <div className="home-container">
      <div>
        <Input
          label={'Password'}
          name="password"
          type={'password'}
          placeholder={'*******'}
          autoComplete={'off'}
        />
      </div>
      
      <DeckCard/>
      <Button>Log In</Button>

      <IconButton
        light 
        Icon={BellIcon} />

      <IconButton
        primary 
        Icon={BellIcon} />
        
    </div>
  );
};

export default HomePage;
