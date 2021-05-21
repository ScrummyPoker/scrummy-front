import React from 'react';
import { postRegister } from '../../api/auth';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { ROUTE_AUTH_LOGIN } from '../../utils/routes';

const RegisterPage = props => {
  const [isError, setIsError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(null);
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    password: '',
  });

  React.useEffect(() => {
    if (isError) {
      setIsLoading(false);
      toast()
        .danger('Oops!', 'We could not create your credentials')
        .for(3000)
        .show();
    }
  }, [isError]);

  const handleRegister = async () => {
    setIsLoading(true);
    setIsError(false);

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
        name: registerResponse.user.name,
        accessToken: registerResponse.tokens.access.token,
        refreshToken: registerResponse.tokens.refresh.token,
      });

      props.history.push(ROUTE_DASHBOARD);
    } else {
      setIsError(true);
    }

    setIsLoading(false);
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

  const handleKeyPress = e => e.charCode === 13 && handleLogIn();

  return (
    <>
      {isError && <p>An error has occurred when trying to register</p>}
      <div>
        <Input
          label={'Your name:'}
          name="name"
          type={'text'}
          placeholder={'ex: gabriel toledo'}
          onChange={handelFormChange}
        />
      </div>

      <div>
        <Input
          label={'Your e-mail:'}
          name="email"
          type={'email'}
          placeholder={'ex: fallen@email.com'}
          onChange={handelFormChange}
        />
      </div>
      <div>
        <Input
          label={'Choose a password:'}
          name="password"
          type={'password'}
          placeholder={'*******'}
          onKeyPress={handleKeyPress}
          onChange={handelFormChange}
        />
      </div>

      <Button isLoading={isLoading} onClick={handleRegister}>
        Create account
      </Button>

      <a className="italic text-center text-sm" href={ROUTE_AUTH_LOGIN}>
        I already have an account
      </a>
    </>
  );
};

export default RegisterPage;
