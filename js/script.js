window.addEventListener('DOMContentLoaded', () => {


  //Timer
  function countTimer(deadline) {
    const timerHours = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds');

    function getTimeRemaining() {
      const dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60);
      return { dateStop, timeRemaining, hours, minutes, seconds };
    }

    function updateClock() {
      const timer = getTimeRemaining();

      if (timer.timeRemaining < 0) {
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
        clearInterval(1);
      } else {
        timerHours.textContent = timer.hours;
        if (timer.hours < 10) timerHours.textContent = '0' + timer.hours;
        timerMinutes.textContent = timer.minutes;
        if (timer.minutes < 10) timerMinutes.textContent = '0' + timer.minutes;
        timerSeconds.textContent = timer.seconds;
        if (timer.seconds < 10) timerSeconds.textContent = '0' + timer.seconds;
      }
    }

    updateClock();

    setInterval(updateClock, 1000);


  }

  countTimer('28 March 2021 15:00');

  // Menu
  const toggleMenu = () => {

    const btnMenu = document.querySelector('.menu'); // кнопка .menu
    const menu = document.querySelector('menu'); // само меню
    const closeBtn = document.querySelector('.close-btn');
    const menuItems = menu.querySelectorAll('ul>li');

    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };


    btnMenu.addEventListener('click', handlerMenu);
    closeBtn.addEventListener('click', handlerMenu);
    menuItems.forEach(elem => elem.addEventListener('click', handlerMenu));
  };

  toggleMenu();

  //popup
  const togglePopUp = () => {
    const popup = document.querySelector('.popup');
    const popupBtn = document.querySelectorAll('.popup-btn');
    const popupClose = document.querySelector('.popup-close');
    const width = document.documentElement.clientWidth; //ширина экрана
    const popupContent = document.querySelector('.popup-content');


    function animate({ duration, timing, draw }) {
      const start = performance.now();

      requestAnimationFrame(function animate(time) {
        let timeFraction = (time - start) / duration;

        if (timeFraction > 1) timeFraction = 1;

        const progress = timing(timeFraction);

        draw(progress);

        if (timeFraction < 1) {
          requestAnimationFrame(animate);
        }
      });
    }

    popupBtn.forEach(elem => {
      elem.addEventListener('click', () => {
        popup.style.display = 'block';
        if (width < 768) {
          cancelAnimationFrame(animate);
        } else {
          animate({
            duration: 1000,
            timing(timeFraction) {
              return timeFraction;
            },
            draw(progress) {
              popupContent.style.left = progress * (width / 2.5) + 'px';
            },
          });
        }
      });
    });

    popupClose.addEventListener('click', () => {
      popup.style.display = 'none';
    });

  };

  togglePopUp();

});
