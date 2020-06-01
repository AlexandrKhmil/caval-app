--------------------------------------------------------------------------------
-- account ---------------------------------------------------------------------
--------------------------------------------------------------------------------
create table account (
  id serial not null,
  email character varying not null,
  password character varying not null,
  reg_at timestamp with time zone not null default now(),
  constraint pk_account_id primary key (id)
);