-- Enable UUID extension
create EXTENSION if not exists "uuid-ossp";

-- Create users' table
create TABLE if NOT EXISTS users(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email varchar(255) not null UNIQUE,
  hashed_password varchar(255) not null,
  name varchar(225) not null,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create user preferences table
create TABLE if NOT EXISTS user_preferences(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  dietary_restrictions text[] DEFAULT '{}',
  allergies text[] DEFAULT '{}',
  preferred_cuisines text[] DEFAULT '{}',
  default_servings int DEFAULT 4,
  measurement_unit varchar(20) DEFAULT 'metric',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id)
);

-- Pantry items table

create TABLE IF NOT EXISTS pantry_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name varchar(255) not null,
  quantity decimal(10, 2) not null,
  unit varchar(50) not null,
  category varchar(100) not null,
  expiry_date DATE,
  is_running_low BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Recipes table 
create table if not exists recipes (
  id UUID primary key default uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name varchar(255) not null,
  description TEXT,
  cuisine_type varchar(100),
  difficulty varchar(20) DEFAULT 'medium',
  prep_time int,
  cook_time int,
  servings int default 4,
  instructions JSONB not null,
  dietary_tags text[] default '{}',
  user_notes text,
  image_url text,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- create recipe_ingredients table
create table if not exists recipe_ingredients (
  id UUID primary key default uuid_generate_v4(),
  recipe_id UUID REFERENCES recipes(id) on delete cascade,
  ingredient_name varchar(255) not null,
  quantity decimal(10, 2) not null,
  unit varchar(50) not null, 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- create recipe nutrition table
create table if not exists recipe_nutrition (
  id UUID primary key default uuid_generate_v4(),
  recipe_id UUID REFERENCES recipes(id) on delete cascade,
  calories int,
  protein decimal(10, 2),
  carbs decimal(10, 2),
  fats decimal(10, 2),
  fibre decimal(10, 2) not null,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(recipe_id)
);

-- Meal plans table
create table if not exists meal_plans (
  id UUID primary key default uuid_generate_v4(),
  user_id UUID REFERENCES users(id) on delete cascade,
  recipe_id UUID REFERENCES recipes(id) on delete cascade,
  meal_date date not null,
  meal_type varchar(20) not null check(meal_type in ('breakfast', 'lunch', 'dinner')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, recipe_id, meal_date)
);

-- Shopping list table
create table if not exists shopping_list_items (
  id UUID primary key default uuid_generate_v4(),
  user_id UUID REFERENCES users(id) on delete cascade,
  ingredient_name varchar(255) not null,
  quantity decimal(10, 2) not null,
  unit varchar(50) not null, 
  category varchar(100),
  is_checked boolean default FALSE,
  from_meal_plan boolean default FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
create index if not exists idx_pantry_user_id on pantry_items(user_id);
create index if not exists idx_pantry_category on pantry_items(category);
create index if not exists idx_pantry_expiry on pantry_items(expiry_date);

create index if not exists idx_recipes_user_id on recipes(user_id);
create index if not exists idx_recipes_cuisine on recipes(cuisine_type);

create index if not exists idx_meal_plans_user_date on meal_plans(user_id, meal_date);

create index if not exists idx_shopping_list_user on shopping_list_items(user_id);

-- Create function to update timestamps
create or replace function update_updated_at_column()
returns TRIGGER as $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  return NEW;
end;
$$ language 'plpgsql';

-- create triggers for updated at
create trigger update_users_updated_at before update on users
  for each row execute function update_updated_at_column();

create trigger update_user_preferences_updated_at before update on user_preferences
  for each row execute function update_updated_at_column();

create trigger update_pantry_items_updated_at before update on pantry_items
  for each row execute function update_updated_at_column();

create trigger update_recipes_updated_at before update on recipes
  for each row execute function update_updated_at_column();

create trigger update_meal_plans_updated_at before update on meal_plans
  for each row execute function update_updated_at_column();

create trigger update_shopping_list_items_updated_at before update on shopping_list_items
  for each row execute function update_updated_at_column();