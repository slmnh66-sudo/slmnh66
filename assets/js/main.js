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

/*==================== WORK FILTER & SUB-FILTER ====================*/
const workItems = document.querySelectorAll('.work__item');
const filterButtons = document.querySelectorAll('.work__filter');
const subfilterContainer = document.getElementById('subfilter-wedding');
const subfilterButtons = document.querySelectorAll('.work__subfilter');

// Main Category Filter
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active-filter'));
        btn.classList.add('active-filter');

        const filterValue = btn.getAttribute('data-filter');

        if(filterValue === 'photography') {
            subfilterContainer.style.display = 'flex';
            subfilterButtons.forEach(b => b.classList.remove('active-subfilter'));
            document.querySelector('.work__subfilter[data-subfilter="all"]').classList.add('active-subfilter');
        } else {
            subfilterContainer.style.display = 'none';
        }

        workItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if(filterValue === 'all' || category === filterValue) {
                item.classList.remove('hide');
            } else {
                item.classList.add('hide');
            }
        });
    });
});

// Sub-Category Filter (only for Photography)
subfilterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        subfilterButtons.forEach(b => b.classList.remove('active-subfilter'));
        btn.classList.add('active-subfilter');

        const subfilterValue = btn.getAttribute('data-subfilter');

        workItems.forEach(item => {
            const category = item.getAttribute('data-category');
            const subcategory = item.getAttribute('data-subcategory');

            if(category === 'photography') {
                if(subfilterValue === 'all' || subcategory === subfilterValue) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            }
        });
    });
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

/*==================== SEND TO GMAIL VIA MAILTO ====================*/
function sendToGmail(event) {
    event.preventDefault(); // Mencegah halaman reload

    // Ambil nilai dari input form
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;

    // Validasi sederhana (jika kosong tidak akan dikirim)
    if (!name || !email || !message) {
        alert("Harap isi semua kolom (Nama, Email, dan Pesan)!");
        return;
    }

    // Susun body email (gunakan encodeURIComponent untuk karakter spesial)
    const subject = encodeURIComponent("Portfolio Contact dari " + name);
    const body = encodeURIComponent(
        "Halo Salman,\n\n" +
        "Saya menghubungi Anda melalui portofolio Anda.\n\n" +
        "Nama Pengirim: " + name + "\n" +
        "Email Pengirim: " + email + "\n\n" +
        "Pesan:\n" + message + "\n\n" +
        "Terima kasih."
    );

    // Buat URL mailto lengkap
    const mailtoLink = `mailto:slmnh66@gmail.com?subject=${subject}&body=${body}`;

    // Arahkan ke Gmail
    window.location.href = mailtoLink;
}
