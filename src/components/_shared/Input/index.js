import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { IconBaseProps } from 'react-icons/lib';
import { useField } from '@unform/core';
import { Container } from './styles';

const Input = ({ name, icon: Icon, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  const inputRef = useRef < HTMLInputElement > (null);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);
  return (
    <Container isErrored={!!error} isFocused={isFocused} isFilled={isFilled}>
      <div>{Icon && <Icon size={20} />}</div>
      <input
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        ref={inputRef}
        defaultValue={defaultValue}
        type="text"
        {...rest}
      />
    </Container>
  );
};

export default Input;
