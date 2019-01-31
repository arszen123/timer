<template>
  <div class="row">
    <div class="col-8">
      <div class="row justify-content-center">
        {{ timerConfig.getTitle() }}
      </div>
      <div class="row justify-content-center">
        {{ timerConfig.getTimesToRepeat() }} / {{ timesRepeated }}
      </div>
      <div class="row justify-content-center">
        {{ (nextTime - time.getTime()) | formatTime }}
      </div>
      <div class="progress">
        <div class="progress-bar" role="progressbar" :style="progressWidth" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
    </div>
    <div class="col-4">
      <button class="btn btn-info w-100" v-on:click="resetTimer">Reset</button>
      <button class="btn btn-warning w-100" v-on:click="toggleTimer">{{ timer === null ? 'Start' : 'Stop' }}</button>
      <button class="btn btn-danger w-100" v-on:click="$emit('delete')">Delete</button>
    </div>
  </div>
</template>

<script>
import Notify from '../utils/Notify'
import Time from '../utils/Time'

export default {
  name: 'Timer',
  props: ['timerConfig', 'isDelete'],
  data: function () {
    return {
      time: new Date(),
      timer: null,
      startDate: new Date(),
      nextTime: 0,
      repeated: 0
    }
  },
  created () {
    this.nextTime = this.startDate.getTime() + this.timerConfig.getInterval()
  },
  beforeDestroy () {
    this.stopTimer()
  },
  methods: {
    resetTimer: function () {
      this.stopTimer()
      this.startDate = new Date()
      this.nextTime = this.startDate.getTime() + this.timerConfig.getInterval()
      this.repeated = 0
    },
    toggleTimer: function () {
      if (this.timer) {
        this.stopTimer()
      } else {
        this.startDate.setTime((new Date()).getTime() - (this.time.getTime() - this.startDate.getTime()))
        this.time = new Date()
        this.startTimer()
      }
    },
    stopTimer: function () {
      clearInterval(this.timer)
      this.timer = null
      this.time = new Date()
    },
    startTimer: function () {
      this.nextTime = this.startDate.getTime() + (this.timerConfig.getInterval() * (this.repeated + 1))
      console.log({
        s: this.startDate.getTime(),
        d: this.time.getTime(),
        a: this.nextTime
      })
      this.timer = setInterval(() => {
        this.time = new Date()
        this.nextTime = this.startDate.getTime() + (this.timerConfig.getInterval() * (this.repeated + 1))
        if (this.isNotify()) {
          Notify.pushNotification({
            title: this.timerConfig.getTitle(),
            options: this.timerConfig.getOptions(),
          })
          this.repeated++
        }
        if (this.timerConfig.isOver(this.repeated) || (this.timerConfig.getTimesToRepeat() === 0 && this.nextTime - this.time.getTime() <= 0)) {
          this.stopTimer()
        }
      }, 1000)
    },
    isNotify: function () {
      let i1 = parseInt((this.time.getTime() - this.startDate.getTime()) / 1000)
      let i2 = (this.timerConfig.getInterval() / 1000)
      return i1 % i2 === 0
    },
  },
  computed: {
    timesRepeated: function () {
      return this.timerConfig.getTimesToRepeat() - this.repeated
    },
    progressStatus: function () {
      if (this.repeated >= this.timerConfig.getTimesToRepeat()) {
        return 0
      }

      let actual = this.nextTime - this.time.getTime()
      let max = this.nextTime - this.startDate.getTime() - (this.timerConfig.getInterval() * (this.repeated))
      return actual / max * 100
    },
    progressWidth: function () {
      return `width: ${this.progressStatus}%`
    }
  },
  filters: {
    formatTime: function (time) {
      return (new Time(time)).format()
    },
  },
  watch: {
    timerConfig: function (config) {
      this.timerConfig = config
    },
  },
}
</script>

<style scoped>
  #container {
    border-color: #000;
  }
</style>
