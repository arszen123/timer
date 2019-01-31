<template>
  <form>
    <div class="form-group justify-content-center row">
      <div class="form-group col-md-4 mb-3">
        <label for="title">Title:</label>
        <input id="title" type="text" class="form-control" v-model="form.title">
      </div>
      <div class="form-group col-md-4 mb-3">
        <label for="body">Body:</label>
        <input id="body" type="text" class="form-control" v-model="form.body">
      </div>
      <div class="form-group col-md-4 mb-3">
        <label for="icon">Icon (url):</label>
        <input id="icon" type="text" class="form-control" v-model="form.icon">
      </div>
    </div>
    <div class="form-group justify-content-center row">
      <div class="form-group col-md-3">
        <label for="hour">Hour</label>
        <input id="hour" type="number" class="form-control" v-model="form.hour">
      </div>
      <div class="form-group col-md-3">
        <label for="minute">Minute</label>
        <input id="minute" type="number" class="form-control" v-model="form.minute">
      </div>
      <div class="form-group col-md-3">
        <label for="second">Second</label>
        <input id="second" type="number" class="form-control" v-model="form.second">
      </div>
    </div>
    <div class="justify-content-center">
      <div class="form-check-inline col-md-3">
        <input id="repeat" type="checkbox" class="form-check-inline" v-model="form.repeat">
        <label for="repeat">Repeat</label>
      </div>
      <div v-if="form.repeat" class="form-group col-md-3">
        <label for="times_to_repeat">Number of times to repeat</label>
        <input id="times_to_repeat" type="number" class="form-control" v-model="form.numberOfTimesToRepeat">
      </div>
    </div>
    <div>
      <button class="btn btn-primary" v-on:click="save">Save</button>
    </div>
  </form>
</template>

<script>
import TimerConfig from '../utils/TimerConfig'

require('bootstrap-css')
export default {
  name: 'TimerForm',
  data: () => ({
    form: {
      title: '',
      body: '',
      icon: '',
      hour: 0,
      minute: 0,
      second: 0,
      repeat: false,
      numberOfTimesToRepeat: 0
    }
  }),
  methods: {
    save: function () {
      let interval = this.form.second * 1000
      interval += this.form.minute * 1000 * 60
      interval += this.form.hour * 1000 * 60 * 60
      let timerConfig = new TimerConfig({
        ...this.form,
        interval
      })
      this.$emit('save', timerConfig)
    }
  }
}
</script>

<style scoped>

</style>
