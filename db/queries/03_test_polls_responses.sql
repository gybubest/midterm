SELECT poll_id, question, responses.id, voter_name
FROM responses
JOIN polls ON poll_id = polls.id
ORDER BY poll_id, id;
