const GET_EMAIL_BY_ID = `
  SELECT email
  FROM account
  WHERE id = $1;
`;

const GET_USER = `
  SELECT id, password
  FROM account
  WHERE email = $1;
`;

const CHECK_USER = `
  (SELECT COUNT(1) > 0 AS value 
  FROM account
  WHERE email = $1);
`;

const ADD_USER = `
  INSERT INTO account (email, password)
  VALUES ($1, $2);
`;

const GET_ADDED = `
  select id 
  from account 
  order by id desc limit 1;
`;

module.exports = {
  GET_EMAIL_BY_ID,
  GET_USER,
  CHECK_USER,
  ADD_USER,
  GET_ADDED,
};