// 1. Светлая / тёмная тема (запоминается)
const root = document.documentElement, themeBtn = document.getElementById('themeBtn');
function setTheme(t){ root.dataset.theme = t; themeBtn.textContent = t === 'dark' ? '☀️' : '🌙'; localStorage.setItem('theme', t); }
setTheme(localStorage.getItem('theme') || 'light');
themeBtn.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

// 2. Мобильное меню
const burger = document.getElementById('burger'), nav = document.getElementById('nav');
function toggleMenu(open){ nav.classList.toggle('open', open); burger.setAttribute('aria-expanded', open); }
burger.addEventListener('click', () => toggleMenu(!nav.classList.contains('open')));
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));

// 3. Фильтр карточек
const chips = document.querySelectorAll('.chip'), cards = document.querySelectorAll('.card');
chips.forEach(chip => chip.addEventListener('click', () => {
  chips.forEach(c => c.classList.remove('is-active'));
  chip.classList.add('is-active');
  cards.forEach(card => card.hidden = chip.dataset.filter !== 'all' && card.dataset.cat !== chip.dataset.filter);
}));

// 4. Проверка формы
const rules = {
  name:  v => v.trim().length < 2 ? 'Enter your name (at least 2 characters)' : '',
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'Enter an email like name@mail.com',
  msg:   v => v.trim().length < 10 ? 'Write a message (at least 10 characters)' : ''
};
function check(id){
  const el = document.getElementById(id), msg = rules[id](el.value);
  document.getElementById(id + 'Err').textContent = msg;
  el.classList.toggle('invalid', !!msg);
  return !msg;
}
Object.keys(rules).forEach(id => document.getElementById(id).addEventListener('blur', () => check(id)));
document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  const ok = document.getElementById('ok');
  if (Object.keys(rules).map(check).every(Boolean)) { ok.textContent = 'Thank you! Your message was accepted.'; e.target.reset(); }
  else { ok.textContent = ''; e.target.querySelector('.invalid').focus(); }
});

// 5. Кнопка «Наверх» появляется после прокрутки вниз
const up = document.getElementById('up');
addEventListener('scroll', () => { up.hidden = scrollY < 300; });
