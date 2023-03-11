class Timer {
  constructor() {
    this.el = {
      minutes: document.querySelector("#timer-minutes"),
      seconds: document.querySelector("#timer-seconds"),
    };
    this.remainingSeconds = 30;
  }

  drawTimer() {
    const minutes = Math.floor(this.remainingSeconds / 60);
    const seconds = this.remainingSeconds % 60;
    this.el.minutes.textContent = minutes.toString().padStart(2, "0");
    this.el.seconds.textContent = seconds.toString().padStart(2, "0");
  }

  updateTimer() {
    if (this.remainingSeconds >= 0) {
      this.remainingSeconds--;
    }
  }

  resetTimer() {
    this.remainingSeconds = 30;
    this.drawTimer();
  }
}

export default Timer;
