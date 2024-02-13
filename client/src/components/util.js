
class Music extends Audio {
    constructor() {
        super()
        this.addEventListener("timeupdate", () => {
            this.onUpdateTime(Math.round(this.currentTime));
        });
        this.addEventListener("durationchange", () => {
            this.onDurationChange(Math.round(this.duration));

        });
    }

    onDurationChange = () => { }
    onUpdateTime = () => { }
}

let audioElement = null;

export function getAudioElement() {
    if (audioElement == null)
        audioElement = new Music();
    return audioElement;
}