class Notify {
  static isEnabled () {
    return Notification.permission === 'granted'
  }

  static isDenided () {
    return Notification.permission === 'denied'
  }

  static requestPermission () {
    Notification.requestPermission()
      .then(value => console.log(value))
      .catch(reason => console.error(reason))
  }

  static pushNotification ({title, options}) {
    return new Notification(title, options)
  }

  static isAllowed () {
    return 'Notification' in window
  }
}

export default Notify
