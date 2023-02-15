import throttle from 'lodash.throttle';

// инициализация элементов формы
const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input'),
  message: document.querySelector('textarea'),
};
// ключ хранилища, переменная для элементов формы
const STORAGE_KEY = 'feedback-form-state';
const formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

// Проверка состояния хранилища
getFormOutput();

// отслеживание события input і submit импользуя throttle с задержкой 500ms
refs.form.addEventListener('input', throttle(onSaveInput, 500));
refs.form.addEventListener('submit', onSubmitForm);

// функция события submit
function onSubmitForm(e) {
  if (formData.email && formData.message) {
    e.preventDefault();
    e.currentTarget.reset();
    console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
    localStorage.removeItem(STORAGE_KEY);
    formData = {};
  } else {
    alert('Заполните все поля, пожалуйста!');
  }
}

// функция события input
function onSaveInput(e) {
  const userMessage = e.target.value;
  const userEmail = e.target.name;
  formData[userEmail] = userMessage;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}
// функция проверки состояния хранилища
// если есть сохраненные данные, заполняются ими поля формы. в противном случае - поля пустые
function getFormOutput() {
  const savedFormData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedFormData) {
    refs.email.value = savedFormData.email || '';
    refs.message.value = savedFormData.message || '';
  }
}
