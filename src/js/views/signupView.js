// import User from "../models/usersModel";

// import fs from "fs";
// import bcrypt from "bcryptjs";
import { hashFunction } from "../dataStructures/hashTable";
import { usersLl } from "../dataStructures/singlyLinkedList";
// import { PQ } from "../dataStructures/priorityQueue";

// const users = JSON.parse(fs.readFileSync(`${__dirname}/../users.json`));

window.addEventListener("load", () => {
  // Que pasa en el caso inicial donde no existe la propiedad activo? (Sale un error, ¿lo puedo ignorar?)
  if (!JSON.parse(localStorage.getItem("user")).activo) return;
  window.setTimeout(() => {
    location.assign("http://localhost:1234/home_page.html");
  }, 1500);
});

const name = document.getElementById("su__name");
const email = document.getElementById("su__email");
const password = document.getElementById("su__pass");
const confirmPassword = document.getElementById("su__confPass");
const signupForm = document.querySelector(".signup__form");

signupForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  if (password.value != confirmPassword.value) return;
  // const hashedPassword = await bcrypt.hash(password.value, 10);
  const hashedPassword = hashFunction.hash(password.value);
  console.log(hashedPassword);
  usersLl.pushBack({
    nombre: name.value,
    correo: email.value,
    contraseña: hashedPassword, // Ya aplicado el hashing
    // pedidos: PQ, // La estructura de datos.
    activo: true,
  });
  localStorage.setItem("user", JSON.stringify(usersLl.head.value));
  window.setTimeout(() => {
    location.assign("http://localhost:1234/home_page.html");
  }, 1500);
});
