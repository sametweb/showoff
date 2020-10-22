exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("user")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("user").insert([
        { username: "john", password: "123", email: "john@doe.com" },
        { username: "jane", password: "123", email: "jane@doe.com" },
        { username: "jack", password: "123", email: "jack@doe.com" },
      ]);
    });
};
