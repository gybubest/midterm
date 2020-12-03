// Helper functions for result.js

const convertArrayOfObjectsIntoObject = (array) => {
  let obj = {};
  array.forEach((element, index) => {
    obj[index] = Object.values(element);
  });
  return obj;
};

const getQuestion = (db, adminLink) => {
  return db.query(`
    SELECT question
    FROM polls
    WHERE admin_link = $1;`,
  [ adminLink ])
    .then(result => {
      if (result.rows) {
        return result.rows[0].question;
      }
    })
    .catch(e => {
      console.error("ERROR", e);
      return { error: e };
    });
};

const getOptionsWithPercentage = (db, adminLink) => {
  return db.query(`
    SELECT title, sum(weighting), option_id
    FROM response_options
    JOIN polls ON poll_id = polls.id
    JOIN options ON option_id = options.id
    WHERE admin_link = $1
    GROUP BY title, option_id
    ORDER BY SUM(weighting) DESC;`,
  [ adminLink ])
    .then(result => {
      let query = convertArrayOfObjectsIntoObject(result.rows);
      // calculate percentage of max weighted points (first object is the max since the query is ordered by sum of weighted points for each option)
      const max = query['0'][1];
      for (let obj in query) {
        query[obj][1] = Math.floor(query[obj][1] / max * 100);
      }
      return query;
    })
    .catch(e => {
      console.error("ERROR:", e);
      return { error: e };
    });
};

// Get all voter_name's top choice (not implemented yet).
const getAllVotersFirstOption = (db, adminLink) => {
  return db.query(`
    SELECT voter_name, option_id
    FROM response_options
    JOIN polls ON poll_id = polls.id
    JOIN options ON option_id = options.id
    JOIN responses ON response_id = responses.id
    WHERE admin_link = $1
    AND weighting = 1
    ORDER BY voter_name;`,
  [ adminLink ])
    .then(result => {
      let query = convertArrayOfObjectsIntoObject(result.rows);
      // loop trough object of results re-arrange to have { option_id: [ voter_name_array] } for each option_id
      let obj = {};
      for (const row in query) {
        if (obj[query[row][1]]) {
          obj[query[row][1]].push(query[row][0] === ''? NULL : query[row][0]);
        } else {
          obj[query[row][1]] = [];
          obj[query[row][1]].push(query[row][0] === ''? NULL : query[row][0]);
        }
      }
      return obj;
    })
    .catch(e => {
      console.error(e);
      return { error: e };
    });
};

const getColorsForNumberOfOptions = (optionsQuery) => {
  // Color object where the property represents the number of options available.
  const colors = {
      "2": ["green", "red"],
      "3": ["green", "orange", "red"],
      "4": ["green", "yellow", "orange", "red"],
      "5": ["green", "yellow", "orange", "red", "brown"]
  }
  const numberOfOptions = Object.keys(optionsQuery).length;
  const colorArray = colors[numberOfOptions];
  for (option in optionsQuery) {
    optionsQuery[option][3] = colorArray.shift();
  }
  return optionsQuery;
}

module.exports = { getQuestion, getOptionsWithPercentage, getAllVotersFirstOption, getColorsForNumberOfOptions };
