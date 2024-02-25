document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get username and password from the form
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === "admin" && password === "password") {
      // Successfull Login
      // Set current user in localStorage
      localStorage.setItem("currentUser", username);
      window.location.href = "todo.html";
    } else {
      //Failed login
      document.getElementById("errorMessage").innerText =
        "Invalid Username or Password";
    }
  });
