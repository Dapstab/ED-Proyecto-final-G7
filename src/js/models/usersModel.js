import mongoose from "mongoose";
import crypto from "crypto";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "Todo usuario debe tener un nombre"],
    minlength: [3, "El nombre debe tener mínimo 3 caracteres"],
    maxlength: [20, "El nombre debe tener máximo 20 caracteres"],
    unique: true,
    trim: true,
  },

  correo: {
    type: String,
    required: [true, "Por favor dinos tu correo"],
    validate: [validator.isEmail, "Correo invalido"],
    trim: true,
    unique: true,
    lowercase: true,
  },

  contraseña: {
    type: String,
    select: false,
    required: [true, "Por favor escribe una contraseña"],
    trim: true,
    minlength: [8, "La contraseña debe tener mínimo 8 caracteres"],
  },
  confirmarContraseña: {
    type: String,
    required: [true, "Por favor confirma tu contraseña"],
    validate: {
      validator: function (val) {
        return val === this.contraseña;
      },
      message: "Contraseña invalida",
    },
    trim: true,
  },
  rol: {
    type: String,
    defaul: "usuario",
    enum: ["usuario", "repartidor", "admin"],
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next;
  this.password = await bcrypt.hash(this.password, 10);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

export const User = mongoose.model("User", userSchema);
