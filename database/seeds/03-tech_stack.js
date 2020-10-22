exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("tech_stack")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("tech_stack").insert([
        { id: 1, name: "React" },
        { id: 2, name: "JavaScript" },
        { id: 3, name: "CSS" },
        { id: 4, name: "HTML" },
        { id: 5, name: "Node" },
        { id: 6, name: "Express" },
        { id: 7, name: "GraphQL" },
        { id: 8, name: "Apollo" },
      ]);
    });
};
