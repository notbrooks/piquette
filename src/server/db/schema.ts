// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration
import { piquetteConfig } from "~/app/config";
import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  timestamp,
  serial,
  text,
  varchar,
  unique,
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

export const profiles = createTable(
  "profile",
  {
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
);
