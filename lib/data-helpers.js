const express = require('express');
const router  = express.Router({ mergeParams: true });

/**
 * Get all voter_name's top choice.
 * Parameter url --> admin_link
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllVotersFirstOption = function(admin_link) {
  return db.query(`
    SELECT voter_name, option_id
    FROM response_options
    JOIN polls ON poll_id = polls.id
    JOIN options ON option_id = options.id
    JOIN responses ON response_id = responses.id
    WHERE admin_link = $1
    AND weighting = 1;`,
    [ admin_link ])
  .then(res => {
    if (res.rows) {
      console.log("getAllVotersFirstOption = ", res.rows);
      return res.rows;
    } else {
      return null;
    }
  })
  .catch(err => console.error('query error', err.stack));
};

module.exports = { getAllVotersFirstOption };
