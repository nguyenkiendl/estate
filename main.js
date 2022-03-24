const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

(function () {

    // Nav menu

    const navMenu = $$('.nav__items li a');

    const activeNav = (t) => {
        navMenu.forEach(nav => {
            if (nav && nav.classList.contains('active'))
                nav.classList.remove('active')

            let s = nav.getAttribute('href');
            if ($(s) && $(s).classList.contains('active'))
                $(s).classList.remove('active');


            let c = t.getAttribute('href');
            if ($(c)) {
                $(c).classList.add('active');
                t.classList.add('active');
            }
        })
    }

    navMenu.forEach(nav => {
        nav.addEventListener('click', function (e) {
            e.preventDefault();
            activeNav(this);
        })
    });
})()