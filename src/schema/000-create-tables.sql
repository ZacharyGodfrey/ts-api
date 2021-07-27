CREATE TABLE IF NOT EXISTS public.user (
  id UUID NOT NULL,
  created TIMESTAMPTZ NOT NULL,
  updated TIMESTAMPTZ NOT NULL,
  username VARCHAR(25) NOT NULL,
  password_hash CHAR(64) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.session (
  id UUID NOT NULL,
  created TIMESTAMPTZ NOT NULL,
  updated TIMESTAMPTZ NOT NULL,
  user_id UUID NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_session_user FOREIGN KEY (user_id) REFERENCES public.user (id)
);

CREATE TABLE IF NOT EXISTS public.category (
  id UUID NOT NULL,
  created TIMESTAMPTZ NOT NULL,
  updated TIMESTAMPTZ NOT NULL,
  name VARCHAR NOT NULL,
  description VARCHAR NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.product (
  id UUID NOT NULL,
  created TIMESTAMPTZ NOT NULL,
  updated TIMESTAMPTZ NOT NULL,
  category_id UUID NOT NULL,
  name VARCHAR NOT NULL,
  description VARCHAR NOT NULL,
  price INTEGER NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_product_category FOREIGN KEY (category_id) REFERENCES public.category (id)
);

CREATE TABLE IF NOT EXISTS public.feature (
  id UUID NOT NULL,
  created TIMESTAMPTZ NOT NULL,
  updated TIMESTAMPTZ NOT NULL,
  product_id UUID NOT NULL,
  name VARCHAR NOT NULL,
  description VARCHAR NOT NULL,
  price INTEGER NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_feature_product FOREIGN KEY (product_id) REFERENCES public.product (id)
);

CREATE TABLE IF NOT EXISTS public.option (
  id UUID NOT NULL,
  created TIMESTAMPTZ NOT NULL,
  updated TIMESTAMPTZ NOT NULL,
  option_id UUID NOT NULL,
  name VARCHAR NOT NULL,
  description VARCHAR NOT NULL,
  price INTEGER NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_option_feature FOREIGN KEY (option_id) REFERENCES public.option (id)
);