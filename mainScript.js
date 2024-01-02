async function initializeUsers(data) {
  try {
    const users = JSON.parse(sessionStorage.getItem("users")) || [];
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    console.log(`users is ${users}`);
    console.log(`current user is ${currentUser}`);
    data.username = currentUser?.username || "";
    data.loggedIn = !!currentUser;
    data.login = function () {
      const user = users.find(
        (user) =>
          user.username === this.username && user.password === this.password
      );
      if (user) {
        this.loggedIn = true;
        this.username = user.username;
        sessionStorage.setItem(
          "currentUser",
          JSON.stringify({ username: this.username })
        );
      } else {
        console.log("Invalid username or password");
      }
    };
    data.createAccount = function () {
      const newUser = {
        username: this.newUsername,
        password: this.newPassword,
      };
      // Check if user already exists
      if (!users.some((user) => user.username === this.newUsername)) {
        users.push(newUser);
        sessionStorage.setItem("users", JSON.stringify(users));
        console.log("Account created successfully");
      } else {
        console.log("Username already exists");
      }
    };
    // Define the logout function
    data.logout = function () {
      this.username = "";
      this.password = "";
      this.newUsername = "";
      this.newPassword = "";
      this.loggedIn = false;
      sessionStorage.removeItem("currentUser");
    };
  } catch (err) {
    throw err;
  }
}
function mainApp() {
  console.log("mainApp accessed");
  // intialize data object
  let data = {
    username: "",
    password: "",
    newUsername: "",
    newPassword: "",
    loggedIn: false,
    login: () => {},
    createAccount: () => {},
    logout: () => {},
  };
  initializeUsers(data).catch((err) => console.error(err));
  console.log(data);
  return data;
}

// document.addEventListener("alpine:init", () => {
//   Alpine.data("mainApp", mainApp);
// });
