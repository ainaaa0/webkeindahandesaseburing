/* =====================================================
   WEBSITE DESA SEBURING HILIR
   JAVASCRIPT
===================================================== */


/* =====================================================
   MENU MOBILE
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const navbar =
        document.querySelector(".navbar");

    const header =
        document.querySelector(".header");


    if (navbar && header) {

        let menuButton =
            document.querySelector(".menu-toggle");


        if (!menuButton) {

            menuButton =
                document.createElement("button");

            menuButton.className =
                "menu-toggle";

            menuButton.innerHTML = "☰";

            menuButton.setAttribute(
                "aria-label",
                "Buka menu"
            );


            header.insertBefore(
                menuButton,
                navbar
            );


            menuButton.addEventListener(
                "click",
                function () {

                    navbar.classList.toggle(
                        "show"
                    );

                }
            );

        }


        const links =
            navbar.querySelectorAll("a");


        links.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    navbar.classList.remove(
                        "show"
                    );

                }
            );

        });

    }

});


/* =====================================================
   GALERI DATA
===================================================== */

const galleryData = [

    {
        image: "sawah.jpg",
        title: "Hamparan Sawah",
        description:
            "Pemandangan hamparan sawah di Desa Seburing Hilir."
    },

    {
        image: "cahaya-sore.jpg",
        title: "Cahaya Sore",
        description:
            "Suasana sore dengan cahaya matahari di desa."
    },

    {
        image: "suasana-desa.jpg",
        title: "Suasana Desa",
        description:
            "Suasana lingkungan pedesaan Desa Seburing Hilir."
    },

    {
        image: "pohon-pisang.jpg",
        title: "Pohon Pisang",
        description:
            "Tumbuhan hijau yang dapat ditemukan di lingkungan desa."
    },

    {
        image: "senja.jpg",
        title: "Pemandangan Senja",
        description:
            "Keindahan langit sore di Desa Seburing Hilir."
    }

];


/* =====================================================
   GALERI
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const gallery =
        document.querySelector(
            ".gallery-container"
        );


    if (!gallery) return;


    const images =
        gallery.querySelectorAll("img");


    images.forEach(function (image) {

        image.style.cursor = "pointer";


        image.addEventListener(
            "click",
            function () {

                openGalleryImage(
                    image.src,
                    image.alt
                );

            }
        );

    });

});


function openGalleryImage(
    imageSrc,
    imageAlt
) {

    let modal =
        document.getElementById(
            "galleryModal"
        );


    if (!modal) {

        modal =
            document.createElement("div");

        modal.id =
            "galleryModal";

        modal.innerHTML = `

            <div class="gallery-modal-content">

                <button
                    class="gallery-modal-close"
                    id="galleryModalClose"
                >
                    ×
                </button>

                <img
                    id="galleryModalImage"
                    src=""
                    alt=""
                >

                <h3 id="galleryModalTitle"></h3>

            </div>

        `;


        document.body.appendChild(modal);


        document
            .getElementById(
                "galleryModalClose"
            )
            .addEventListener(
                "click",
                closeGalleryImage
            );


        modal.addEventListener(
            "click",
            function (event) {

                if (event.target === modal) {

                    closeGalleryImage();

                }

            }
        );

    }


    document
        .getElementById(
            "galleryModalImage"
        )
        .src = imageSrc;


    document
        .getElementById(
            "galleryModalImage"
        )
        .alt = imageAlt;


    document
        .getElementById(
            "galleryModalTitle"
        )
        .textContent = imageAlt;


    modal.classList.add("active");

    document.body.style.overflow =
        "hidden";

}


function closeGalleryImage() {

    const modal =
        document.getElementById(
            "galleryModal"
        );


    if (!modal) return;


    modal.classList.remove("active");

    document.body.style.overflow =
        "";

}


/* =====================================================
   KEYBOARD GALERI
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeGalleryImage();

        }

    }
);


/* =====================================================
   SCROLL KE ATAS
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const button =
            document.createElement("button");


        button.innerHTML = "↑";

        button.id =
            "scrollTopButton";

        button.setAttribute(
            "aria-label",
            "Kembali ke atas"
        );


        document.body.appendChild(
            button
        );


        window.addEventListener(
            "scroll",
            function () {

                if (
                    window.scrollY > 300
                ) {

                    button.classList.add(
                        "show"
                    );

                } else {

                    button.classList.remove(
                        "show"
                    );

                }

            }
        );


        button.addEventListener(
            "click",
            function () {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }
);


/* =====================================================
   DATABASE GOOGLE SHEETS
===================================================== */

async function loadDatabaseData() {

    const container =
        document.getElementById(
            "databaseData"
        );


    if (!container) return;


    container.innerHTML =
        "<p>Memuat data...</p>";


    try {

        /*
         * Kita menggunakan GET.
         * Ini lebih sederhana untuk website
         * yang di-host di GitHub Pages.
         */

        const response =
            await fetch(
                API_URL +
                "?action=getData"
            );


        if (!response.ok) {

            throw new Error(
                "HTTP error " +
                response.status
            );

        }


        const result =
            await response.json();


        console.log(
            "Hasil database:",
            result
        );


        if (
            result.status !==
            "success"
        ) {

            container.innerHTML =
                `
                <p>
                    Gagal mengambil data:
                    ${escapeDatabaseHTML(
                        result.message ||
                        "Kesalahan API"
                    )}
                </p>
                `;

            return;

        }


        if (
            !result.data ||
            result.data.length === 0
        ) {

            container.innerHTML =
                "<p>Belum ada data.</p>";

            return;

        }


        container.innerHTML = "";


        result.data.forEach(
            function (item) {

                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "database-card";


                const imageHTML =
                    item.gambar
                    ?
                    `
                    <img
                        src="${escapeDatabaseHTML(
                            item.gambar
                        )}"
                        alt="${escapeDatabaseHTML(
                            item.judul
                        )}"
                    >
                    `
                    :
                    "";


                card.innerHTML = `

                    ${imageHTML}

                    <div class="database-card-content">

                        <small>
                            ${escapeDatabaseHTML(
                                item.kategori
                            )}
                        </small>

                        <h3>
                            ${escapeDatabaseHTML(
                                item.judul
                            )}
                        </h3>

                        <p>
                            ${escapeDatabaseHTML(
                                item.deskripsi
                            )}
                        </p>

                    </div>

                `;


                container.appendChild(
                    card
                );

            }
        );


    } catch (error) {

        console.error(
            "Kesalahan database:",
            error
        );


        container.innerHTML = `

            <p>
                Database tidak dapat diakses.
            </p>

        `;

    }

}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeDatabaseHTML(
    value
) {

    return String(
        value ?? ""
    )

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/* =====================================================
   LOAD DATABASE SAAT HALAMAN DIBUKA
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadDatabaseData();

    }
);
