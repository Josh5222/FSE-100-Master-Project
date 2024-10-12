const audio = document.getElementById('background-audio');

function playAudio(){
    audio.play().catch((error) => {
        console.log(error);
    });
    localStorage.setItem('audioPlaying', 'true');
}

function stopAudio(){
    audio.pause();
    localStorage.setItem('audioPlaying', 'false');
}

window.onload = function() {
    const audioState = localStorage.getItem('audioPlaying');
    if (audioState == 'true'){
        playAudio();
    } else {
        stopAudio();
    }
}

