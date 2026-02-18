const asideMenuKnop = document.querySelector('.aside-menu-knop');
const aside = document.querySelector('aside');

asideMenuKnop.addEventListener('click', function(){
aside.classList.toggle('active');
})