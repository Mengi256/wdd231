


// Hamburger menu toggle
const menuHamburger = document.querySelector("#menu");
const navigation = document.querySelector("#navigation");
const headerNav = document.querySelector(".nav");
const header = document.querySelector(".header");
const nav_para = document.querySelector(".nav-para");
const shebloom_logo = document.querySelector(".shebloom-logo")

if (menuHamburger && navigation && headerNav) {
  menuHamburger.addEventListener("click", function () {
    menuHamburger.classList.toggle("show");
    navigation.classList.toggle("show");
    headerNav.classList.toggle("show");
    header.classList.toggle("show");
    nav_para.classList.toggle("show");
    shebloom_logo.classList.toggle("show")
  });
}







const icon_btn = document.querySelector(".icon");
const problems = document.querySelector(".problems");
const problem_hide = document.querySelector("#problem-hide");

if (problems && problem_hide && icon_btn) {
  problems.addEventListener("click", function (e) {
    e.preventDefault();
    problem_hide.classList.toggle("unhide");
    icon_btn.classList.toggle("rotate");
  });
}


const quick_icon = document.querySelector(".quick-icon");

const links_box = document.querySelector(".links-box");

if (quick_icon && links_box) {
  quick_icon.addEventListener("click", function (e) {
    e.preventDefault();
    links_box.classList.toggle("unhide");
    quick_icon.classList.toggle("rotate");
  });
}

const year = document.querySelector("#year");
if (year) {
  const today = new Date();
  year.textContent = today.getFullYear();
}

const sections = document.querySelectorAll("section");
if (sections.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('scroll');
        observer.unobserve(entry.target); 
      }
    });
  });
  sections.forEach(section => observer.observe(section));
}


// Timestamp for send message form =====
const timestamp = document.getElementById("timestamp");
if (timestamp) {
    timestamp.value = new Date().toISOString();
}


const program_container = document.querySelector("#programs-container");

if (program_container) {
    import("../data/programs.mjs")
        .then(module => {
            module.programs.forEach(program => {
                const program_box = document.createElement("div");
                program_box.classList.add("program-box");
                program_box.innerHTML = `
                    <h2>${program.name}</h2>
                   
                    <img class="program-image" 
                         src="${program.image}" 
                         alt="${program.name}" 
                         loading="lazy"
                         data-name="${program.name}"
                         data-desc="${program.description}">
                `;
                program_container.appendChild(program_box);
            });

            // Modal elements
            const modal = document.querySelector("#image-modal");
            const modalImg = document.querySelector("#modal-img");
            const modalTitle = document.querySelector("#modal-title");
            const modalDesc = document.querySelector("#modal-desc");
            const favoriteIcon = document.querySelector("#favorite-icon");
            const closeModalBtn = document.querySelector("#close-modal");

            // Favorite popup
            const favoritePopup = document.querySelector("#favorite-popup");
            const favoriteMessage = document.querySelector("#favorite-message");
            const donateBtn = document.querySelector("#popup-donate-btn");
            const closePopupBtn = document.querySelector("#close-popup-btn");

            // Add hover event to images
            document.querySelectorAll(".program-image").forEach(img => {
                img.addEventListener("mouseenter", () => {
                    modal.style.display = "flex";
                    modalImg.src = img.src;
                    modalTitle.textContent = img.dataset.name;
                    modalDesc.textContent = img.dataset.desc;
                    favoriteIcon.setAttribute("data-program", img.dataset.name);
                });
            });

           
            closeModalBtn.addEventListener("click", () => {
                modal.style.display = "none";
            });

          
            favoriteIcon.addEventListener("click", () => {
                const chosenProgram = favoriteIcon.getAttribute("data-program");

               
                localStorage.setItem("favoriteProgram", chosenProgram);

                // Show popup
                favoriteMessage.textContent = `Today you chose "${chosenProgram}" as your favorite program. You can donate or close.`;
                favoritePopup.style.display = "flex";
            });

            // Close popup
            closePopupBtn.addEventListener("click", () => {
                favoritePopup.style.display = "none";
            });


            // Donate button
            donateBtn.addEventListener("click", () => {
                window.location.href = "donate.html";
              
            });
        })
        .catch(err => {
            console.error("Programs data load error:", err);
            program_container.innerHTML = "<p>Error loading Program items.</p>";
        });
}


const form = document.querySelector('.footer-form');
const emailInput = form.querySelector('.useremail');
const dialog = document.querySelector('.subscription-dialog');
const dialogMessage = dialog.querySelector('.subscription-message');
const closeDialogBtn = dialog.querySelector('.close-dialog-btn');

// Handle form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    if (!email) {
        alert('Please enter your email!');
        return;
    }

    // Check if user has already subscribed
    if (localStorage.getItem('newsletterEmail')) {
        alert('You have already subscribed!');
        return;
    }

    // Save email and subscription date to localStorage
    const subscriptionDate = new Date().toLocaleString();
    localStorage.setItem('newsletterEmail', email);
    localStorage.setItem('subscriptionDate', subscriptionDate);

    // Show dialog after subscription
    dialogMessage.textContent = `You subscribed on ${subscriptionDate}. Thank you!!`;
    if (typeof dialog.showModal === 'function') {
        dialog.showModal();
    } else {
        alert(`You subscribed on ${subscriptionDate}. Thank you!`);
    }

    form.reset();
});

// Close dialog
closeDialogBtn.addEventListener('click', () => {
    if (typeof dialog.close === 'function') {
        dialog.close();
    }
});
