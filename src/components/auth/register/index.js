import React from 'react';
import { postRegister } from '../../../api/auth';

const RegisterPage = props => {
  const [isError, setIsError] = React.useState(null);
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    password: '',
  });

  const handleRegister = async () => {
    if (isFormValid()) {
      const registerResponse = await postRegister({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      if (!registerResponse || typeof registerResponse === undefined)
        return setIsError(true);

      loginUser({
        id: registerResponse.user.id,
        email: registerResponse.user.email,
        accessToken: registerResponse.tokens.access.token,
        refreshToken: registerResponse.tokens.refresh.token,
      });

      props.history.push(ROUTE_DASHBOARD);
    }
  };

  const handelFormChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const isFormValid = () => {
    let isValid = true;

    //empty validation
    if (!form.name.length || !form.email.length || !form.password.length) {
      isValid = false;
    }

    //validate password
    if (form.password.length < 8) {
      isValid = false;
    }

    //validate email
    //TODO

    return isValid;
  };

  return (
    <>
      {isError && <p>An error has occurred when trying to register</p>}

      <input
        name="name"
        type={'text'}
        placeholder={'your name'}
        onChange={handelFormChange}
      />

      <input
        name="email"
        type={'email'}
        placeholder={'your email'}
        onChange={handelFormChange}
      />

      <input
        name="password"
        type={'password'}
        placeholder={'your password'}
        onChange={handelFormChange}
      />

      <button onClick={handleRegister}>registrar</button>
    </>
  );
};

export default RegisterPage;
