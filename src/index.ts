import store from "./store";
import { loginAsync } from "./store/auth-slice";

document.getElementById("app").innerHTML = `
<h1>Redux Toolkit Vanilla Javascript (Typed)</h1>
<div>
  <button id="login-btn">Login</button>
  <div id="message"></div>
</div>
`;

const btn = document.getElementById("login-btn");
const message = document.getElementById("message");

if (btn != null && message != null) {
  const setUiState = (userName: string | null) => {
    if (userName != null) {
      btn.style.display = "none";
      message.style.display = "";
      message.innerHTML = `Hello, ${userName}`;
      return;
    }
    btn.style.display = "";
    message.style.display = "none";
  };

  btn.addEventListener("click", () => {
    store.dispatch(loginAsync());
  });
  store.subscribe(() => {
    const authState = store.getState().auth;
    const userName = authState.isLoggedIn ? authState.userName : null;
    setUiState(userName);
  });
}
