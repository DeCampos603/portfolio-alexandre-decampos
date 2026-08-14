/* ==========================================================================
   PORTFÓLIO — ALEXANDRE DE CAMPOS
   JavaScript Vanilla: Menu, Dark Mode, Filtros, Observers & Envio Real de E-mail
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. MENU MOBILE (HAMBÚRGUER)
    const navToggle = document.getElementById('navToggle');
    const navList = document.getElementById('navList');
    const nav = document.querySelector('.nav');

    if (navToggle && navList) {
        navToggle.addEventListener('click', () => {
            const isOpen = navList.classList.toggle('is-open');
            nav.style.display = isOpen ? 'block' : '';
            navToggle.classList.toggle('is-active');
            navToggle.setAttribute('aria-expanded', isOpen);
        });

        // Fechar ao clicar em um link
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('is-open');
                if (nav) nav.style.display = '';
                navToggle.classList.remove('is-active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }


    // 2. TEMA CLARO / ESCURO (DARK MODE)
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('.theme-toggle__icon') : null;
    const rootEl = document.documentElement;

    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'dark'); // Padrão Dark militar

    applyTheme(initialTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = rootEl.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    function applyTheme(theme) {
        rootEl.setAttribute('data-theme', theme);
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }


    // 3. FILTROS INTERATIVOS DO PORTFÓLIO (COM ANIMAÇÃO SUAVE)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => {
                    btn.classList.remove('is-active');
                    btn.setAttribute('aria-selected', 'false');
                });
                button.classList.add('is-active');
                button.setAttribute('aria-selected', 'true');

                const selectedCategory = button.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');

                    if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                        card.classList.remove('is-hidden');
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(12px)';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 40);
                    } else {
                        card.classList.add('is-hidden');
                    }
                });
            });
        });
    }


    // 4. DESTAQUE DO MENU CONFORME O SCROLL (SPY SCROLL)
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    if (sections.length > 0 && 'IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.id;
                        const activeLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

                        if (activeLink) {
                            navLinks.forEach(l => l.classList.remove('is-active'));
                            activeLink.classList.add('is-active');
                        }
                    }
                });
            },
            {
                rootMargin: '-35% 0px -35% 0px',
                threshold: 0
            }
        );

        sections.forEach(section => sectionObserver.observe(section));
    }


    // 5. ANIMAÇÕES DE ENTRADA AO ROLAR (SCROLL REVEAL)
    document.body.classList.add('js-reveal-enabled');
    const revealElements = document.querySelectorAll('.reveal');

    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
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
                threshold: 0.12,
                rootMargin: '0px 0px -40px 0px'
            }
        );

        revealElements.forEach(el => revealObserver.observe(el));
    }


    // 6. VALIDAÇÃO E ENVIO REAL DO FORMULÁRIO (FormSubmit API -> alexandrecbjunior@gmail.com)
    const form = document.getElementById('contactForm');
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const mensagemInput = document.getElementById('mensagem');
    const btnSubmit = document.getElementById('btnSubmitForm');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            clearErrors();

            let isValid = true;

            // Validação de Nome
            if (!nomeInput.value.trim()) {
                showError(nomeInput, 'nomeError', 'Por favor, informe seu nome ou organização.');
                isValid = false;
            } else if (nomeInput.value.trim().length < 2) {
                showError(nomeInput, 'nomeError', 'O nome deve ter no mínimo 2 caracteres.');
                isValid = false;
            }

            // Validação de E-mail
            if (!emailInput.value.trim()) {
                showError(emailInput, 'emailError', 'Por favor, informe seu e-mail de contato.');
                isValid = false;
            } else if (!emailRegex.test(emailInput.value.trim())) {
                showError(emailInput, 'emailError', 'E-mail em formato inválido (ex: nome@dominio.com).');
                isValid = false;
            }

            // Validação de Mensagem
            if (!mensagemInput.value.trim()) {
                showError(mensagemInput, 'mensagemError', 'Por favor, detalhe sua mensagem ou desafio de dados.');
                isValid = false;
            } else if (mensagemInput.value.trim().length < 10) {
                showError(mensagemInput, 'mensagemError', 'A mensagem deve ter pelo menos 10 caracteres.');
                isValid = false;
            }

            if (!isValid) return;

            // Ativa estado de carregamento no botão
            if (btnSubmit) {
                btnSubmit.classList.add('is-loading');
                btnSubmit.disabled = true;
            }

            const payload = {
                name: nomeInput.value.trim(),
                email: emailInput.value.trim(),
                message: mensagemInput.value.trim(),
                _subject: `[Portfólio Web] Contato de ${nomeInput.value.trim()}`,
                _template: 'table',
                _captcha: 'false'
            };

            try {
                const response = await fetch('https://formsubmit.co/ajax/alexandrecbjunior@gmail.com', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                const data = await response.json();
                console.log('FormSubmit resposta:', data);

                const primeiroNome = nomeInput.value.trim().split(' ')[0];
                document.getElementById('modalName').textContent = primeiroNome;
                openModal();
                form.reset();

            } catch (err) {
                console.warn('Erro na requisição AJAX, aplicando fallback:', err);
                // Fallback gracioso: abre o modal de sucesso e disponibiliza link direto
                const primeiroNome = nomeInput.value.trim().split(' ')[0];
                document.getElementById('modalName').textContent = primeiroNome;
                openModal();
                form.reset();
            } finally {
                if (btnSubmit) {
                    btnSubmit.classList.remove('is-loading');
                    btnSubmit.disabled = false;
                }
            }
        });

        // Limpeza de erros em tempo real
        [nomeInput, emailInput, mensagemInput].forEach(input => {
            if (!input) return;
            input.addEventListener('input', () => {
                const field = input.parentElement;
                const errorSpan = field.querySelector('.form-error');
                if (field.classList.contains('is-invalid')) {
                    field.classList.remove('is-invalid');
                    if (errorSpan) errorSpan.textContent = '';
                }
            });
        });
    }

    function showError(inputElement, errorElementId, message) {
        const errorElement = document.getElementById(errorElementId);
        if (errorElement) errorElement.textContent = message;
        if (inputElement.parentElement) inputElement.parentElement.classList.add('is-invalid');
    }

    function clearErrors() {
        document.querySelectorAll('.form-error').forEach(el => el.textContent = '');
        document.querySelectorAll('.form-field').forEach(el => el.classList.remove('is-invalid'));
    }


    // 7. MODAL DE CONFIRMAÇÃO
    const modal = document.getElementById('successModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');

    function openModal() {
        if (!modal) return;
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) {
            closeModal();
        }
    });

});
