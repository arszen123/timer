<template>
  <!-- @TODO conditions into routing -->
  <div v-if="isNotificationAllowed">
    <div v-if="isNotificationEnabled">
      <timer-form @save="saveTimer" />
      <div v-if="timers.length > 0">
        <div v-for="(timer, index) in timers"
             :key="timer.getHash()"
             class="row justify-content-center"
        >
          <timer v-if="timer"
                 v-bind:timer-config="timer"
                 @delete="deleteTimer(index)"
          />
        </div>
      </div>
      <div v-else>
      </div>
    </div>
    <div v-else>
      Please enable notifications first!
    </div>
  </div>
  <div v-else>
    Your browser doesn't support notifications!
  </div>
</template>

<script>
import Timer from '../components/Timer'
import Notify from '../utils/Notify'
import TimerForm from '../components/TimerForm'

export default {
  name: 'Main',
  components: {TimerForm, Timer},
  data: () => ({
    isNotificationEnabled: false,
    isNotificationAllowed: false,
    timers: []
  }),
  created () {
    this.isNotificationAllowed = Notify.isAllowed()
    this.isNotificationEnabled = Notify.isEnabled()
  },
  methods: {
    enableNotification: function () {
      Notify.requestPermission()
    },
    deleteTimer: function (index) {
      this.$delete(this.timers, index)
    },
    saveTimer: function (timerConfig) {
      this.timers.push(timerConfig)
    }
  }
}
</script>

<style scoped>

</style>
