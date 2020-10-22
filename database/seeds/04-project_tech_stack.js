exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("project_tech_stack")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("project_tech_stack").insert([
        { id: 1, project_id: 1, tech_stack_id: 1 },
        { id: 2, project_id: 1, tech_stack_id: 2 },
        { id: 3, project_id: 1, tech_stack_id: 3 },
        { id: 4, project_id: 2, tech_stack_id: 4 },
        { id: 5, project_id: 2, tech_stack_id: 5 },
        { id: 6, project_id: 2, tech_stack_id: 6 },
        { id: 7, project_id: 3, tech_stack_id: 7 },
        { id: 8, project_id: 3, tech_stack_id: 8 },
      ]);
    });
};
