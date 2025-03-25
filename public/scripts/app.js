/**
 * App client behavior
 */

const app = {
  init: async () => {
    const btnLogout = document.querySelector("#btnLogout");

    // get buttons from DOM
    btnLogout.addEventListener("click", app.onBtnLogoutClick);
  },

  onBtnLogoutClick: async () => {
    // execute logout and get response
    const response = await fetch("/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    // if we need a redirect, execute this
    if (response.redirected) window.location.replace(response.url);
  },
};

// init the application
app.init().then(() => {
  console.log("Application is up & running!");
});
