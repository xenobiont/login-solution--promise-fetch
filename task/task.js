const form = document.querySelector("#login-form");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const response = fetch("https://danit.com.ua/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      login: this.querySelector('[name="login"]').value,
      password: this.querySelector('[name="password"]').value
    })
  });

  response
    .then(response => {
      if (!response.ok) throw new Error("что-то поломалось");
      return response.json();
    })
    .then(result => {
      console.log(result);
      if (result.status === "Success") {
        this.insertAdjacentHTML("afterend", "<span>Вы авторизированы!</span>");
        localStorage.setItem("token", result.token);
      } else {
        this.insertAdjacentHTML(
          "afterend",
          "<span>Логин или пароль неверные, попробуйте еще раз</span>"
        );
      }
    })
    .catch(error => console.log(error));
});
