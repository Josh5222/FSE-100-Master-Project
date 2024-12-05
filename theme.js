const body = document.body;
const gradientheader = document.getElementById('gradient-header');

function enableDarkMode(){
    body.classList.remove('light-mode');
    localStorage.setItem('theme', 'dark');
    gradientheader.style.background = 'linear-gradient(to right, #ffffff, #908e8e)';
    gradientheader.style.webkitBackgroundClip = 'text';
    gradientheader.style.color = 'transparent';

}

function enableLightMode(){
    body.classList.add('light-mode');
    localStorage.setItem('theme', 'light');
}

function applySavedTheme(){
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme == 'dark'){
        enableDarkMode();
    } else {
        enableLightMode();
    }
}

applySavedTheme();