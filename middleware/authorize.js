const jwt = require('express-jwt');
let secret = "*[gbHf{4}{wuZ+:6@jh4#THnS]kU89";

module.exports = authorize;

function authorize() {
    return [
        jwt({ secret, algorithms: ['HS256'] })
    ];
}