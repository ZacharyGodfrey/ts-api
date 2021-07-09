CREATE TABLE IF NOT EXISTS public.user (
  id UUID NOT NULL,
  username VARCHAR(25) NOT NULL,
  password_hash CHAR(64) NOT NULL,
  created TIMESTAMPTZ,
  updated TIMESTAMPTZ,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.session (
  id UUID NOT NULL,
  user_id UUID NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_session_user FOREIGN KEY (user_id) REFERENCES public.user (id)
);