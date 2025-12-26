
// On Scroll Modal Popup JS
  let modalOpened = false;

  window.addEventListener('scroll', function () {

    if (window.scrollY > 1800 && !modalOpened) {
      modalOpened = true;

      let modal = new bootstrap.Modal(
        document.getElementById('exampleModal')
      );
      modal.show();
    }

  });