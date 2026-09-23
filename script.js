/* ===============================
   GALLERY MODAL
================================ */

function openGalleryImage(imageSrc, imageAlt) {

  const modal = document.getElementById("galleryModal");

  if (!modal) return;

  const image =
    document.getElementById("galleryModalImage");

  const title =
    document.getElementById("galleryModalTitle");

  if (image) {

    image.src = imageSrc;
    image.alt = imageAlt || "";

  }

  if (title) {

    title.textContent = imageAlt || "";

  }

  modal.classList.add("active");

  document.body.style.overflow = "hidden";
}


function closeGalleryImage() {

  const modal =
    document.getElementById("galleryModal");

  if (!modal) return;

  modal.classList.remove("active");

  document.body.style.overflow = "";
}


/* ===============================
   GALLERY CLICK
================================ */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    const galleryImages =
      document.querySelectorAll(
        ".gallery-item img"
      );

    galleryImages.forEach(
      function (image) {

        image.addEventListener(
          "click",
          function () {

            openGalleryImage(
              image.src,
              image.alt
            );

          }
        );

      }
    );


    const modal =
      document.getElementById(
        "galleryModal"
      );


    if (modal) {

      modal.addEventListener(
        "click",
        function (event) {

          if (
            event.target === modal
          ) {

            closeGalleryImage();

          }

        }
      );

    }

  }
);


/* ===============================
   KEYBOARD GALLERY
================================ */

document.addEventListener(
  "keydown",
  function (event) {

    if (event.key === "Escape") {

      closeGalleryImage();

    }

  }
);


/* ===============================
   SCROLL KE ATAS
================================ */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    const button =
      document.createElement(
        "button"
      );


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

        if (window.scrollY > 300) {

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


/* ===============================
   DATABASE GOOGLE SHEET
================================ */

async function loadDatabaseData() {

  const container =
    document.getElementById(
      "databaseData"
    );


  if (!container) return;


  container.innerHTML =
    "Memuat data...";


  try {

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
      "Data dari API:",
      result
    );


    if (
      result.status !==
        "success" ||
      !Array.isArray(
        result.data
      )
    ) {

      throw new Error(
        result.message ||
        "Data tidak valid"
      );

    }


    if (
      result.data.length === 0
    ) {

      container.innerHTML =
        "<p>Belum ada data desa.</p>";

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


        card.innerHTML = `

          <div class="database-image">

            ${
              item.url_gambar
                ? `
                  <img
                    src="${item.url_gambar}"
                    alt="${
                      item.judul ||
                      "Data Desa"
                    }"
                  >
                `
                : ""
            }

          </div>


          <div class="database-content">

            <span class="database-category">
              ${
                item.kategori ||
                ""
              }
            </span>


            <h3>
              ${
                item.judul ||
                ""
              }
            </h3>


            <p>
              ${
                item.deskripsi ||
                ""
              }
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
      "Gagal mengambil data:",
      error
    );


    container.innerHTML = `

      <p>
        Data belum dapat dimuat.
      </p>

    `;

  }

}


/* ===============================
   SARAN & MASUKAN
================================ */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    const form =
      document.getElementById(
        "saranForm"
      );


    if (!form) return;


    form.addEventListener(
      "submit",
      async function (event) {

        event.preventDefault();


        const nama =
          document
            .getElementById(
              "namaSaran"
            )
            .value
            .trim();


        const kategori =
          document
            .getElementById(
              "kategoriSaran"
            )
            .value;


        const pesan =
          document
            .getElementById(
              "pesanSaran"
            )
            .value
            .trim();


        const status =
          document.getElementById(
            "statusSaran"
          );


        if (
          !nama ||
          !kategori ||
          !pesan
        ) {

          status.textContent =
            "Mohon lengkapi semua data.";

          return;

        }


        status.textContent =
          "Mengirim masukan...";


        try {

          /*
             DATA DIKIRIM DALAM FORMAT JSON

             Apps Script kamu membaca:

             JSON.parse(
               e.postData.contents
             )

             Karena itu formatnya
             harus JSON.
          */


          const data = {

            action:
              "addSaran",

            nama:
              nama,

            kategori:
              kategori,

            pesan:
              pesan

          };


          const response =
            await fetch(
              API_URL,
              {

                method: "POST",

                /*
                   text/plain digunakan
                   agar request tidak terkena
                   CORS preflight browser.
                   
                   Isi body tetap JSON.
                */

                headers: {

                  "Content-Type":
                    "text/plain;charset=utf-8"

                },

                body:
                  JSON.stringify(
                    data
                  )

              }
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
            "Hasil kirim saran:",
            result
          );


          if (
            result.status ===
            "success"
          ) {

            status.textContent =
              "Saran dan masukan berhasil dikirim. Terima kasih!";


            form.reset();


          } else {

            status.textContent =
              result.message ||
              "Gagal mengirim masukan.";

          }


        } catch (error) {

          console.error(
            "Kesalahan mengirim saran:",
            error
          );


          status.textContent =
            "Saran gagal dikirim. Silakan coba lagi.";

        }

      }
    );

  }
);


/* ===============================
   JALANKAN DATABASE
================================ */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    loadDatabaseData();

  }
);
