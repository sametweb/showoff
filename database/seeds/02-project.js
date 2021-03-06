exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("project")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("project").insert([
        {
          user_id: 1,
          name: "Blog project",
          short_description: "In this project, we created a blog project",
        },
        {
          user_id: 2,
          name: "Forum project",
          short_description: "In this project, we created a forum",
        },
        {
          user_id: 3,
          name: "E-commerce project",
          short_description: "In this project, we created an e-commerce system",
        },
      ]);
    });
};
