// import bcrypt from "bcryptjs";
import { hashFunction } from "../dataStructures/hashTable";

const name = document.getElementById("lo__name");
const password = document.getElementById("lo__pass");

const loginForm = document.querySelector(".login__form");
const { nombre, contraseña } = JSON.parse(localStorage.getItem("user"));

if (loginForm) {
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    // if (
    //   name.value == nombre &&
    //   (await bcrypt.compare(password.value, contraseña))
    // ) {
    console.log(hashFunction.hash(password.value) == contraseña, "login");
    if (
      name.value == nombre &&
      hashFunction.hash(password.value) == contraseña
    ) {
      const user = JSON.parse(localStorage.getItem("user"));
      user.activo = true;
      localStorage.setItem("user", JSON.stringify(user));
      window.setTimeout(() => {
        location.assign("http://localhost:1234/home_page.html");
      }, 1500);
    }
  });
}
