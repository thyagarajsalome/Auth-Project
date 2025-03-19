document.addEventListener("DOMContentLoaded", () => {
  // Handle sign-up form submission
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        });
        const data = await res.json();
        const message = document.getElementById("signupMessage");
        if (res.ok) {
          message.style.color = "green";
          message.textContent = "Sign up successful! Your token: " + data.token;
        } else {
          message.style.color = "red";
          message.textContent = data.msg;
        }
      } catch (error) {
        console.error(error);
      }
    });
  }

  // Handle sign-in form submission
  const signinForm = document.getElementById("signinForm");
  if (signinForm) {
    signinForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("signinEmail").value;
      const password = document.getElementById("signinPassword").value;

      try {
        const res = await fetch("/api/auth/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        const message = document.getElementById("signinMessage");
        if (res.ok) {
          message.style.color = "green";
          message.textContent = "Sign in successful! Your token: " + data.token;
        } else {
          message.style.color = "red";
          message.textContent = data.msg;
        }
      } catch (error) {
        console.error(error);
      }
    });
  }
});
