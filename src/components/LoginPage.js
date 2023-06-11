import "../styles/LoginPage.scss";
import { AiOutlineThunderbolt } from "react-icons/ai";
const LoginPage = () => {
  return (
    <section className="login__container">
      <div className="login__form">
        {/* TODO: Hero text */}
        <div className="login__hero__text">
          <h1>Get started now</h1>
          <AiOutlineThunderbolt className="icon" />
        </div>
        {/* TODO: Form description */}
        <div className="login__form__desc">
          <p>Enter your credential to access your admin account</p>
          <p>Auto register with authorize company</p>
        </div>
        {/* TODO: Option to login with button */}
        <div className="login__form__button">
          <div className="login__google">
            <button>
              <span>
                {" "}
                <img src="/assets/google.png" alt="Features Display" />
              </span>
              <span className="login__btn__text">Company Email</span>
            </button>
          </div>
          <div className="login__apple">
            <button>
              <span>
                {" "}
                <img src="/assets/apple.png" alt="Features Display" />
              </span>
              <span className="login__btn__text">Company ID</span>
            </button>
          </div>
          {/* <p className="or">or</p> */}
        </div>
        {/* TODO: Input that user need to fill */}
        <div className="login__form__input">
          <div className="first__input">
            <input placeholder="Company ID"></input>
            <input placeholder="Company Email"></input>
          </div>
          <div className="second__input">
            <input placeholder="Password"></input>
            <a href="./">Forgot Password?</a>
          </div>
          <button className="login__button">Login</button>
        </div>
      </div>
      <div className="desc__img">
        <img src="/assets/desc.svg" alt="Features Display" />
      </div>
    </section>
  );
};
export default LoginPage;
