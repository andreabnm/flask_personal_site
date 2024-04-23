// Scroll functionality
$(document).ready(function() {
    $(".nav-item a").click(function(e) {
      var targetHref = $(this).attr("href");
  
      if (targetHref === "#") {
        $("html, body").animate({ scrollTop: 0 }, 1000);
      } else {
        var navHeight = document.getElementById('mainbar').clientHeight;

        $("html, body").animate(
          {
            scrollTop: $(targetHref).offset().top - navHeight
          },
          1000
        );
      }
  
      e.preventDefault();
    });
  });

// Change theme
const darkTheme = 'dark';
const darkIcon = 'moon';
const lightIcon = 'sun';

const selectedTheme = localStorage.getItem('theme');
const selectedIcon = localStorage.getItem('icon');
const changeThemeButton = document.getElementById('change_theme')

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? darkTheme : 'light'
const getCurrentIcon = () => getCurrentTheme() === darkTheme ? lightIcon : darkIcon

if (selectedTheme) {
  // Apply previous selected
  document.body.classList[selectedTheme === darkTheme ? 'add' : 'remove'](darkTheme)

  // Change icon
  const icon = changeThemeButton.querySelector('.far')
  if (selectedTheme === darkTheme) {
    icon.classList.add('fa-' + lightIcon)
    icon.classList.remove('fa-' + darkIcon)
  } else {
    icon.classList.add('fa-' + darkIcon)
    icon.classList.remove('fa-' + lightIcon)   
  }
}

function toggleTheme() {
  // Apply new theme
  document.body.classList.toggle(darkTheme)

  // Change icon (font awesome uses svg after loading)
  const icon = changeThemeButton.querySelector('.svg-inline--fa')
  if (icon.getAttribute('data-icon') === darkIcon) {
    icon.setAttribute('data-icon',lightIcon)
  } else {
    icon.setAttribute('data-icon',darkIcon)
  }

  // Save the current theme to local storage
  localStorage.setItem('theme', getCurrentTheme())
  localStorage.setItem('icon', getCurrentIcon())

}
changeThemeButton.addEventListener('click', toggleTheme)


// Skills toggle
function toggleSkills() {
  let skillsContents = document.querySelectorAll('.skill_open')
  let parentClass = this.parentNode.className
  let icon = this.querySelector('.svg-inline--fa')
  

  if (parentClass === 'skill_close') {
    this.parentNode.className = 'skill_open'
  } else {
    this.parentNode.className = 'skill_close'
  }

  if (icon.getAttribute('data-icon') === 'chevron-down') {
    icon.setAttribute('data-icon','chevron-right')
  } else {
    icon.setAttribute('data-icon','chevron-down')
  }
}

const skillTitles = document.querySelectorAll('.skill_title')
skillTitles.forEach((el) => {
  el.addEventListener('click', toggleSkills)
})

// Skills level
const skillItems = document.querySelectorAll('.skill_item')
skillItems.forEach((el) => {
  let perc = el.querySelector('.skill_perc').innerHTML
  if (perc) {
    let levelBar = el.querySelector('.skill_level')
    levelBar.style.setProperty("width", perc);
  }
})

