const path = require("path")

function concatPath(...strings) {
    return strings.join('/');
}

function composeWithQueryParams(paths, queryParams) {
    let queryString = "?";
    let index = 0;
    for(let key in queryParams) {
        queryString = queryString.concat(
            index > 0 ? !queryParams[key] ? ',' : '&' : '', `${key}`,
            !queryParams[key] ? '' : `=${queryParams[key]}`);
        index = index + 1;
    }
    return '/'.concat(paths.join('/').concat(queryString));
}

module.exports = { concatPath, composeWithQueryParams }