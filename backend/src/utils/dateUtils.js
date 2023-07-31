function dateToString(date) {
    const month = date.getMonth() + 1
    const day = date.getDate();
    return [date.getFullYear(),
        month >= 10 ? month : '0' + month,
        day >= 10 ? day : '0' + day].join("-");
}

module.exports = { dateToString }