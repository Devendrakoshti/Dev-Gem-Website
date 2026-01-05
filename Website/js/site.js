
// On Scroll Modal Popup JS
  let modalOpened = false;

  window.addEventListener('scroll', function () {

    if (window.scrollY > 500 && !modalOpened) {
      modalOpened = true;

      let modal = new bootstrap.Modal(
        document.getElementById('exampleModal')
      );
      modal.show();
    }

  });