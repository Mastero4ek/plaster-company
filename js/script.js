window.addEventListener('DOMContentLoaded', () => {

//form-head

const formHead = document.querySelector('.form__elements-head'),
      telselectorHead = formHead.querySelector('input[type="tel-head"]'),
      inputmaskHead = new Inputmask('+7 (999) 999-99-99'),
      body = document.querySelector('body'),
      clientWidth = document.documentElement.clientWidth,//видимая ширина экрана
      innerWidth = window.innerWidth,//полная ширина экрана
      modal = document.querySelector('.modal');

  inputmaskHead.mask(telselectorHead);

  const validationHead = new JustValidate('.form__elements-head');

  validationHead
    .addField('#name-head', [{
      rule: 'minLength',
      value: 2,
      errorMessage: 'Колличество символов меньше 2!',
    },
    {
      rule: 'maxLength',
      value: 30,
      errorMessage: 'Колличество символов больше 30!'
    },
    {
      rule: 'required',
      value: 'true',
      errorMessage: 'Введите имя!'
    }
    ])

    .addField('#telephone-head', [{
      rule: 'required',
      value: 'true',
      errorMessage: 'Введите номер телефона!'
    },
    {
      rule: 'function',
      validator: function () {
        const phone = telselectorHead.inputmask.unmaskedvalue();
        return phone.length === 10;
      },
      errorMessage: 'Введите корректный номер телефона!'
    }
    ]).onSuccess((e) => {
        const sendForm = (data) => {
          return fetch('mail.php', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-type': 'application/json; charset=UTF-8'
            }
          }).then(res => res.json());
        };

        const dataForm = new FormData(e.target);
        const user = {};

        dataForm.forEach((val, key) => {
          user[key] = val;
        });

        sendForm(user).then(data => {
            modal.style.display = 'block';
            body.classList.add('noscroll');
            body.style.paddingRight = innerWidth - clientWidth + 'px';//добавляем padding = ширине вертикального скролла
        });

        e.target.reset();
  });

//reviews-slider

const swiper = new Swiper('.swiper', {

  loop: true,

  navigation: {
    nextEl: '.reviews__swiper-button-next',
    prevEl: '.reviews__swiper-button-prev',
  },
});

//form-footer

const formFooter = document.querySelector('.form__elements-footer'),
      telselectorFooter = formFooter.querySelector('input[type="tel-footer"]'),
      inputmaskFooter = new Inputmask('+7 (999) 999-99-99');

  inputmaskFooter.mask(telselectorFooter);

  const validationFooter = new JustValidate('.form__elements-footer');

  validationFooter
    .addField('#name-footer', [{
      rule: 'minLength',
      value: 2,
      errorMessage: 'Колличество символов меньше 2!',
    },
    {
      rule: 'maxLength',
      value: 30,
      errorMessage: 'Колличество символов больше 30!'
    },
    {
      rule: 'required',
      value: 'true',
      errorMessage: 'Введите имя!'
    }
    ])

    .addField('#telephone-footer', [{
      rule: 'required',
      value: 'true',
      errorMessage: 'Введите номер телефона!'
    },
    {
      rule: 'function',
      validator: function () {
        const phone = telselectorFooter.inputmask.unmaskedvalue();
        return phone.length === 10;
      },
      errorMessage: 'Введите корректный номер телефона!'
    }
    ]).onSuccess((e) => {
        const sendForm = (data) => {
          return fetch('mail.php', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-type': 'application/json; charset=UTF-8'
            }
          }).then(res => res.json());
        };

        const dataForm = new FormData(e.target);
        const user = {};

        dataForm.forEach((val, key) => {
          user[key] = val;
        });

          sendForm(user).then(data => {
            modal.style.display = 'block';
            body.classList.add('noscroll');
            body.style.paddingRight = innerWidth - clientWidth + 'px';//добавляем padding = ширине вертикального скролла
          });

        e.target.reset();
  });

//modal

const modalButton = document.querySelector('.modal__button');

    modalButton.addEventListener('click', () => {
      modal.style.display = 'none';
      body.classList.remove('noscroll');
      body.style.paddingRight = null;//обнуляем padding
    });

    modal.addEventListener('click', (e) => {
      const isModal = e.target.closest('.modal__inner');

      if (!isModal) {
        modal.style.display = 'none';
        body.classList.remove('noscroll');
        body.style.paddingRight = null;//обнуляем padding
      }
    });

});