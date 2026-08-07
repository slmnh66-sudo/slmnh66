/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)
    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')
function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')
const scrollActive = () =>{
    const scrollDown = window.scrollY
    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== ROUTING: BUKA KATEGORI WORK ====================*/
function openCategory(category) {
    // Sembunyikan semua section
    document.querySelectorAll('.home, .about, .skills, #work, #contact, #page-photography, #page-design, #page-video, #page-web').forEach(el => {
        el.style.display = 'none';
    });

    // Tampilkan halaman kategori yang dipilih
    document.getElementById('page-' + category).style.display = 'block';

    // Scroll ke atas halaman
    window.scrollTo(0, 0);

    // Update URL di browser (agar bisa back)
    history.pushState({page: category}, '', '#' + category);
}

/*==================== ROUTING: KEMBALI KE WORK ====================*/
function goWork() {
    // Sembunyikan semua halaman kategori
    document.getElementById('page-photography').style.display = 'none';
    document.getElementById('page-design').style.display = 'none';
    document.getElementById('page-video').style.display = 'none';
    document.getElementById('page-web').style.display = 'none';

    // Tampilkan section Work utama
    document.getElementById('work').style.display = 'block';
    document.querySelector('.home').style.display = 'block';
    document.querySelector('.about').style.display = 'block';
    document.querySelector('.skills').style.display = 'block';
    document.getElementById('contact').style.display = 'block';

    // Scroll ke Work
    document.getElementById('work').scrollIntoView();

    // Update URL
    history.pushState({page: 'work'}, '', '#work');
}

/*==================== ROUTING: KEMBALI KE HOME ====================*/
function goHome() {
    // Tampilkan semua section utama
    document.querySelector('.home').style.display = 'block';
    document.querySelector('.about').style.display = 'block';
    document.querySelector('.skills').style.display = 'block';
    document.getElementById('work').style.display = 'block';
    document.getElementById('contact').style.display = 'block';

    // Sembunyikan halaman kategori
    document.getElementById('page-photography').style.display = 'none';
    document.getElementById('page-design').style.display = 'none';
    document.getElementById('page-video').style.display = 'none';
    document.getElementById('page-web').style.display = 'none';

    // Scroll ke Home
    document.getElementById('home').scrollIntoView();

    // Update URL
    history.pushState({page: 'home'}, '', '#home');
}

/*==================== HANDLE BACK BUTTON BROWSER ====================*/
window.addEventListener('popstate', (event) => {
    if (event.state) {
        const page = event.state.page;
        if (page === 'home') goHome();
        else if (page === 'work') goWork();
        else if (['photography', 'design', 'video', 'web'].includes(page)) {
            openCategory(page);
        }
    }
});

/*==================== SCROLL REVEAL ANIMATION ====================*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__item, .contact__input',{interval: 200});

/*==================== SEND TO GMAIL VIA WEB (TAB BARU) ====================*/
function sendToGmail(event) {
    event.preventDefault();

    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;

    if (!name || !email || !message) {
        alert("Harap isi semua kolom (Nama, Email, dan Pesan)!");
        return;
    }

    const subject = encodeURIComponent("Portfolio Contact dari " + name);
    const body = encodeURIComponent(
        "Halo Salman,\n\n" +
        "Saya menghubungi Anda melalui portofolio Anda.\n\n" +
        "Nama Pengirim: " + name + "\n" +
        "Email Pengirim: " + email + "\n\n" +
        "Pesan:\n" + message + "\n\n" +
        "Terima kasih."
    );

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=slmnh66@gmail.com&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');
}
