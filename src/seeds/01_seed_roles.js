const tableName = "roles";

const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(tableName).truncate();
  await knex(tableName).insert([
    {
      name: "Admin",
      slug: "admin",
    },
    {
      name: "Editor",
      slug: "editor",
    },
    {
      name: "Reader",
      slug: "reader",
    },
  ]);
};

export { seed };