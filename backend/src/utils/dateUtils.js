function dateToString(date) {
    const month = date.getMonth() + 1
    return [date.getFullYear(),
        month >= 10 ? month : '0' + month,
        date.getDate()].join("-");
}

module.exports = { dateToString }