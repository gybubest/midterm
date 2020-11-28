SELECT options.title, options.description
FROM options
JOIN polls ON polls.id = poll_id
WHERE polls.user_link = [submitted URL]


