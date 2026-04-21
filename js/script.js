/*  PORTFÓLIO — ALEXANDRE DE CAMPOS*/


// Aguarda o DOM estar totalmente carregado antes de rodar o script.
document.addEventListener('DOMContentLoaded', () => {


    // 1. MENU MOBILE (HAMBURGUER)
    // Abre e fecha o menu em telas pequenas.

    const navToggle = document.getElementById('navToggle');
    const navList = document.getElementById('navList');

    navToggle.addEventListener('click', () => {
        // toggle() adiciona a classe se não existir e remove se existir
        const isOpen = navList.classList.toggle('is-open');
        navToggle.classList.toggle('is-active');
        // Atualiza atributo ARIA para leitores de tela
        navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Ao clicar em qualquer link do menu, fecha o menu mobile.
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('is-open');
            navToggle.classList.remove('is-active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });


    // 2. ALTERNADOR DE TEMA CLARO/ESCURO
    // Salva a preferência no localStorage

    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-toggle__icon');
    const rootEl = document.documentElement; // <html>

    // Descobre o tema inicial:
    // 1º) Busca o salvo no localStorage
    // 2º) Se não tiver, usa a preferência do sistema operacional
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

    applyTheme(initialTheme);

    // Ao clicar no botão, inverte o tema
    themeToggle.addEventListener('click', () => {
        const currentTheme = rootEl.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Aplica o tema escolhido
    function applyTheme(theme) {
        rootEl.setAttribute('data-theme', theme);
        // Troca o ícone: lua no tema claro, sol no tema escuro
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }



    // 3. DESTAQUE DO ITEM DE MENU ATIVO CONFORME SCROLL
    // Usa IntersectionObserver


    const sections = document.querySelectorAll('main section[id]');

    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                const sectionId = entry.target.id;
                const correspondingLink = document.querySelector(
                    `.nav__link[href="#${sectionId}"]`
                );

                if (!correspondingLink) return;

                if (entry.isIntersecting) {
                    // Remove a classe .is-active de TODOS os links...
                    navLinks.forEach(l => l.classList.remove('is-active'));
                    // ...e adiciona apenas no link da seção visível.
                    correspondingLink.classList.add('is-active');
                }
            });
        },
        {
            // O elemento só é considerado "visível" quando sua área
            // cruza a região central da tela (entre 40% e 60%).
            rootMargin: '-40% 0px -40% 0px',
            threshold: 0
        }
    );

    sections.forEach(section => sectionObserver.observe(section));



    // 4. ANIMAÇÃO DE ENTRADA DOS ELEMENTOS (REVEAL)


    // Ativa o modo "reveal" adicionando classe no <body>.
    document.body.classList.add('js-reveal-enabled');

    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');

                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        }
    );

    revealElements.forEach(el => revealObserver.observe(el));



    // 5. VALIDAÇÃO E SIMULAÇÃO DE ENVIO DO FORMULÁRIO


    const form = document.getElementById('contactForm');
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const mensagemInput = document.getElementById('mensagem');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    form.addEventListener('submit', (event) => {

        event.preventDefault();


        clearErrors();

        let isValid = true;

        // Valida campo NOME
        if (nomeInput.value.trim() === '') {
            showError(nomeInput, 'nomeError', 'Por favor, informe seu nome.');
            isValid = false;
        } else if (nomeInput.value.trim().length < 2) {
            showError(nomeInput, 'nomeError', 'Nome muito curto (mínimo 2 caracteres).');
            isValid = false;
        }

        //  Valida campo E-MAIL
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'emailError', 'Por favor, informe seu e-mail.');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            showError(emailInput, 'emailError', 'E-mail em formato inválido (ex: nome@dominio.com).');
            isValid = false;
        }

        //Valida campo MENSAGEM
        if (mensagemInput.value.trim() === '') {
            showError(mensagemInput, 'mensagemError', 'Por favor, escreva sua mensagem.');
            isValid = false;
        } else if (mensagemInput.value.trim().length < 10) {
            showError(mensagemInput, 'mensagemError', 'Mensagem muito curta (mínimo 10 caracteres).');
            isValid = false;
        }

        // Se TODAS as validações passaram, simula o envio
        if (isValid) {
            simulateSubmit();
        }
    });

    // Exibe mensagem de erro abaixo de um campo
    function showError(inputElement, errorElementId, message) {
        const errorElement = document.getElementById(errorElementId);
        errorElement.textContent = message;
        inputElement.parentElement.classList.add('is-invalid');
    }

    // Limpa todas as mensagens de erro da tela
    function clearErrors() {
        document.querySelectorAll('.form-error').forEach(el => {
            el.textContent = '';
        });
        document.querySelectorAll('.form-field').forEach(el => {
            el.classList.remove('is-invalid');
        });
    }


    function simulateSubmit() {
        // Pega o primeiro nome para personalizar a mensagem
        const primeiroNome = nomeInput.value.trim().split(' ')[0];
        document.getElementById('modalName').textContent = primeiroNome;

        openModal();
        form.reset();       // limpa todos os campos
    }


    // 6. MODAL DE CONFIRMAÇÃO


    const modal = document.getElementById('successModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');

    function openModal() {
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');

        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);


    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-open')) {
            closeModal();
        }
    });



    // 7. REMOÇÃO DO ERRO AO DIGITAR


    [nomeInput, emailInput, mensagemInput].forEach(input => {
        input.addEventListener('input', () => {
            const field = input.parentElement;
            const errorSpan = field.querySelector('.form-error');
            if (field.classList.contains('is-invalid')) {
                field.classList.remove('is-invalid');
                errorSpan.textContent = '';
            }
        });
    });


});
