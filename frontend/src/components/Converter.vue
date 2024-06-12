<template>
  <div class="currency-converter">
    <!-- Heading -->
    <div style="margin-top: 15%;">
      <transition name="fade-slide">
        <h1 v-if="showHeading" style="color: white" class="text-center">Currency Converter</h1>
      </transition>
    </div>
    <!-- Card -->
    <transition name="fade-slide">
      <div v-if="showCard" class="card mt-7 p-4">
        <div v-if="!dataLoaded" class="fallback text-center">
          <p>Loading exchange rates...</p>
        </div>

        <transition name="fade-slide">
          <div v-if="dataLoaded && showElements" class="card-body">
            <div class="row g-3">
              <div class="col-sm-3">
                <label for="amount" class="form-label">Amount:</label>
                <input
                  id="amount"
                  type="number"
                  v-model="amount"
                  class="form-control"
                  placeholder="Enter amount"
                />
              </div>
              <div class="col-sm-3">
                <label for="fromCurrency" class="form-label">From Currency:</label>
                <select id="fromCurrency" v-model="fromCurrency" class="form-select">
                  <option v-for="currency in currencies" :key="currency">{{ currency }}</option>
                </select>
              </div>
              <div class="col-sm-3">
                <label for="toCurrency" class="form-label">To Currency:</label>
                <select id="toCurrency" v-model="toCurrency" class="form-select">
                  <option v-for="currency in currencies" :key="currency">{{ currency }}</option>
                </select>
              </div>
              <div class="col-sm-3">
                <label class="form-label">&nbsp;</label>
                <button @click="convert" class="btn btn-primary w-100">
                  <span v-if="!loading">Convert</span>
                  <span v-else class="loader"></span>
                </button>
              </div>
            </div>
            <transition name="expand">
              <div v-if="convertedAmount" class="result mt-3">
                <p class="converted-amount text-center">
                  Converted Amount: {{ convertedAmount }}
                  <br />
                  Exchange Rate: {{ exchangeRate }}
                </p>
              </div>
            </transition>
          </div>
        </transition>
        <transition name="fade-slide">
          <p v-if="error" class="error text-center mt-3">{{ error }}</p>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Swal from "sweetalert2";
import axios from "axios";

const showHeading = ref(false);
const showCard = ref(false);
const showElements = ref(false);
const dataLoaded = ref(false);

const amount = ref(null);
const fromCurrency = ref("USD");
const toCurrency = ref("PKR");
const convertedAmount = ref(null);
const exchangeRate = ref(null);
const error = ref(null);
const loading = ref(false);

const currencies = [
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "AUD",
  "CAD",
  "CHF",
  "CNY",
  "INR",
  "NZD",
  "ZAR",
  "PKR"
];

const convert = async () => {
  if (
    amount.value != 0 &&
    amount.value != null &&
    amount.value &&
    amount.value > 0 &&
    Number.isInteger(Number(amount.value)) &&
    currencies.includes(fromCurrency.value) &&
    currencies.includes(toCurrency.value)
  ) {
    loading.value = true;
    try {
      const response = await axios.get(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency.value}`
      );
      const rates = response.data.rates;
      const rate = rates[toCurrency.value];
      if (!rate) {
        throw new Error("Invalid currency selected");
      }
      const converted = (amount.value * rate).toFixed(2);
      convertedAmount.value = converted;
      exchangeRate.value = rate.toFixed(4);
      error.value = null;
    } catch (error) {
      error.value =
        error.message || "Failed to convert currency. Please try again later.";
      console.error(error);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: error.value
      });
    } finally {
      loading.value = false;
    }
  } else {
    await Swal.fire({
      icon: "error",
      title: "Error",
      text: "Please enter a valid integer amount and select valid currencies."
    });
  }
};

// Simulate API delay
setTimeout(() => {
  showHeading.value = true;
  setTimeout(() => {
    showCard.value = true;
    setTimeout(() => {
      dataLoaded.value = true;
      showElements.value = true;
    }, 1000);
  }, 1500);
}, 1000);
</script>

<style scoped>
.currency-converter {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.card {
  border: 2px solid #11c420;
  border-radius: 8px;
  margin-top: 15%;
  transition: all 0.5s ease;
}

.fallback {
  text-align: center;
}

.error {
  color: red;
}

.converted-amount {
  font-weight: bold;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 1.5s, transform 1.5s;
}

.fade-slide-enter,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.expand-enter-active,
.expand-leave-active {
  transition: max-height 1.5s ease;
}

.expand-enter,
.expand-leave-to {
  max-height: 0;
  overflow: hidden;
}

.result {
  max-height: 200px;
}

.main-container {
  position: relative;
  background-image: url("/background.jpg");
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 60px;
}

.main-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("/background.jpg");
  background-position: center;
  filter: blur(5px);
  z-index: -1;
}

.loader {
  border: 4px solid #f3f3f3;
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
  display: inline-block;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>



