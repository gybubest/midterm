SELECT response_options.poll_id, question, response_id, voter_name, option_id, title, display_order, weighting
FROM response_options
JOIN polls ON response_options.poll_id = polls.id
JOIN responses ON response_id = responses.id
JOIN options ON  option_id = options.id
ORDER BY poll_id, response_id, option_id;
