class TimerConfig {
  constructor (config) {
    this.setConfig(config)
    this.hash = (new Date()).getTime() + '-' + (Math.random() * 1000)
    Object.freeze(this)
  }
  setConfig (config) {
    this.config = config
  }
  isRepeat () {
    return this.config.repeat
  }
  getTimesToRepeat () {
    return this.config.numberOfTimesToRepeat
  }
  getInterval () {
    return this.config.interval
  }
  getTitle () {
    return this.config.title
  }
  getBody () {
    return this.config.body
  }
  getIcon () {
    return this.config.icon
  }
  isOver (repeated) {
    return (this.isRepeat() && repeated >= this.getTimesToRepeat()) || (!this.isRepeat() && repeated === 1)
  }
  getOptions () {
    return {
      body: this.getBody(),
      icon: this.getIcon()
    }
  }
  getHash () {
    return this.hash
  }
}

export default TimerConfig
