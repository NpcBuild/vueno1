<template>
  <div class="calendar-container">
    <div class="calendar-header">
      <h1>
        November
        <button>▾</button>
      </h1>
      <p>2018</p>
    </div>
    <div class="calendar"><span class="day-name">Mon</span><span class="day-name">Tue</span><span class="day-name">Wed</span><span class="day-name">Thu</span><span class="day-name">Fri</span><span class="day-name">Sat</span><span class="day-name">Sun</span>
      <div class="day day--disabled">30</div>
      <div class="day day--disabled">31</div>
      <div class="day">1</div>
      <div class="day">2</div>
      <div class="day">3</div>
      <div class="day">4</div>
      <div class="day">5</div>
      <div class="day">6</div>
      <div class="day">7</div>
      <div class="day">8</div>
      <div class="day">9</div>
      <div class="day">10</div>
      <div class="day">11</div>
      <div class="day">12</div>
      <div class="day">13</div>
      <div class="day">14</div>
      <div class="day">15</div>
      <div class="day">16</div>
      <div class="day">17</div>
      <div class="day">18</div>
      <div class="day">19</div>
      <div class="day">20</div>
      <div class="day">21</div>
      <div class="day">22</div>
      <div class="day">23</div>
      <div class="day">24</div>
      <div class="day">25</div>
      <div class="day">26</div>
      <div class="day">27</div>
      <div class="day">28</div>
      <div class="day">29</div>
      <div class="day">30</div>
      <div class="day">31</div>
      <div class="day day--disabled">1</div>
      <div class="day day--disabled">2</div>
      <section class="task task--warning">Projects</section>
      <section class="task task--danger">Design Sprint</section>
      <section class="task task--primary">Product Checkup 1
        <div class="task__detail">
          <h2>Product Checkup 1</h2>
          <p>15-17th November</p>
        </div>
      </section>
      <section class="task task--info">Product Checkup 2</section>
    </div>
  </div>
</template>

<script>
export default {
  name: "calendar"
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@use 'sass:color';
html,
body {
  width: 100%;
  height: 100%;
}

body {
  background: #f5f7fa;
  padding: 40px 0;
  box-sizing: border-box;
  font-family: Montserrat, "sans-serif";
  color: #51565d;
}

.calendar {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(7, minmax(120px, 1fr));
  grid-template-rows: 50px;
  grid-auto-rows: 120px;
  overflow: auto;

  &-container {
    width: 90%;
    margin: auto;
    overflow: hidden;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background: #fff;
    max-width: 1200px;
  }

  &-header {
    text-align: center;
    padding: 20px 0;
    background: linear-gradient(to bottom, rgb(250, 251, 253) 0%,rgba(255,255,255,0) 100%);
    border-bottom: 1px solid rgba(166, 168, 179, 0.12);

    h1 {
      margin: 0;
      font-size: 18px;
    }

    p {
      margin: 5px 0 0 0;
      font-size: 13px;
      font-weight: 600;
      color: rgba(#51565d, .4);
    }

    button {
      background: 0;
      border: 0;
      padding: 0;
      color: rgba(#51565d, .7);
      cursor: pointer;
      outline: 0;
    }
  }
}

.day {
  border-bottom: 1px solid rgba(166, 168, 179, 0.12);
  border-right: 1px solid rgba(166, 168, 179, 0.12);
  text-align: right;
  padding: 14px 20px;
  letter-spacing: 1px;
  font-size: 12px;
  box-sizing: border-box;
  color: #98a0a6;
  position: relative;
  pointer-events: none;
  z-index: 1;

  &:nth-of-type(7n + 7) {
    border-right: 0;
  }

  &:nth-of-type(n + 1):nth-of-type(-n + 7) {
    grid-row: 2;
  }

  &:nth-of-type(n + 8):nth-of-type(-n + 14) {
    grid-row: 3;
  }

  &:nth-of-type(n + 15):nth-of-type(-n + 21) {
    grid-row: 4;
  }

  &:nth-of-type(n + 22):nth-of-type(-n + 28) {
    grid-row: 5;
  }

  &:nth-of-type(n + 29):nth-of-type(-n + 35) {
    grid-row: 6;
  }

  &:nth-of-type(7n + 1) {
    grid-column: 1/1;
  }

  &:nth-of-type(7n + 2) {
    grid-column: 2/2;
  }

  &:nth-of-type(7n + 3) {
    grid-column: 3/3;
  }

  &:nth-of-type(7n + 4) {
    grid-column: 4/4;
  }

  &:nth-of-type(7n + 5) {
    grid-column: 5/5;
  }

  &:nth-of-type(7n + 6) {
    grid-column: 6/6;
  }
  &:nth-of-type(7n + 7) {
    grid-column: 7/7;
  }

  &-name {
    font-size: 12px;
    text-transform: uppercase;
    color: #99a1a7;
    text-align: center;
    border-bottom: 1px solid rgba(166, 168, 179, 0.12);
    line-height: 50px;
    font-weight: 500;
  }

  &--disabled {
    color: rgba(#98a0a6, 0.6);
    background-color: #ffffff;
    background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f9f9fa' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E");
    cursor: not-allowed;
  }
}

.task {
  border-left-width: 3px;
  padding: 8px 12px;
  margin: 10px;
  border-left-style: solid;
  font-size: 14px;
  position: relative;

  &--warning {
    border-left-color: #fdb44d;
    grid-column: 4 / span 3;
    grid-row: 3;
    background: #fef0db;
    align-self: center;
    color: color.adjust(#fdb44d, $lightness: -12%);
    margin-top: -5px;
  }

  &--danger {
    border-left-color: #fa607e;
    grid-column: 2 / span 3;
    grid-row: 3;
    margin-top: 15px;
    background: rgba(#fdc5d0, 0.7);
    align-self: end;
    color: color.adjust(#fa607e, $lightness: -12%);
  }

  &--info {
    border-left-color: #4786ff;
    grid-column: 6 / span 2;
    grid-row: 5;
    margin-top: 15px;
    background: rgba(#dae7ff, 0.7);
    align-self: end;
    color: color.adjust(#4786ff, $lightness: -12%);
  }

  &--primary {
    background: #4786ff;
    border: 0;
    border-radius: 4px;
    grid-column: 3 / span 3;
    grid-row: 4;
    align-self: end;
    color: #fff;
    box-shadow: 0 10px 14px rgba(#4786ff, 0.4);
  }

  &__detail {
    position: absolute;
    left: 0;
    top: calc(100% + 10px);
    background: #fff;
    border: 1px solid rgba(166, 168, 179, 0.2);
    color: #000;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 4px;
    box-shadow:0 10px 40px rgba(0,0,0,0.08);
    z-index: 2;

    &:after,
    &:before {
      bottom: 100%;
      left: 30%;
      border: solid transparent;
      content: " ";
      height: 0;
      width: 0;
      position: absolute;
      pointer-events: none;
    }

    &:before {
      border-bottom-color: rgba(166, 168, 179, 0.2);
      border-width: 8px;
      margin-left: -8px;
    }

    &:after {
      border-bottom-color: #fff;
      border-width: 6px;
      margin-left: -6px;
    }

    h2 {
      font-size: 15px;
      margin: 0;
      color: #51565d;
    }

    p {
      margin-top: 4px;
      font-size: 12px;
      margin-bottom: 0;
      font-weight: 500;
      color: rgba(#51565d, .7);
    }
  }
}

</style>