module.exports = {
  content: ["./index.html","./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        "weather-primary":"#008080",
        "weather-secondary":"#e3bc9a",
      },

    },
    ringColor: {
      "weather-ring1":"#008080",
      "weather-ring2":"#e3bc9a",
    },
    fontFamily:{
      Roboto: ["Roboto, sans-serif"],
    },
    container:{
      padding:"2rem",
      center:true,
    },
    screens:{
      sm:"640px",
      md:"768",
    },
  },
  plugins: [],
};

