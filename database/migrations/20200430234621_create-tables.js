exports.up = function (knex) {
  return knex.schema
    .createTable("user", (table) => {
      table.increments();
      table.string("username", 40).notNullable().unique().index();
      table.text("password").notNullable();
      table.string("email").notNullable().unique();
      table.string("display_name");
      table.string("url_slug");
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
      table.string("demo_url");
      table.string("repo_url");
      table.string("image_url");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("tech_stack", (table) => {
      table.increments();
      table.string("name").notNullable().unique().index();
    })
    .createTable("project_tech_stack", (table) => {
      table.increments();
      table.integer("project_id").notNullable().unsigned();
      table
        .foreign("project_id")
        .references("project.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.integer("tech_stack_id").notNullable().unsigned();
      table
        .foreign("tech_stack_id")
        .references("tech_stack.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
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
    .dropTableIfExists("project_tech_stack")
    .dropTableIfExists("tech_stack")
    .dropTableIfExists("project")
    .dropTableIfExists("user");
};
