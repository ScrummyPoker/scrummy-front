import React from 'react';
import { Redirect } from 'react-router';
import { postLogIn } from '../../../api/auth';
import { ROUTE_DASHBOARD } from '../../../utils/routes';
import { isLoggedIn, loginUser } from '../../../services/auth';

const LoginPage = props => {
  const [isError, setIsError] = React.useState(null);
  const [form, setForm] = React.useState({
    email: '',
    password: '',
  });

  const handleLogIn = async () => {
    setIsError(false);

    if (isFormValid()) {
      const logInResponse = await postLogIn({
        email: form.email,
        password: form.password,
      });

      if (!logInResponse || typeof logInResponse === undefined)
        return setIsError(true);

      loginUser({
        id: logInResponse.user.id,
        email: logInResponse.user.email,
        accessToken: logInResponse.tokens.access.token,
        refreshToken: logInResponse.tokens.refresh.token,
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
    if (!form.email.length || !form.password.length) {
      isValid = false;
    }

    return isValid;
  };

  return (
    <>
      {isError && <p>An error has occurred when trying to log in</p>}

      <input
        name="email"
        type={'email'}
        placeholder={'your email'}
        autoComplete={'off'}
        onChange={handelFormChange}
      />

      <input
        name="password"
        type={'password'}
        placeholder={'your password'}
        autoComplete={'off'}
        onChange={handelFormChange}
      />

      <button onClick={handleLogIn}>Log In</button>
    </>
  );
};

export default LoginPage;
