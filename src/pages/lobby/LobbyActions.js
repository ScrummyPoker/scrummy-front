import React from 'react';
import Button from '../../components/Button';
import IconButton from '../../components/IconButton';
import { LockClosedIcon, BadgeCheckIcon, TrashIcon, EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import { UserAddIcon } from '@heroicons/react/outline';
import ActionMenu from '../../components/ActionMenu';

const LobbyActions = ({ ...props }) => {
  return (
    <ActionMenu/>
  );
}

export default LobbyActions;