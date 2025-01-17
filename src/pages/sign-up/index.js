import { createUser } from '../../services/index.js';
import { navigation } from '../../routes/navigation.js';

export const Register = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
      <div class='tamplete-register'>
        <div class="purple">
          <div class="black"> 
            <div class="orange"></div>
          </div>
        </div>

          <h1 class="title"> The Office Network </h1>

        <div class="img-register">
            <img class="img-logo" src="../../img/fun.png">
        </div>

        <form class= "container-register">
          <div class="inputs-register"> 
            <h1 class ="title-register">Cadastre-se</h1>
            <div class="inputs-name">
              <input class="input-form" id="completeName" ="type="text" placeholder="Nome Completo">
              <input placeholder="Digite seu e-mail" class= "input-form" id="emailRegister" type="email" >
            
              <div class="div-password">
                <input placeholder="Digite uma senha 6 digitos" class='password-register' type="password" >
                <img class='eye-password-register' src="../../img/eye.svg"> </img>
              </div>
              <div class="div-password-repeat">
                <input class="password-repeat" type="password" placeholder="Digite uma senha 6 digitos">
                <img class='eye-password-repeat' src="../../img/eye.svg"> </img>
              </div>
            </div>
            <p class="msg-error"></p>
            <p class="msg-erro-firebase"></p>
                    
            <button class= "btn-register">Cadastrar</button>
            
            <div class="enter-login">
              <p class="page-login">Já tem uma conta? <u class="page-login"> Entre</u> </p>
            </div>
          </div>
        </form>
      </div>
    `;

  const completeName = rootElement.querySelector('#completeName');
  const emailInput = rootElement.querySelector('#emailRegister');
  const passwordInput = rootElement.querySelector('.password-register');
  const viewPassword = rootElement.querySelector('.eye-password-register');
  const passwordRepeat = rootElement.querySelector('.password-repeat');
  const viewPasswordRepeat = rootElement.querySelector('.eye-password-repeat');
  const errorMessage = rootElement.querySelector('.msg-error');
  const erroFirebase = rootElement.querySelector('.msg-erro-firebase');
  const createUserButton = rootElement.querySelector('.btn-register');
  const backToLogin = rootElement.querySelector('.page-login');

  backToLogin.addEventListener('click', () => {
    navigation('/');
  });

  viewPasswordRepeat.addEventListener('click', () => {
    if (passwordRepeat.type === 'password') {
      passwordRepeat.type = 'text';
    } else {
      passwordRepeat.type = 'password';
    }
  });

  viewPassword.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  });

  const errorFunction = (error) => {
    if (error.code === 'auth/uid-already-exists') {
      erroFirebase.innerHTML = 'E-mail já existe';
    } else if (error.code === 'auth/email-already-in-use') {
      erroFirebase.innerHTML = 'E-mail já cadastrado';
    } else if (error.code === 'auth/invalid-email') {
      erroFirebase.innerHTML = 'E-mail invalido';
    } else if (error.code === 'auth/invalid-password') {
      erroFirebase.innerHTML = 'Senha inválida';
    } else {
      erroFirebase.innerHTML = 'Ocorreu algum erro. Tente novamente.';
    }
  };

  createUserButton.addEventListener('click', (e) => {
    e.preventDefault();
    const userName = completeName.value;
    const emailUser = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = passwordRepeat.value;

    if (userName === '' || emailUser === '' || password === '' || confirmPassword === '') {
      errorMessage.innerHTML = 'Todos os campos devem ser preenchidos';
    } else if (password !== confirmPassword) {
      errorMessage.innerHTML = 'As senhas devem ser iguais';
    }

    createUser(userName, emailUser, password, errorFunction).then(() => {
    })
      .catch(() => {
      });
  });
  return rootElement;
};
