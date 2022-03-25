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

const pflio = (function () {
    const dfault = {
        project: 'Website',
        client: 'Envato',
        languages: 'HTML, CSS, Javascript',
        preview: 'www.envato.com',
        link: '#'
    };

    const control = $$('.portfolio__control a');
    const contents = $('.portfolio__items');

    const data = [
        {
            title: 'Mockup Project',
            project: dfault.project,
            client: dfault.client,
            languages: dfault.languages,
            preview: dfault.preview,
            src: './assets/project-1.jpg',
            link: dfault.preview,
            tags: 'mockup'
        },
        {
            title: 'Youtube Project',
            project: dfault.project,
            client: dfault.client,
            languages: dfault.languages,
            preview: dfault.preview,
            src: './assets/project-2.jpg',
            link: dfault.preview,
            tags: 'video'
        },
        {
            title: 'Slider Project',
            project: dfault.project,
            client: dfault.client,
            languages: dfault.languages,
            preview: dfault.preview,
            src: './assets/project-3.jpg',
            link: dfault.preview,
            tags: ''
        },
        {
            title: 'Local Video',
            project: dfault.project,
            client: dfault.client,
            languages: dfault.languages,
            preview: dfault.preview,
            src: './assets/project-4.jpg',
            link: dfault.preview,
            tags: 'logo,video'
        },
        {
            title: 'Sass App',
            project: dfault.project,
            client: dfault.client,
            languages: dfault.languages,
            preview: dfault.preview,
            src: './assets/project-5.jpg',
            link: dfault.preview,
            tags: 'logo'
        },
        {
            title: 'Mockup Project',
            project: dfault.project,
            client: dfault.client,
            languages: dfault.languages,
            preview: dfault.preview,
            src: './assets/project-6.jpg',
            link: dfault.preview,
            tags: 'logo,mockup'
        },
        {
            title: 'Facebook Project',
            project: dfault.project,
            client: dfault.client,
            languages: dfault.languages,
            preview: dfault.preview,
            src: './assets/project-7.jpg',
            link: dfault.preview,
            tags: 'logo'
        },
        {
            title: 'Dribble Project',
            project: dfault.project,
            client: dfault.client,
            languages: dfault.languages,
            preview: dfault.preview,
            src: './assets/project-8.jpg',
            link: dfault.preview,
            tags: 'graphic'
        },
        {
            title: 'Behance Project',
            project: dfault.project,
            client: dfault.client,
            languages: dfault.languages,
            preview: dfault.preview,
            src: './assets/project-9.jpg',
            link: dfault.preview,
            tags: 'graphic,mockup'
        }
    ];

    const figure = $('.portfolio__items figure'),
        popup = $('.popup'),
        close = $('.popup__close'),
        popup__title = $('.popup__title'),
        popup__project = $('.popup__project'),
        popup__client = $('.popup__client'),
        popup__languages = $('.popup__languages'),
        popup__preview = $('.popup__preview'),
        popup__link = $('.popup__link'),
        popup__image = $('.popup__image img');


    const tabCurrent = 'all';
    return {
        findPflio(tab = null) {
            if (tab == 'all')
                return data;
            const result = [];
            data.forEach(d => {
                let tags = d.tags.split(',');
                if (tags.includes(tab)) {
                    result.push(d);
                }
            });
            return result;
        },
        createEl(item) {
            let el = document.createElement('article');
            el.classList.add('portfolio__item');
            el.dataset.portfolio = JSON.stringify(item);
            let figure = document.createElement('figure');
            el.appendChild(figure);
            let img = document.createElement('img');
            img.src = item.src;
            img.alt = item.title;
            figure.appendChild(img);
            let span = document.createElement('span');
            let textspan = document.createTextNode(item.title);
            span.appendChild(textspan);
            figure.appendChild(span);

            return el;
        },
        activeControl(t) {
            control.forEach(ctr => {
                if (ctr.classList.contains('active'))
                    ctr.classList.remove('active');
            });
            t.classList.add('active');
        },
        render(tab) {
            contents.innerHTML = '';
            let items = this.findPflio(tab);
            items.forEach(item => {
                let el = this.createEl(item);
                contents.appendChild(el);
                setTimeout(() => {
                    el.classList.add('show')
                }, 200);
            })
            return true;
        },
        run() {
            let _this = this;
            control.forEach(ctr => {
                ctr.addEventListener('click', function (event) {
                    event.preventDefault();
                    _this.activeControl(this);
                    let tab = this.dataset.tab;
                    _this.render(tab);
                });
            });

            document.addEventListener('click', function (event) {
                event.preventDefault();
                const item = event.target.closest('.portfolio__item');
                if (item) {
                    let portfolio = JSON.parse(item.dataset.portfolio);
                    popup.classList.add('show');
                    popup__title.innerHTML = portfolio.title;

                    popup__project.innerHTML = portfolio.project;
                    popup__client.innerHTML = portfolio.client;
                    popup__languages.innerHTML = portfolio.languages;
                    popup__preview.innerHTML = portfolio.preview;
                    popup__link.href = portfolio.link;
                    popup__image.src = portfolio.src;
                }
                const closeItem = event.target.closest('.popup__close');
                if (closeItem || event.target === popup) {
                    popup.classList.remove('show');
                }
            })

            this.render(tabCurrent);
        }
    }
})();

pflio.run();