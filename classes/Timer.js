class Timer {
  constructor() {
    this.el = {
      minutes: document.querySelector("#timer-minutes"),
      seconds: document.querySelector("#timer-seconds"),
      division: document.querySelector("#timer-division"),
    };
    this.remainingSeconds = 60;
  }

  drawTimer() {
    const minutes = Math.floor(this.remainingSeconds / 60);
    const seconds = this.remainingSeconds % 60;
    this.el.minutes.textContent = minutes.toString().padStart(2, "0");
    this.el.seconds.textContent = seconds.toString().padStart(2, "0");
  }

  updateTimer() {
    if (this.remainingSeconds > 0) {
      this.remainingSeconds--;
    }
    if (this.remainingSeconds < 10) {
      this.el.minutes.classList.add("red-text");
      this.el.division.classList.add("red-text");
      this.el.seconds.classList.add("red-text");
    }
    this.drawTimer();
  }

  resetTimer() {
    this.remainingSeconds = 60;
    this.drawTimer();
  }
}

export default Timer;
