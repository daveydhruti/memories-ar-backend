//get today's date
const today = new Date(Date.now());
const todaysDate = today.toISOString().slice(0, 10);

//get yesterday's date
const yesterday = new Date(Date.now() - 86400000);
const yesterdayDate = yesterday.toISOString().slice(0, 10);

//get first day of last month
const lastMonth = new Date();
lastMonth.setMonth(lastMonth.getMonth() - 1);
lastMonth.setDate(1);
const lastMonthDate = lastMonth.toISOString().slice(0, 10);

//get last day of last month
const lastMonthEnd = new Date();
lastMonthEnd.setMonth(lastMonthEnd.getMonth(), 0);
const lastMonthEndDate = lastMonthEnd.toISOString().slice(0, 10);

//get first day of this month
const thisMonth = new Date();
thisMonth.setDate(1);
const thisMonthDate = thisMonth.toISOString().slice(0, 10);

//get first day of this year
const thisYear = new Date();
thisYear.setMonth(0);
thisYear.setDate(1);
const thisYearDate = thisYear.toISOString().slice(0, 10);

//get first day of last year
const lastYear = new Date();
lastYear.setFullYear(lastYear.getFullYear() - 1);
lastYear.setMonth(0);
lastYear.setDate(1);
const lastYearDate = lastYear.toISOString().slice(0, 10);

//get last day of last year
const lastYearEnd = new Date();
lastYearEnd.setFullYear(lastYearEnd.getFullYear() - 1);
lastYearEnd.setMonth(11);
lastYearEnd.setDate(31);
const lastYearEndDate = lastYearEnd.toISOString().slice(0, 10);

const dates = {
    today: {
        start: todaysDate,
        end: todaysDate
    },
    yesterday: {
        start: yesterdayDate,
        end: yesterdayDate
    },
    lastMonth: {
        start: lastMonthDate,
        end: lastMonthEndDate
    },
    thisMonth: {
        start: thisMonthDate,
        end: todaysDate
    },
    thisYear: {
        start: thisYearDate,
        end: todaysDate
    },
    lastYear: {
        start: lastYearDate,
        end: lastYearEndDate
    }
};

module.exports = dates;
