import { pgTable, text, serial, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  manufacturer: text("manufacturer").notNull(),
  country: text("country").notNull(),
  barcode: varchar("barcode", { length: 13 }).notNull(),
  isBoycotted: text("is_boycotted").notNull(),
  category: text("category").notNull(),
  alternatives: text("alternatives").array().notNull(),
  imageUrl: text("image_url").notNull(),
});

export const insertProductSchema = createInsertSchema(products).omit({ id: true });

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;
