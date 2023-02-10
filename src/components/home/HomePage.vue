<template>
  <main>
    <div class="container py-2">
      <div class="p-4 mb-3 bg-light rounded-3">
        <h2>Cars In The Parking Lot</h2>
        <div class="container py-1">
          <div
            class="mh-100"
            style="height: 225px; background-color: rgba(0, 0, 255, 0.1)"
          >
            <!-- current in the parking lot list -->s Max-height 100%
          </div>
        </div>
      </div>

      <div class="row align-items-md-stretch">
        <div class="col-md-6">
          <div class="h-100 p-3 text-bg-dark rounded-3">
            <h2>Parking Space Available</h2>
            <div class="progressBar">
              <!-- progress bar -->
              <div class="skill">
                <div class="outer">
                  <div class="inner">
                    <div id="number"></div>
                  </div>
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="160px"
                height="160px"
              >
                <defs>
                  <linearGradient id="GradientColor">
                    <stop offset="0%" stop-color="#de0a26" />
                    <stop offset="100%" stop-color="#ffffff" />
                  </linearGradient>
                </defs>
                <circle cx="80" cy="80" r="70" stroke-linecap="round" />
              </svg>
            </div>
            <!-- Add parking number x / full -->
            <div></div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="h-100 p-3 bg-light border rounded-3">
            <h2>Notification</h2>
            <div>
              <!-- notification list -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      carNumber: 0,
    };
  },
  methods: {
    progressBarHandler: function () {
      document.documentElement.style.setProperty(
        "--change",
        -1.18 * this.carNumber + 472
      );
      let number = document.getElementById("number");
      if (this.carNumber === 0) {
        number.innerHTML = 0.0 + "%";
      }
      let counter = 0;
      setInterval(() => {
        if (counter == this.carNumber) {
          clearInterval();
        } else {
          counter += 1;
          number.innerHTML = (counter / 4).toFixed(1) + "%";
        }
      }, 20);
    },
  },
  mounted() {
    this.progressBarHandler();
  },
};
</script>

<style scoped>
:root {
  --change: 300;
}
.progressBar {
  padding: 10px 60px;
}
.skill {
  width: 160px;
  height: 160px;
  position: relative;
}
.outer {
  height: 160px;
  width: 160px;
  border-radius: 50%;
  padding: 20px;
  box-shadow: 6px 6px 10px -1px rgba(0, 0, 0, 0.7),
    -6px -6px 10px -1px rgba(255, 255, 255, 0.7);
}
.inner {
  height: 120px;
  width: 120px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 4px 4px 6px -1px rgba(0, 0, 0, 0.2),
    inset -4px -4px 6px -1px rgba(255, 255, 255, 0.7),
    -0.5px -0.5px 0px rgba(255, 255, 255, 1),
    0.5px 0.5px 0px rgba(0, 0, 0, 0.15), 0px 12px 10px -10px rgba(0, 0, 0, 0.05);
}
#number {
  font-weight: 600px;
  color: white;
}
circle {
  fill: none;
  stroke: url(#GradientColor);
  stroke-width: 20px;
  stroke-dasharray: 472;
  stroke-dashoffset: 472;
  animation: anim 2s linear forwards;
}
svg {
  position: absolute;
  top: 471px;
  left: 166px;
}
@keyframes anim {
  0% {
    stroke-dashoffset: 472;
  }
  100% {
    stroke-dashoffset: var(--change);
  }
}
</style>
