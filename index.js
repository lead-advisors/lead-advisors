/*========== TIMER ==========*/

function setCountdown() {
  const countDownDate = new Date("2023-05-31T23:59:59").getTime();

  const x = setInterval(function () {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days + " : ";
    document.getElementById("hours").innerHTML = formatTime(hours + " : ");
    document.getElementById("minutes").innerHTML = formatTime(minutes + " : ");
    document.getElementById("seconds").innerHTML = formatTime(seconds);

    if (distance < 0) {
      clearInterval(x);
      document.getElementById("countdown").innerHTML = "EXPIRED";
    }
  });
}

function formatTime(time) {
  return time < 10 ? "0" + time : time;
}
setCountdown();

/*========== POPUP ==========*/

function toggle() {
  var blur = document.getElementById("blur");
  blur.classList.toggle("active");
  var popup = document.getElementById("popup");
  popup.classList.toggle("active");
}


/*========== ACCORDION ==========*/

var section = $("li");

function toggleAccordion() {
  section.removeClass("active");
  $(this).addClass("active");
}

section.on("click", toggleAccordion);

/*========== RESIZE ==========*/

window.addEventListener("resize", function () {
  if (window.innerWidth <= 768) {
    document.getElementById("day").textContent = "DD";
    document.getElementById("hour").textContent = "HH";
    document.getElementById("minute").textContent = "MM";
    document.getElementById("second").textContent = "SS";
  } else {
    document.getElementById("day").textContent = "Days";
    document.getElementById("hour").textContent = "Hours";
    document.getElementById("minute").textContent = "Minutes";
    document.getElementById("second").textContent = "Seconds";
  }
});

/*========== AJAX VALIDATE ==========*/

$(document).ready(function () {
  $("form").submit(function (event) {
    $(".newsletter__form").removeClass("has-error");
    $(".help-block").remove();
    var formData = {
      value: $("#email").val(),
    };

    $.ajax({
      type: "POST",
      url: "http://lead-advisors.somee.com/api/email",
      data: JSON.stringify(formData),
      contentType: "application/json",
      encode: true,
    })
      .done(function () {
        toggle();
        $("#popup").show();
      })

      .fail(function (data) {
        $("form").html(
          '<div class="alert alert-danger">Could not reach server, please try again later.</div>'
        );
      });

    event.preventDefault();
  });
});


/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/


const sections = document.querySelectorAll("section[allevents]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".button__other a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".button__other a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/* ========== SCROLL ========== */

const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
});

sr.reveal(`.home__logo`);
sr.reveal(`.vector-left`, { origin: "left", delay: 700 });
sr.reveal(`.vector-right`, { origin: "right", delay: 1200 });
sr.reveal(`.home__title, .section__title, .time__section, .section__event`, {
  delay: 800,
});
sr.reveal(`.home__title`, { origin: "top", delay: 800 });
