// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration
import { piquetteConfig } from "~/app/_config";
import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  pgEnum,
  timestamp,
  jsonb,
  serial,
  text,
  varchar,
  unique,
  numeric,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `${piquetteConfig.meta.id}_${name}`);

/** Services
 * 
 * Favorites
 * Save
 * Like
 * Dislike
 * Archive
 * Shared
 * Pinned
 * 
 * Services are intented to work across multiple models though the actions component.
 * It's probably best to not modify these in any manner.
*/
export const favorites = createTable(
  "favorite",
  {
    id: serial("id").primaryKey(),
    cuid: varchar("cuid", { length: 256 }).notNull(),
    profile: serial("profile_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    objectId: serial("object_id").notNull(), // ID of the referenced object
    objectType: varchar("object_type", { length: 256 }).notNull(), // Type of the object (e.g., document, business)
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    createdBy: varchar("created_by", { length: 256 }).notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
    updatedBy: varchar("updated_by", { length: 256 }).notNull(),
    archivedAt: timestamp("archived_at", { withTimezone: true }),
    archivedBy: varchar("archived_by", { length: 256 }),
  },
  (table) => ({
    // Composite unique constraint to ensure each object/type combo is unique
    uniqueObjectType: unique().on(table.profile,table.objectId, table.objectType),
  })
);

export const saves = createTable(
  "save",
  {
    id: serial("id").primaryKey(),
    cuid: varchar("cuid", { length: 256 }).notNull(),
    profile: serial("profile_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    objectId: serial("object_id").notNull(), // ID of the referenced object
    objectType: varchar("object_type", { length: 256 }).notNull(), // Type of the object (e.g., document, business)
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    createdBy: varchar("created_by", { length: 256 }).notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
    updatedBy: varchar("updated_by", { length: 256 }).notNull(),
    archivedAt: timestamp("archived_at", { withTimezone: true }),
    archivedBy: varchar("archived_by", { length: 256 }),
  },
  (table) => ({
    // Composite unique constraint to ensure each object/type combo is unique
    uniqueObjectType: unique().on(table.profile,table.objectId, table.objectType),
  })
);

export const likes = createTable(
  "like",
  {
    id: serial("id").primaryKey(),
    cuid: varchar("cuid", { length: 256 }).notNull(),
    profile: serial("profile_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    objectId: serial("object_id").notNull(), // ID of the referenced object
    objectType: varchar("object_type", { length: 256 }).notNull(), // Type of the object (e.g., document, business)
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    createdBy: varchar("created_by", { length: 256 }).notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
    updatedBy: varchar("updated_by", { length: 256 }).notNull(),
    archivedAt: timestamp("archived_at", { withTimezone: true }),
    archivedBy: varchar("archived_by", { length: 256 }),
  },
  (table) => ({
    // Composite unique constraint to ensure each object/type combo is unique
    uniqueObjectType: unique().on(table.profile,table.objectId, table.objectType),
  })
);

export const dislikes = createTable(
  "dislike",
  {
    id: serial("id").primaryKey(),
    cuid: varchar("cuid", { length: 256 }).notNull(),
    profile: serial("profile_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    objectId: serial("object_id").notNull(), // ID of the referenced object
    objectType: varchar("object_type", { length: 256 }).notNull(), // Type of the object (e.g., document, business)
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    createdBy: varchar("created_by", { length: 256 }).notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
    updatedBy: varchar("updated_by", { length: 256 }).notNull(),
    archivedAt: timestamp("archived_at", { withTimezone: true }),
    archivedBy: varchar("archived_by", { length: 256 }),
  },
  (table) => ({
    // Composite unique constraint to ensure each object/type combo is unique
    uniqueObjectType: unique().on(table.profile,table.objectId, table.objectType),
  })
);

export const shares = createTable(
  "share",
  {
    id: serial("id").primaryKey(),
    cuid: varchar("cuid", { length: 256 }).notNull(),
    profile: serial("profile_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    objectId: serial("object_id").notNull(), // ID of the referenced object
    objectType: varchar("object_type", { length: 256 }).notNull(), // Type of the object (e.g., document, business)
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    createdBy: varchar("created_by", { length: 256 }).notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
    updatedBy: varchar("updated_by", { length: 256 }).notNull(),
    archivedAt: timestamp("archived_at", { withTimezone: true }),
    archivedBy: varchar("archived_by", { length: 256 }),
  },
  (table) => ({
    // Composite unique constraint to ensure each object/type combo is unique
    uniqueObjectType: unique().on(table.profile,table.objectId, table.objectType),
  })
);

export const archives = createTable(
  "archive",
  {
    id: serial("id").primaryKey(),
    cuid: varchar("cuid", { length: 256 }).notNull(),
    profile: serial("profile_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    objectId: serial("object_id").notNull(), // ID of the referenced object
    objectType: varchar("object_type", { length: 256 }).notNull(), // Type of the object (e.g., document, business)
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    createdBy: varchar("created_by", { length: 256 }).notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
    updatedBy: varchar("updated_by", { length: 256 }).notNull(),
    archivedAt: timestamp("archived_at", { withTimezone: true }),
    archivedBy: varchar("archived_by", { length: 256 }),
  },
  (table) => ({
    // Composite unique constraint to ensure each object/type combo is unique
    uniqueObjectType: unique().on(table.profile,table.objectId, table.objectType),
  })
);

export const pins = createTable(
  "pin",
  {
    id: serial("id").primaryKey(),
    cuid: varchar("cuid", { length: 256 }).notNull(),
    profile: serial("profile_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    objectId: serial("object_id").notNull(), // ID of the referenced object
    objectType: varchar("object_type", { length: 256 }).notNull(), // Type of the object (e.g., document, business)
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    createdBy: varchar("created_by", { length: 256 }).notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
    updatedBy: varchar("updated_by", { length: 256 }).notNull(),
    archivedAt: timestamp("archived_at", { withTimezone: true }),
    archivedBy: varchar("archived_by", { length: 256 }),
  },
  (table) => ({
    // Composite unique constraint to ensure each object/type combo is unique
    uniqueObjectType: unique().on(table.profile,table.objectId, table.objectType),
  })
);

/** Models
 *  Prifiles: Required object for the application to function.
 */


// Enums

export const businessStatusEnum = pgEnum("status", [...piquetteConfig.app.businessStatusTypes.map(businessStatusType => businessStatusType.value)] as [string, ...string[]]);

export const organizationStatusEnum = pgEnum("status", [...piquetteConfig.app.organizationStatusTypes.map(organizationStatusType => organizationStatusType.value)] as [string, ...string[]]);

export const assistantTypeEnum = pgEnum("type", [...piquetteConfig.app.assistantTypes.map(assistantType => assistantType.value)] as [string, ...string[]]);


// Profiles Table
export const profiles = createTable("profile", {
  id: serial("id").primaryKey(),
  cuid: varchar("cuid", { length: 256 }).notNull(),
  uuid: varchar("uuid").default(sql`gen_random_uuid()`),
  token: varchar("token", { length: 32 }),
  user: varchar("user", { length: 256 }).notNull(),
  provider: varchar("provider", { length: 256 }).notNull(),
  name: varchar("name", { length: 256 }),
  description: text("description"),
  type: varchar("type", { length: 16 }),
  avatar: varchar("avatar", { length: 256 }),
  settings: jsonb("settings"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  createdBy: varchar("created_by", { length: 256 }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(() => new Date()),
  updatedBy: varchar("updated_by", { length: 256 }).notNull(),
  archivedAt: timestamp("archived_at", { withTimezone: true }),
  archivedBy: varchar("archived_by", { length: 256 }),
});

// Organizations Table
export const organizations = createTable("organization", {
  id: serial("id").primaryKey(),
  cuid: varchar("cuid", { length: 256 }).notNull(),
  token: varchar("token", { length: 32 }),
  profile: integer("profile_id")
    .references(() => profiles.id, { onDelete: "cascade" }),
  status: organizationStatusEnum("status").default("pending"),
  name: varchar("name", { length: 256 }).notNull(),
  location: varchar("location", { length: 256 }).notNull(),
  url: varchar("url", { length: 256 }),
  industry: varchar("industry", { length: 256 }),
  description: text("description"),
  settings: jsonb("settings"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  createdBy: varchar("created_by", { length: 256 }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(() => new Date()),
  updatedBy: varchar("updated_by", { length: 256 }).notNull(),
  archivedAt: timestamp("archived_at", { withTimezone: true }),
  archivedBy: varchar("archived_by", { length: 256 }),
});

// Businesses Table
export const businesses = createTable("business", {
  id: serial("id").primaryKey(),
  cuid: varchar("cuid", { length: 256 }).notNull(),
  token: varchar("token", { length: 32 }),
  profile: integer("profile_id")
    .references(() => profiles.id, { onDelete: "cascade" }),
  parentType: varchar("parent_type", { length: 16 }), // "profile" or "organization"
  parentId: integer("parent_id"), // ID of the profile or organization
  status: businessStatusEnum("status").default("pending"),
  name: varchar("name", { length: 256 }).notNull(),
  location: varchar("location", { length: 256 }).notNull(),
  url: varchar("url", { length: 256 }),
  industry: varchar("industry", { length: 256 }),
  description: text("description"),
  settings: jsonb("settings"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  createdBy: varchar("created_by", { length: 256 }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(() => new Date()),
  updatedBy: varchar("updated_by", { length: 256 }).notNull(),
  archivedAt: timestamp("archived_at", { withTimezone: true }),
  archivedBy: varchar("archived_by", { length: 256 }),
});

// Assistants Table
export const assistants = createTable("assistant", {
  id: serial("id").primaryKey(),
  cuid: varchar("cuid", { length: 256 }).notNull(),
  token: varchar("token", { length: 32 }),
  profile: integer("profile_id")
    .references(() => profiles.id, { onDelete: "cascade" }),
  parentType: varchar("parent_type", { length: 16 }), // "profile" or "organization"
  parentId: integer("parent_id"), // ID of the profile or organization
  name: varchar("name", { length: 256 }).notNull(),
  type: assistantTypeEnum("status").default("assistant"),
  description: text("description"),
  prompt: text("prompt"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  createdBy: varchar("created_by", { length: 256 }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(() => new Date()),
  updatedBy: varchar("updated_by", { length: 256 }).notNull(),
  archivedAt: timestamp("archived_at", { withTimezone: true }),
  archivedBy: varchar("archived_by", { length: 256 }),
});

export const jobs = createTable("job", {
  id: serial("id").primaryKey(),
  cuid: varchar("cuid", { length: 256 }).notNull(),
  profile: integer("profile_id")
    .references(() => profiles.id, { onDelete: "cascade" }),
  parentType: varchar("parent_type", { length: 16 }), // "profile" or "organization"
  parentId: integer("parent_id"), // ID of the profile or organization
  name: varchar("name", { length: 256 }).notNull(),
  description: text("description"),
  role: varchar("role", { length: 256 }).notNull(),
  type: varchar("type", { length: 256 }).notNull(),
  payment: varchar("payment", { length: 256 }).notNull(),
  status: varchar("status", { length: 256 }).notNull().default("draft"),

  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  createdBy: varchar("created_by", { length: 256 }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(() => new Date()),
  updatedBy: varchar("updated_by", { length: 256 }).notNull(),
  archivedAt: timestamp("archived_at", { withTimezone: true }),
  archivedBy: varchar("archived_by", { length: 256 }),
})

export const orders = createTable("order", {
  id: serial("id").primaryKey(),
  cuid: varchar("cuid", { length: 256 }).notNull(),
  uuid: varchar("uuid").default(sql`gen_random_uuid()`),
  token: varchar("token", { length: 32 }),
  profile: integer("profile_id")
    .references(() => profiles.id, { onDelete: "cascade" }),
  business: integer("business_id")
    .references(() => businesses.id, { onDelete: "cascade" }),
  organization: integer("organization_id")
    .references(() => organizations.id, { onDelete: "cascade" }),
  
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  
  status: varchar("status", { length: 256 }).notNull().default("draft"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  createdBy: varchar("created_by", { length: 256 }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(() => new Date()),
  updatedBy: varchar("updated_by", { length: 256 }).notNull(),
  archivedAt: timestamp("archived_at", { withTimezone: true }),
  archivedBy: varchar("archived_by", { length: 256 }),
})

