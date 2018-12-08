const vueFilters = {
  moneyToFixed (value) {
    return parseFloat(value).toFixed(2);
  },

  getDate (value) {
    return new Date(Date.parse(value)).toLocaleString();
  }
}

export default vueFilters