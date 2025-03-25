import bcrypt from "bcrypt";

const tableName = "users";
const tableNameMeta = "user_meta";

const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(tableName).truncate();
  await knex(tableNameMeta).truncate();

  // password is "secret123"
  const password = "secret123";
  const hashedPassword = await bcrypt.hash(password, 12);

  // insert 5 users with meta and different roles (1-3)
  await knex(tableName).insert([
    {
      role_id: 1,
      firstname: "Batman",
      lastname: "Admin",
      email: "admin@example.com",
      password: hashedPassword,
    },
    {
      role_id: 2,
      firstname: "Robin",
      lastname: "Editor",
      email: "robin@example.com",
      password: hashedPassword,
    },
    {
      role_id: 3,
      firstname: "Joker",
      lastname: "Reader",
      email: "joker@example.com",
      password: hashedPassword,
    },
    {
      role_id: 3,
      firstname: "Catwoman",
      lastname: "Reader",
      email: "catwoman@example.com",
      password: hashedPassword,
    },
    {
      role_id: 3,
      firstname: "Penguin",
      lastname: "Reader",
      email: "penguin@example.com",
      password: hashedPassword,
    },
  ]);

  // insert user meta with age & bio
  await knex(tableNameMeta).insert([
    {
      user_id: 1,
      age: 35,
      bio: "I am Batman",
    },
    {
      user_id: 2,
      age: 25,
      bio: "I am Robin",
    },
    {
      user_id: 3,
      age: 45,
      bio: "I am Joker",
    },
    {
      user_id: 4,
      age: 30,
      bio: "I am Catwoman",
    },
    {
      user_id: 5,
      age: 40,
      bio: "I am Penguin",
    },
  ]);
};

export { seed };