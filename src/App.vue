<template>
  <div id="app">
    <div class="dates">
      <div
        v-for="date in dates"
        :key="date.id"
        class="date"
      >
        <div class="date__date">
          <div class="date__label">Date:</div>
          <div class="date__value">{{ formatDate(date.date) }}</div>
        </div>
        <div class="date__timer">
          <div class="date__label">Time left:</div>
          <div :class="timerDateValueClassList(date.difference, date.timeEnding)">{{ date.timeLeft }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    dates: [
      {
        id: 1,
        date: '2020-07-14T17:36:00',
        timeEnding: 300,
        timeLeft: null,
        interval: null,
        difference: null
      },
      {
        id: 2,
        date: '2020-07-14T17:41:00',
        timeEnding: 300,
        timeLeft: null,
        interval: null,
        difference: null
      },
      {
        id: 3,
        date: '2020-07-14T17:44:20',
        timeEnding: 300,
        timeLeft: null,
        interval: null,
        difference: null
      }
    ]
  }),
  methods: {
    formatDate (date) {
      return this.$dayjs(date).format('DD MMMM YYYY – HH:mm:ss')
    },
    timerDateValueClassList (difference, timeEnding) {
      return [
        'date__value',
        { 'date__value_time-ending': difference <= timeEnding }
      ]
    }
  },
  created () {
    const dateNow = this.$dayjs(new Date())
    this.dates.forEach(dateData => {
      const dateAndNowDifference = this.$dayjs(dateData.date).diff(dateNow)
      const isTimeLeft = dateAndNowDifference >= 0
      dateData.timeLeft = isTimeLeft ? this.$dayjs.utc(dateAndNowDifference).format('HH:mm:ss') : '00:00:00'
      dateData.difference = this.$dayjs(dateData.date).diff(dateNow, 's')
      dateData.interval = setInterval(() => {
        if (dateData.difference < 1) clearInterval(dateData.interval)
        else {
          dateData.difference -= 1
          dateData.timeLeft = this.$dayjs({
            second: dateData.difference
          }).format('HH:mm:ss')
        }
      }, 1000)
    })
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 16px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.date {
  display: flex;
  justify-content: center;
  padding: 16px;
  margin-bottom: 16px;
  background-color: rgb(216, 216, 216);
  border-radius: 4px;

  &__date,
  &__timer {
    display: flex;
  }

  &__date {
    margin-right: 32px;
  }

  &__label {
    margin-right: 8px;
  }

  &__value {
    font-weight: 700;

    &_time-ending {
      color: #f00;
    }
  }
}
</style>
