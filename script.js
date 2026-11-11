
/* ==========================================================================
   CYBER-VAMP PORTFOLIO - PROJECT INTERACTIONS
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

    // ELEMENTS
    const projectCards = document.querySelectorAll(".project-screen-card");
    const modal = document.getElementById("projectModal");
    const modalContainer = document.querySelector(".modal-container");
    const closeButton = document.getElementById("modalClose");

    const modalIndex = document.getElementById("modalIndex");
    const modalTitle = document.getElementById("modalTitle");
    const modalSubtitle = document.getElementById("modalSubtitle");
    const modalOverview = document.getElementById("modalOverview");
    const modalProblem = document.getElementById("modalProblem");
    const modalProcess = document.getElementById("modalProcess");
    const modalRole = document.getElementById("modalRole");
    const modalTechnologies = document.getElementById("modalTechnologies");
    const modalProjectLink = document.getElementById("modalProjectLink");

    const galleryImage = document.getElementById("galleryImage");
    const galleryCounter = document.getElementById("galleryCounter");
    const galleryDots = document.getElementById("galleryDots");
    const galleryPrev = document.getElementById("galleryPrev");
    const galleryNext = document.getElementById("galleryNext");

    // CHECK REQUIRED ELEMENTS
    if (
        !modal ||
        !modalContainer ||
        !closeButton ||
        !galleryImage ||
        !galleryCounter ||
        !galleryDots
    ) {
        console.error("Portfolio error: Some modal elements are missing.");
        return;
    }

    let currentProject = null;
    let currentImageIndex = 0;
    let previousFocusedElement = null;

    // ======================================================================
    // PROJECT INFORMATION
    // ======================================================================

    const projects = {

        speedyshop: {
            number: "PROJECT 01",
            title: "SpeedyShop",
           subtitle: "A website designed to connect citizens with agromarkets and make grocery shopping faster and easier.",

           overview:
               "SpeedyShop is a web platform designed to help citizens access agromarkets and shop for groceries more conveniently. The project focuses on providing an accessible and user-friendly experience that makes finding and purchasing products easier.",

            problem:
                "A need website created to help citizens have acess to agromarkets and fast grocerie-shopping.",

            process:
                "I planned the structure and developed the interface using programming concepts learned in class with my group",

            role:
                "I collaborated with my group in planning the website structure and developing its interface. I applied programming concepts learned in class to help create a platform that allows citizens to access agromarkets and shop for groceries more easily.",

            technologies: [
                "HTML5",
                "CSS3",
                "JavaScript",
                "Php"
            ],

            images: [
                "assets/S.png",
                "assets/P.png",
                "assets/h.png"
            ],

            link: "https://speedyshop.infinityfreeapp.com/"
        },

        foodcheck: {
            number: "PROJECT 02",
            title: "FoodCheck ",
            subtitle: "An interactive food recognition tool powered by artificial intelligence.",

            overview:
                "FoodCheck AI is an interactive project that helps users identify different food types and become more aware of healthy eating habits.",

            problem:
                "People may struggle to identify different food types and understand their eating habits. The project aims to make this information more accessible through an interactive tool.",

            process:
                "An AI model was trained using Google Teachable Machine with selected food images. The model was then integrated into the website using TensorFlow.js, HTML, CSS, and JavaScript. Users can upload or scan food images, and the system classifies them as healthy, unhealthy, or not food.",

            role:
                "I researched, selected, and collected food images to build the dataset used to train the AI model in Google Teachable Machine.",

            technologies: [
                "HTML",
                "CSS",
                "JavaScript",
                "TensorFlow.js",
                "Teachable Machine"
            ],

            images: [
                "assets/F.png",
                "assets/c.png",
                "assets/o.png"
            ],

            link: "https://jennifercardoza.github.io/foodcheck-web/"
        },

        retroshot: {
            number: "PROJECT 03",
            title: "RetroShot",
            subtitle: "A creative digital catalog inspired by vintage cameras and visual design.",

            overview:
                "RetroShot is a vintage camera e-commerce concept designed to showcase classic photography products through a creative and visually engaging digital catalog.",

            problem:
                "Vintage camera enthusiasts need attractive and well-organized online spaces where they can explore classic photography products and discover their features.",

            process:
                "The project involved planning the brand concept, creating visual UI/UX layouts, and developing a responsive web platform using frontend technologies. The work was carried out collaboratively by a team of two.",

            role:
                "Collaborated with a teammate in website development, visual design, and the creation of the brand identity.",

            technologies: [
                "HTML5",
                "CSS3",
                "JavaScript"
            ],

            images: [
                "assets/a.png",
                "assets/r.png",
                "assets/m.png"
            ],

            link: "https://jennifercardoza.github.io/Proyecto-RetroShot/"
        }

    };

    // ======================================================================
    // OPEN PROJECT MODAL
    // ======================================================================

    function openProject(projectKey) {

        const project = projects[projectKey];

        if (!project) {
            console.error("Project not found:", projectKey);
            return;
        }

        currentProject = project;
        currentImageIndex = 0;
        previousFocusedElement = document.activeElement;

        modalIndex.textContent = project.number;
        modalTitle.textContent = project.title;
        modalSubtitle.textContent = project.subtitle;

        modalOverview.textContent = project.overview;
        modalProblem.textContent = project.problem;
        modalProcess.textContent = project.process;
        modalRole.textContent = project.role;

        modalProjectLink.href = project.link;

        // TECHNOLOGY TAGS
        modalTechnologies.innerHTML = "";

        project.technologies.forEach(technology => {

            const tag = document.createElement("span");
            tag.textContent = technology;

            modalTechnologies.appendChild(tag);

        });

        // RESET GALLERY
        createGalleryDots();
        showGalleryImage(0);

        // SHOW MODAL
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");

        document.body.classList.add("modal-active");
        document.body.style.overflow = "hidden";

        modalContainer.scrollTop = 0;

        closeButton.focus();
    }

    // ======================================================================
    // CLOSE PROJECT MODAL
    // ======================================================================

    function closeProject() {

        if (!modal.classList.contains("is-open")) return;

        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");

        document.body.classList.remove("modal-active");
        document.body.style.overflow = "";

        currentProject = null;

        if (previousFocusedElement) {
            previousFocusedElement.focus();
        }
    }

    // ======================================================================
    // DISPLAY GALLERY IMAGE
    // ======================================================================

    function showGalleryImage(index) {

        if (!currentProject) return;

        const images = currentProject.images;

        if (!images.length) return;

        currentImageIndex = (index + images.length) % images.length;

        galleryImage.onerror = () => {
            galleryImage.style.display = "none";
            galleryImage.alt = "Screenshot not available. Check the image path and filename.";
            console.error("Image could not be loaded:", images[currentImageIndex]);
        };

        galleryImage.onload = () => {
            galleryImage.style.display = "block";
        };

        galleryImage.style.display = "block";
        galleryImage.src = images[currentImageIndex];

        galleryCounter.textContent =
            `${String(currentImageIndex + 1).padStart(2, "0")} / ${String(images.length).padStart(2, "0")}`;

        updateGalleryDots();
    }

    // ======================================================================
    // CREATE GALLERY DOTS
    // ======================================================================

    function createGalleryDots() {

        galleryDots.innerHTML = "";

        if (!currentProject) return;

        currentProject.images.forEach((image, index) => {

            const dot = document.createElement("button");

            dot.className = "gallery-dot";
            dot.type = "button";

            dot.setAttribute("aria-label", `Show image ${index + 1}`);

            dot.addEventListener("click", () => {
                showGalleryImage(index);
            });

            galleryDots.appendChild(dot);

        });
    }

    // ======================================================================
    // UPDATE ACTIVE DOT
    // ======================================================================

    function updateGalleryDots() {

        const dots = galleryDots.querySelectorAll(".gallery-dot");

        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentImageIndex
            );

        });
    }

    // ======================================================================
    // NEXT AND PREVIOUS IMAGES
    // ======================================================================

    function nextImage() {

        if (!currentProject) return;

        showGalleryImage(currentImageIndex + 1);
    }

    function previousImage() {

        if (!currentProject) return;

        showGalleryImage(currentImageIndex - 1);
    }

    // ======================================================================
    // PROJECT CARD EVENTS
    // ======================================================================

    projectCards.forEach(card => {

        const projectKey = card.dataset.project;

        card.addEventListener("click", () => {
            openProject(projectKey);
        });

        card.addEventListener("keydown", event => {

            if (event.key === "Enter" || event.key === " ") {

                event.preventDefault();
                openProject(projectKey);

            }

        });

    });

    // ======================================================================
    // BUTTON EVENTS
    // ======================================================================

    closeButton.addEventListener("click", closeProject);

    if (galleryNext) {
        galleryNext.addEventListener("click", nextImage);
    }

    if (galleryPrev) {
        galleryPrev.addEventListener("click", previousImage);
    }

    // ======================================================================
    // CLOSE WHEN CLICKING OUTSIDE THE MODAL
    // ======================================================================

    modal.addEventListener("click", event => {

        if (event.target.hasAttribute("data-close-modal")) {
            closeProject();
        }

    });

    // ======================================================================
    // KEYBOARD CONTROLS
    // ======================================================================

    document.addEventListener("keydown", event => {

        if (!modal.classList.contains("is-open")) return;

        if (event.key === "Escape") {
            closeProject();
        }

        if (event.key === "ArrowRight") {
            nextImage();
        }

        if (event.key === "ArrowLeft") {
            previousImage();
        }

    });

});
