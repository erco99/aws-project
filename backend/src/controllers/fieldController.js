const fields = require("../models/field");

async function updateStates({ states, field: fieldName }) {
    await fields.updateOne({name: fieldName}, { $set: { state: states }});
}

module.exports = { updateStates };