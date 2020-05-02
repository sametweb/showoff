exports.up = function (knex) {
  return knex.schema
    .createTable("user", (table) => {
      table.increments();
      table.string("username", 40).notNullable().unique().index();
      table.text("password").notNullable();
      table.string("email").notNullable().unique();
      table.string("display_name");
    })
    .createTable("project", (table) => {
      table.increments();
      table.integer("user_id").notNullable().unsigned();
      table
        .foreign("user_id")
        .references("user.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("name").notNullable().index();
      table.string("short_description").notNullable();
      table.text("description");
      table.boolean("approved").defaultTo(true);
      table.string("demo_url");
      table.string("repo_url");
      table.string("image_url");
      table.text("tech_stack");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("comment", (table) => {
      table.increments();
      table.integer("user_id").notNullable().unsigned();
      table
        .foreign("user_id")
        .references("user.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.integer("project_id").notNullable().unsigned();
      table
        .foreign("project_id")
        .references("project.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.text("text").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("comment")
    .dropTableIfExists("project")
    .dropTableIfExists("user");
};
