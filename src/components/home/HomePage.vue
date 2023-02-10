<template>
  <main>
    <div class="container py-2">
      <div class="p-4 mb-3 bg-light rounded-3">
        <h2>Cars In The Parking Lot</h2>
        <div class="container py-1">
          <div class="mh-100 overflow-auto" style="height: 305px">
            <div v-if="isLoadingCurrent">
              <p class="placeholder-wave">
                <span class="placeholder col-12"></span>
              </p>
              <p class="placeholder-wave">
                <span class="placeholder col-12"></span>
              </p>
              <p class="placeholder-wave">
                <span class="placeholder col-12"></span>
              </p>
            </div>
            <!-- current in the parking lot list -->
            <ul class="list-group" v-if="!isLoadingCurrent">
              <currentCarList
                v-for="car in currentCars"
                :key="car.id"
                :user-name="car.userName"
                :email="car.email"
                :car="car.car"
                :parking-place="car.parkingPlace"
                :time="car.time"
              />
            </ul>
          </div>
        </div>
      </div>
      <div class="row align-items-md-stretch">
        <div class="col-md-6">
          <div class="h-100 p-3 text-bg-dark rounded-3">
            <h2>Utilization</h2>
            <div class="row">
              <div class="col">
                <div
                  class="spinner-border text-light"
                  role="status"
                  v-if="isLoadingUtilization"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
                <div class="progressBar" v-if="!isLoadingUtilization">
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
              </div>
              <!-- Add parking number x / full -->
              <div class="col text-center" v-if="!isLoadingUtilization">
                <div class="useProportion">
                  <strong style="font-size: 50px">{{ this.carNumber }}</strong>
                  <sub style="font-size: 30px">/ 800</sub>
                </div>
              </div>
            </div>
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
import currentCarList from "./currentCarList.vue";

export default {
  components: {
    currentCarList,
  },
  data() {
    return {
      carNumber: 0,
      currentCars: [],
      isLoadingCurrent: false,
      isLoadingUtilization: false,
    };
  },
  methods: {
    progressBarHandler: function () {
      document.documentElement.style.setProperty(
        "--change",
        -0.59 * this.carNumber + 472
      );
      let number = document.getElementById("number");
      if (this.carNumber <= 0) {
        number.innerHTML = 0.0 + "%";
        return;
      }
      let counter = 0;
      setInterval(() => {
        if (counter == this.carNumber) {
          clearInterval();
        } else {
          counter += 1;
          number.innerHTML = (counter / 8).toFixed(1) + "%";
        }
      }, 0.001);
    },
    getPlaceNumber: async function () {
      this.isLoadingUtilization = true;
      await fetch("http://165.22.58.21:3000/parking/field")
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((result) => {
          this.isLoadingUtilization = false;
          for (let element of result.data) {
            this.carNumber += 200 - element.remain;
          }
          this.carNumber += 200 * (4 - result.data.length);
          this.progressBarHandler();
        })
        .catch((error) => {
          console.log("Error", error);
        });
    },
    getCurrentSlot: async function () {
      this.isLoadingCurrent = true;
      await fetch("http://165.22.58.21:3000/parking/slot/current")
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((result) => {
          this.isLoadingCurrent = false;
          let currentCars = [];
          for (let element of result.data) {
            currentCars.push({
              userName: element.account,
              email: element.email,
              car: element.license_plate,
              parkingPlace: element.parking_place,
              id: element.user_id,
              time: element.entry_time,
            });
          }
          this.currentCars = currentCars;
        })
        .catch((error) => {
          console.log("Error", error);
        });
    },
  },
  mounted() {
    this.getPlaceNumber();
    this.getCurrentSlot();
  },
};
</script>

<style scoped>
:root {
  --change: 800;
}
main {
  height: 750px;
}
.progressBar {
  padding: 10px 70px;
  height: 190px;
}
.useProportion {
  margin: 40px 30px 40px -10px;
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
  position: relative;
  bottom: 160px;
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
