
const LoginPage = () => {
  return (
    <div className="login__container">
      <h1>Get started now</h1>
      <div>
        <p>Enter your credential to access your admin account</p>
        <p>Auto register with authorize company ID</p>
      </div>
      <div>
        <button>Company Email</button>
        <button>Company ID</button>
      </div>
      <div>
        <input></input>
        <input></input>
        <a href="./">Forgot Password</a>       
        <input></input>
        <button>Login</button>
        <img src="/assets/desc.svg" alt="Features Display"/>
      </div>
    </div>
  );
};
export default LoginPage;
