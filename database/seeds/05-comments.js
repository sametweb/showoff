exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("comment")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("comment").insert([
        { user_id: 1, project_id: 3, text: "Looking good." },
        { user_id: 2, project_id: 1, text: "Very cool project." },
        { user_id: 3, project_id: 2, text: "Loved it!" },
        { user_id: 2, project_id: 2, text: "Also loved it!" },
      ]);
    });
};
