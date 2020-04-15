class DrumKit {
    constructor() {
        this.pads = document.querySelectorAll(".pad");
        this.playButton = document.querySelector(".play");
        this.clapAudio = document.querySelector(".clap-sound"); //Selects the audio element for the instrument
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.tomAudio = document.querySelector(".tom-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.cowbellAudio = document.querySelector(".cowbell-sound");
        this.index = 0; //Track where we are in the sound loop
        this.bpm = 150;
        this.isPlaying = null;
        this.selections = document.querySelectorAll("select");
        this.muteButtons = document.querySelectorAll(".mute");
        this.tempoSlider = document.querySelector(".tempo-slider");
        this.tempoNumber = document.querySelector(".tempo-nr");
    }
    activePad() {
        this.classList.toggle("active");
    }
    repeat() {
        let step = this.index % 10;
        const activeBars = document.querySelectorAll(`.b${step}`);
        //Loop over pads
        activeBars.forEach((bar) => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
            //Check if current pad is should be played
            if (bar.classList.contains("active")) {
                if (bar.classList.contains("clap-pad")) {
                    this.clapAudio.currentTime = 0;
                    this.clapAudio.play();
                }
                if (bar.classList.contains("kick-pad")) {
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if (bar.classList.contains("snare-pad")) {
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if (bar.classList.contains("tom-pad")) {
                    this.tomAudio.currentTime = 0;
                    this.tomAudio.play();
                }
                if (bar.classList.contains("hihat-pad")) {
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
                if (bar.classList.contains("cowbell-pad")) {
                    this.cowbellAudio.currentTime = 0;
                    this.cowbellAudio.play();
                }
            }
        });
        this.index++;
    }
    start() {
        if (!this.isPlaying) {
            this.isPlaying = setInterval(() => {
                this.repeat();
            }, (60 / this.bpm) * 1000);
        } else {
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        }
    }
    updateButton() {
        if (this.isPlaying) {
            this.playButton.innerHTML = "<i class='fas fa-pause'></i>";
        } else {
            this.playButton.innerHTML = "<i class='fas fa-play'></i>";
        }
    }
    changeSound(e) {
        const selectionName = e.target.name;
        const selectionValue = e.target.value;
        switch (selectionName) {
            case "clap-select":
                this.clapAudio.src = selectionValue;
                break;
            case "kick-select":
                this.kickAudio.src = selectionValue;
                break;
            case "snare-select":
                this.snareAudio.src = selectionValue;
                break;
            case "tom-select":
                this.tomAudio.src = selectionValue;
                break;
            case "hihat-select":
                this.hihatAudio.src = selectionValue;
                break;
            case "cowbell-select":
                this.tomAudio.src = selectionValue;
                break;
        }
    }
    mute(e) {
        const muteTarget = e.target.getAttribute("data-track");
        console.log(muteTarget);
        e.target.classList.toggle("active");
        if (e.target.classList.contains("active")) {
            switch (muteTarget) {
                case "0":
                    this.clapAudio.volume = 0;
                    break;
                case "1":
                    this.kickAudio.volume = 0;
                    break;
                case "2":
                    this.snareAudio.volume = 0;
                    break;
                case "3":
                    this.tomAudio.volume = 0;
                    break;
                case "4":
                    this.hihatAudio.volume = 0;
                    break;
                case "5":
                    this.cowbellAudio.volume = 0;
                    break;
            }
        } else {
            switch (muteTarget) {
                case "0":
                    this.clapAudio.volume = 1;
                    break;
                case "1":
                    this.kickAudio.volume = 1;
                    break;
                case "2":
                    this.snareAudio.volume = 1;
                    break;
                case "3":
                    this.tomAudio.volume = 1;
                    break;
                case "4":
                    this.hihatAudio.volume = 1;
                    break;
                case "5":
                    this.cowbellAudio.volume = 1;
                    break;
            }
        }
    }
    changeTempo(e) {
        this.tempoNumber.innerText = `${e.target.value}`;
        this.bpm = e.target.value;
    }
    updateTempo() {
        this.start();
        this.updateButton();
    }
}

const drumKit = new DrumKit();

//Event Listeners

drumKit.pads.forEach((pad) => {
    pad.addEventListener("click", drumKit.activePad);
    pad.addEventListener("animationend", function () {
        this.style.animation = "";
    });
});

drumKit.playButton.addEventListener("click", function () {
    drumKit.start();
    drumKit.updateButton();
});

drumKit.selections.forEach((select) => {
    select.addEventListener("change", function (e) {
        drumKit.changeSound(e);
    });
});

drumKit.muteButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
        drumKit.mute(e);
    });
});

drumKit.tempoSlider.addEventListener("input", function (e) {
    drumKit.changeTempo(e);
});

drumKit.tempoSlider.addEventListener("change", function () {
    drumKit.updateTempo();
});
