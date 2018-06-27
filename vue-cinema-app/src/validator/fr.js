export default {
  custom: {
    email: {
      required: "L'email est obligatoire",
      email: "L'email est incorrect"
    },
    username: {
      required: "Entre un pseudo",
    },
    password: {
      required: "Le mot de passe est obligatoire",
      min: "Le mot de passe est trop court",
    },
    password_confirmation: {
      required: "Le mot de passe est obligatoire",
      min: "Le mot de passe est trop court",
      confirmed: "Le mot de passe ne correspond pas"
    },
  }
}
