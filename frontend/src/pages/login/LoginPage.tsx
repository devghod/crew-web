import React from "react";
import LoginForm from "../../features/Login/LoginForm";
import RegisterForm from "../../features/Login/RegisterForm";

export type LoginPage = {};

const LoginPage: React.FC<LoginPage> = (props) => {

  const [ loading, setLoading ] = React.useState(false);
  const [ credentials, setCredentials ] = React.useState({ username: '', password: '' });
  const [ temp, setTemp ] = React.useState({
    name: "Crew",
    logo: "../../../public/crew-logo.png",
  });
  const [ formType, setFormType ] = React.useState("login"); // login or register

  const submit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };

  const handleFormType = () => {
    if (formType === 'login') {
      setFormType('register');
    } else {
      setFormType('login');
    };
  };
  
  return (
    <div className="w-full h-screen grid md:grid-cols-4 content-center">
      <div className="md:col-start-2 md:col-span-2">
        <div className="max-w-96 rounded-lg text-slate-500 mx-auto md:divide-y md:border">
          <div className="">
            <div className="px-4 py-6 text-center">
              <img src={temp.logo} alt={temp.name} className="w-24 mx-auto" />
              <div className="text-xs capitalize">
                {formType}
              </div>            
            </div>
          </div>
          <div className="">
            {formType === 'login' && (
              <LoginForm 
                isLoading={loading} 
                handleFormType={handleFormType}
                submit={submit}
                formType={formType}
              />
            )}
            {formType === 'register' && (
              <RegisterForm 
                isLoading={loading} 
                handleFormType={handleFormType}
                submit={submit}
                formType={formType}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
};

export default LoginPage;
