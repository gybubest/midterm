SELECT poll_id, question, options.id, title, description
FROM options
JOIN polls ON poll_id = polls.id
ORDER BY poll_id, id;
