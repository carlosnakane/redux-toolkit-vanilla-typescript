class Auth {
  private loggedIn = false;

  public login() {
    this.loggedIn = true;
    return Promise.resolve();
  }

  public isLoggedIn() {
    return this.loggedIn;
  }

  public getUserData() {
    if (this.isLoggedIn()) {
      return "User Name";
    }
  }

  public getAccessToken() {
    return Promise.resolve("abc");
  }
}

export { Auth };
