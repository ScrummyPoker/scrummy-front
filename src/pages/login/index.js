import React from 'react';
import { Redirect } from 'react-router';
import { postLogIn } from '../../api/auth';
import { ROUTE_AUTH_REGISTER, ROUTE_DASHBOARD } from '../../utils/routes';
import { isLoggedIn, loginUser } from '../../services/auth';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { toast } from 'tailwind-toast';

const LoginPage = props => {
  const [isError, setIsError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(null);
  const [form, setForm] = React.useState({
    email: '',
    password: '',
  });


  React.useEffect(() => {
    if(isError) {
      setIsLoading(false);
      toast().danger('Oops!', 'We could not authenticate your credentials').for(3000).show()
    }
  }, [isError]);

  const handleLogIn = async () => {
    setIsLoading(true);
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
    <div className="grid grid-cols-1 gap-4">
      {isError && <p>An error has occurred when trying to log in</p>}

      <div>
        <Input
          label={'E-mail'}
          name="email"
          type={'email'}
          placeholder={'Ex: johnny@company.com'}
          autoComplete={'off'}
          onChange={handelFormChange}
        />
      </div>

      <div>
        <Input
          label={'Password'}
          name="password"
          type={'password'}
          placeholder={'*******'}
          autoComplete={'off'}
          onChange={handelFormChange}
        />
      </div>

      <Button isLoading={isLoading} onClick={handleLogIn}>Log In</Button>

      <a className="italic text-center" href={ROUTE_AUTH_REGISTER}>I don't have an account yet</a>
    </div>
  );
};

export default LoginPage;
