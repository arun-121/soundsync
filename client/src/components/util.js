
class Music extends Audio {
    constructor() {
        super()
        this.addEventListener("play", () => {
            this.onPlay();
        })
        this.addEventListener("pause", () => {
            this.onPause();
        })
        this.addEventListener("timeupdate", () => {
            this.onUpdateTime(Math.round(this.currentTime));
        });
        this.addEventListener("durationchange", () => {
            this.onDurationChange(Math.round(this.duration));

        });


    }

    onDurationChange = () => { }
    onPlay = () => { }
    onPause = () => { }
    onUpdateTime = () => { }
}

let audioElement = null;

export function getAudioElement() {
    if (audioElement == null)
        audioElement = new Music();
    return audioElement;
}