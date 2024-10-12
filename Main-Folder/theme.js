const body = document.body;

function enableDarkMode(){
    body.classList.remove('light-mode');
    localStorage.setItem('theme', 'dark');
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