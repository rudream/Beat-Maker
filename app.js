class DrumKit {
    constructor() {
        this.pads = document.querySelectorAll(".pad");
        this.playButton = document.querySelector(".play");
        this.clapAudio = document.querySelector(".clap-sound");
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.tomAudio = document.querySelector(".tom-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.cowbellAudio = document.querySelector(".cowbell-sound");
        this.index = 0; //Track where we are in the sound loop
        this.bpm = 300;
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
            //Check if current pad is 'active'
            if (bar.classList.contains("active")) {
                if (bar.classList.contains("clap-pad")) {
                    this.clapAudio.play();
                }
                if (bar.classList.contains("kick-pad")) {
                    this.kickAudio.play();
                }
                if (bar.classList.contains("snare-pad")) {
                    this.snareAudio.play();
                }
                if (bar.classList.contains("tom-pad")) {
                    this.tomAudio.play();
                }
                if (bar.classList.contains("hihat-pad")) {
                    this.hihatAudio.play();
                }
                if (bar.classList.contains("cowbell-pad")) {
                    this.cowbellAudio.play();
                }
            }
        });
        this.index++;
    }
    start() {
        setInterval(() => {
            this.repeat();
        }, (60 / this.bpm) * 1000);
    }
}

const drumKit = new DrumKit();

drumKit.pads.forEach((pad) => {
    pad.addEventListener("click", drumKit.activePad);
    pad.addEventListener("animationend", function () {
        this.style.animation = "";
    });
});

drumKit.playButton.addEventListener("click", function () {
    drumKit.start();
});
