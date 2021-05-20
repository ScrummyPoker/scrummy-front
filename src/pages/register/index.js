import React from 'react';
import { postRegister } from '../../api/auth';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { ROUTE_AUTH_LOGIN } from '../../utils/routes';

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
      <div className="grid grid-cols-1 gap-4">
        <div>
          <Input
            label={"Your name:"}
            name="name"
            type={'text'}
            placeholder={'ex: gabriel toledo'}
            onChange={handelFormChange}
          />
        </div>

        <div>
          <Input
            label={"Your e-mail:"}
            name="email"
            type={'email'}
            placeholder={'ex: fallen@email.com'}
            onChange={handelFormChange}
          />
        </div>
        <div>
          <Input
            label={"Choose a password:"}
            name="password"
            type={'password'}
            placeholder={'*******'}
            onChange={handelFormChange}
          />
        </div>

        <Button onClick={handleRegister}>Create account</Button>

        <a className="italic text-center text-sm" href={ROUTE_AUTH_LOGIN}>
          I already have an account
        </a>

      </div>
    </>
  );
};

export default RegisterPage;
