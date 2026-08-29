/* =====================================================
   SUARA MENU
===================================================== */

let audioContext;


/*
   Membuat suara klik sederhana menggunakan Web Audio API.
   Jadi TIDAK perlu file mp3 tambahan.
*/

function menuSound() {

    try {

        if (!audioContext) {

            audioContext =
                new (
                    window.AudioContext ||
                    window.webkitAudioContext
                )();

        }


        const oscillator =
            audioContext.createOscillator();


        const gain =
            audioContext.createGain();


        oscillator.type = "sine";

        oscillator.frequency.setValueAtTime(
            650,
            audioContext.currentTime
        );


        gain.gain.setValueAtTime(
            0.0001,
            audioContext.currentTime
        );


        gain.gain.exponentialRampToValueAtTime(
            0.08,
            audioContext.currentTime + 0.01
        );


        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            audioContext.currentTime + 0.08
        );


        oscillator.connect(gain);

        gain.connect(audioContext.destination);


        oscillator.start();

        oscillator.stop(
            audioContext.currentTime + 0.08
        );

    }

    catch (error) {

        console.log(
            "Audio tidak tersedia."
        );

    }

}



/* =====================================================
   MENU HP
===================================================== */

function toggleMenu() {

    const navMenu =
        document.getElementById("navMenu");


    navMenu.classList.toggle("active");

}


/* Tutup menu HP setelah memilih menu */

document.querySelectorAll(
    ".nav-menu a"
).forEach(function(link) {

    link.addEventListener(
        "click",
        function() {

            document
                .getElementById("navMenu")
                .classList.remove("active");

        }
    );

});



/* =====================================================
   DATA GALERI
===================================================== */

const galleryData = [

    {
        image: "images/sawah.jpg",

        title: "Hamparan Sawah",

        description:
            "Pemandangan hamparan sawah yang menghiasi lingkungan Desa Seburing Hilir."
    },


    {
        image: "images/cahaya-sore.jpg",

        title: "Cahaya Sore",

        description:
            "Suasana sore dengan cahaya matahari yang terlihat di antara pepohonan."
    },


    {
        image: "images/suasana-desa.jpg",

        title: "Suasana Desa",

        description:
            "Gambaran lingkungan dan suasana pedesaan Seburing Hilir."
    },


    {
        image: "images/pohon-pisang.jpg",

        title: "Tumbuhan Desa",

        description:
            "Salah satu tumbuhan yang tumbuh di lingkungan alami desa."
    },


    {
        image: "images/senja.jpg",

        title: "Senja di Seburing Hilir",

        description:
            "Pemandangan langit senja yang memberikan suasana indah dan tenang."
    }

];


let currentImage = 0;



/* =====================================================
   BUKA GALERI
===================================================== */

function openGallery(index) {

    menuSound();


    currentImage = index;


    updateGallery();


    const modal =
        document.getElementById(
            "galleryModal"
        );


    modal.classList.add("show");


    document.body.style.overflow =
        "hidden";

}



/* =====================================================
   TUTUP GALERI
===================================================== */

function closeGallery() {

    const modal =
        document.getElementById(
            "galleryModal"
        );


    modal.classList.remove("show");


    document.body.style.overflow =
        "auto";

}



/* =====================================================
   UPDATE FOTO
===================================================== */

function updateGallery() {

    const data =
        galleryData[currentImage];


    document.getElementById(
        "modalImage"
    ).src = data.image;


    document.getElementById(
        "modalImage"
    ).alt = data.title;


    document.getElementById(
        "modalTitle"
    ).textContent = data.title;


    document.getElementById(
        "modalDescription"
    ).textContent =
        data.description;


    document.getElementById(
        "modalNumber"
    ).textContent =
        String(
            currentImage + 1
        ).padStart(2, "0");

}



/* =====================================================
   FOTO SEBELUMNYA
===================================================== */

function previousImage() {

    menuSound();


    currentImage--;


    if (currentImage < 0) {

        currentImage =
            galleryData.length - 1;

    }


    updateGallery();

}



/* =====================================================
   FOTO BERIKUTNYA
===================================================== */

function nextImage() {

    menuSound();


    currentImage++;


    if (
        currentImage >=
        galleryData.length
    ) {

        currentImage = 0;

    }


    updateGallery();

}



/* =====================================================
   KLIK DI LUAR FOTO
===================================================== */

document
    .getElementById("galleryModal")
    .addEventListener(
        "click",
        function(event) {

            if (
                event.target === this
            ) {

                closeGallery();

            }

        }
    );



/* =====================================================
   KEYBOARD
===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        const modal =
            document.getElementById(
                "galleryModal"
            );


        if (
            !modal.classList.contains(
                "show"
            )
        ) {

            return;

        }


        if (
            event.key === "Escape"
        ) {

            closeGallery();

        }


        if (
            event.key === "ArrowLeft"
        ) {

            previousImage();

        }


        if (
            event.key === "ArrowRight"
        ) {

            nextImage();

        }

    }
);



/* =====================================================
   TOMBOL KEMBALI KE ATAS
===================================================== */

const topButton =
    document.getElementById(
        "topButton"
    );


window.addEventListener(
    "scroll",
    function() {

        if (
            window.scrollY > 400
        ) {

            topButton.classList.add(
                "show"
            );

        }

        else {

            topButton.classList.remove(
                "show"
            );

        }

    }
);



/* =====================================================
   KEMBALI KE ATAS
===================================================== */

function goTop() {

    menuSound();


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}