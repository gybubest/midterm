const express = require('express');
const router  = express.Router({ mergeParams: true });

const getQuestion = (db, adminLink) => {
  return db.query(`
    SELECT question
    FROM polls
    WHERE admin_link = $1;`
    , [ adminLink ])
      .then(result => {
        if (result.rows) {
          console.log("getQuestion =", result.rows);
          return result.rows[0].question;
        };
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });

};

const getOptionsWithWeighting = (db, adminLink) => {
  return db.query(`
    SELECT title, sum(weighting)
    FROM response_options
    JOIN polls ON poll_id = polls.id
    JOIN options ON option_id = options.id
    WHERE admin_link = $1
    GROUP BY title
    ORDER BY SUM(weighting) DESC;`
    , [ adminLink ])
      .then(result => {
        let total = 0;
        let query = {};
        // console.log("data.rows = ", data.rows);
        result.rows.forEach((element, index) => {
          // console.log(element);
          query[index] = Object.values(element);
        });
        console.log("query(options) = ", query);
        // calculate percentage of max weighted points (first object is the max since the query is ordered by sum of weighted points for each option)
        const max = query['0'][1];
        console.log("Max =", max);
        for (let obj in query) {
          console.log("query[obj][1]", query[obj][1]);
          query[obj][1] = Math.floor(query[obj][1] / max * 100)
          console.log("Percentage = ", query[obj][1])
        };
        console.log("Final query(options) =", query);
        return query;
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });

};

/**
 * Get all voter_name's top choice.
 * Parameter url --> admin_link
 * @return {Promise<[{}]>} A promise to the reservations.
 */
// const getAllVotersFirstOption = function(admin_link) {
//   return db.query(`
//     SELECT voter_name, option_id
//     FROM response_options
//     JOIN polls ON poll_id = polls.id
//     JOIN options ON option_id = options.id
//     JOIN responses ON response_id = responses.id
//     WHERE admin_link = $1
//     AND weighting = 1;`,
//     [ admin_link ])
//   .then(res => {
//     if (res.rows) {
//       console.log("getAllVotersFirstOption = ", res.rows);
//       return res.rows;
//     } else {
//       return null;
//     }
//   })
//   .catch(err => console.error('query error', err.stack));
// };

const getAllVotersFirstOption = (db, adminLink) => {
  return db.query(`
  SELECT voter_name, option_id
  FROM response_options
  JOIN polls ON poll_id = polls.id
  JOIN options ON option_id = options.id
  JOIN responses ON response_id = responses.id
  WHERE admin_link = $1
  AND weighting = 1;`
  , [ adminLink ])
      .then(result => {
        if (result.rows) {
          console.log("getAllVotersFirstOption = ", result.rows);
          return result.rows;
        };
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
};

module.exports = { getQuestion, getOptionsWithWeighting, getAllVotersFirstOption };


// //Write queries to database
// const createQueries = (res, db, values, adminLink, userLink) => {
//   let newPollId;

//   return db.query(`
//       INSERT INTO polls(question, email, admin_link, user_link, anonymous)
//       VALUES($1, $2, $3, $4, $5)
//       RETURNING *;
//       `, [values.inputNewQuestion, values.inputEmail, adminLink, userLink, values.anonymousCheck])
//       .then(result => {
//         newPollId = result.rows[0].id;
//         if (!values.inputOpt1) {
//           res.redirect('/new');
//           return;
//         };
//         db.query(`
//         INSERT INTO options(poll_id, title, description)
//         VALUES($1, $2, $3);
//         `, [newPollId, values.inputOpt1, values.inputOpt1Descript]);

//         if (!values.inputOpt2) {
//           res.redirect('/new');
//           return;
//         }

//         db.query(`
//         INSERT INTO options(poll_id, title, description)
//         VALUES($1, $2, $3);
//         `, [newPollId, values.inputOpt2, values.inputOpt2Descript]);

//         if (!values.inputOpt3) {
//           res.redirect('/');
//           return;
//         }

//         db.query(`
//         INSERT INTO options(poll_id, title, description)
//         VALUES($1, $2, $3);
//         `, [newPollId, values.inputOpt3, values.inputOpt3Descript]);

//         if (!values.inputOpt4) {
//           res.redirect('/');
//           return;
//         }

//         db.query(`
//         INSERT INTO options(poll_id, title, description)
//         VALUES($1, $2, $3);
//         `, [newPollId, values.inputOpt4, values.inputOpt4Descript]);

//         if (!values.inputOpt5) {
//           res.redirect('/');
//           return;
//         }

//         db.query(`
//         INSERT INTO options(poll_id, title, description)
//         VALUES($1, $2, $3);
//         `, [newPollId, values.inputOpt5, values.inputOpt5Descript]);

//         res.redirect('/')
//       })
//       .catch(e => {
//         console.error(e);
//         res.send(e)
//       });
// };

// module.exports = { urlCreator, sendlinks, createQueries, createValues };
