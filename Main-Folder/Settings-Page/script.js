const lightmodebtn = document.getElementById('light-mode-btn');
const darkmodebtn = document.getElementById('dark-mode-btn');

const audioplay = document.getElementById('play-audio');
const audiopause = document.getElementById('stop-audio');

if (lightmodebtn && darkmodebtn){
    lightmodebtn.addEventListener('click', () => {
        enableLightMode();
    });

    darkmodebtn.addEventListener('click', () => {
        enableDarkMode();
    });
}

if (audioplay && audiopause){
    audioplay.addEventListener('click', () => {
        playAudio();
    });

    audiopause.addEventListener('click', () => {
        stopAudio();
    })
}