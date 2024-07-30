module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
  get_tracking: () => {
    const randomNum = Math.floor(random()*(9999999999 - 1000000000 + 1)) + 1000000000;

    return randomNum;
  },
};
