import React from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet'
import './style.css';

const BottomDrawer = ({
  open,
  onDismiss,
  children
}) => {

  return (
    <BottomSheet
      open={open}
      snapPoints={({ minHeight }) => minHeight}
      onDismiss={onDismiss}>
      {children}
    </BottomSheet>
  );
}

export default BottomDrawer;