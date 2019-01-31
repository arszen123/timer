class Time {
  constructor (seconds) {
    seconds = parseInt(seconds / 1000)
    this.second = seconds % 60
    this.minute = parseInt(seconds / 60) % 60
    this.hour = parseInt(seconds / 60 / 60)
  }
  format () {
    return `${this.hour}:${this.minute}:${this.second}`
  }
}

export default Time
