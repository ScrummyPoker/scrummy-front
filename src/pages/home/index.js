import React from 'react';
import IconButton from '../../components/IconButton';
import Button from '../../components/Button';
import DeckCard from '../../components/DeckCard';
import Input from '../../components/Input';
import { BellIcon, ChevronRightIcon } from '@heroicons/react/outline';
import InputWithButton from '../../components/Input/withButton';
import useInput from '../../components/Input/useInput';


const HomePage = props => {
  const test = useInput("");

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

        <InputWithButton
          {...test}
          label={'Test'}
          name="text"
          type={'text'}
          placeholder={'test'}
          autoComplete={'off'}
          buttonDisabled={test.value.length === 0}
          buttonIcon={ChevronRightIcon}
          handleButtonClick={() => console.log("Clicked!")}
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
