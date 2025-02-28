import { products, type Product, type InsertProduct } from "@shared/schema";
import { db } from "./db";
import { eq, ilike, or } from "drizzle-orm";

export interface IStorage {
  getAllProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductByBarcode(barcode: string): Promise<Product | undefined>;
  searchProducts(query: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
}

export class DatabaseStorage implements IStorage {
  async getAllProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async getProductByBarcode(barcode: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.barcode, barcode));
    return product;
  }

  async searchProducts(query: string): Promise<Product[]> {
    return await db.select().from(products).where(
      or(
        ilike(products.name, `%${query}%`),
        ilike(products.manufacturer, `%${query}%`)
      )
    );
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [created] = await db.insert(products).values(product).returning();
    return created;
  }

  async initializeProducts() {
    const sampleProducts: InsertProduct[] = [
      {
        name: "شوكولاتة حليب",
        manufacturer: "كادبوري",
        country: "إسرائيل",
        barcode: "7622210889478",
        isBoycotted: "نعم",
        category: "حلويات",
        alternatives: ["جالاكسي العربية", "الغزالي للشوكولاتة"],
        imageUrl: "https://placehold.co/400x400/png"
      },
      {
        name: "عصير برتقال",
        manufacturer: "الربيع",
        country: "السعودية",
        barcode: "6281057410123",
        isBoycotted: "لا",
        category: "مشروبات",
        alternatives: [],
        imageUrl: "https://placehold.co/400x400/png"
      },
      {
        name: "مشروب غازي",
        manufacturer: "كوكاكولا",
        country: "الولايات المتحدة",
        barcode: "5449000000996",
        isBoycotted: "نعم",
        category: "مشروبات",
        alternatives: ["سفن اب العربية", "زمزم"],
        imageUrl: "https://placehold.co/400x400/png"
      },
      {
        name: "شيبس",
        manufacturer: "ليز",
        country: "إسرائيل",
        barcode: "7300400481489",
        isBoycotted: "نعم",
        category: "وجبات خفيفة",
        alternatives: ["شيبس السعودية", "شيبس عمان"],
        imageUrl: "https://placehold.co/400x400/png"
      },
      // إضافة المزيد من المنتجات
      {
        name: "آيس كريم",
        manufacturer: "بن آند جيريز",
        country: "الولايات المتحدة",
        barcode: "76222108894123",
        isBoycotted: "نعم",
        category: "حلويات",
        alternatives: ["آيس كريم السعودية", "بوظة عربية"],
        imageUrl: "https://placehold.co/400x400/png"
      },
      {
        name: "قهوة",
        manufacturer: "ستاربكس",
        country: "الولايات المتحدة",
        barcode: "7622210889987",
        isBoycotted: "نعم",
        category: "مشروبات",
        alternatives: ["كافيه عربي", "قهوة السعودية"],
        imageUrl: "https://placehold.co/400x400/png"
      },
      {
        name: "معكرونة",
        manufacturer: "أوسم",
        country: "إسرائيل",
        barcode: "7622210889432",
        isBoycotted: "نعم",
        category: "طعام",
        alternatives: ["معكرونة الكويتية", "معكرونة السعودية"],
        imageUrl: "https://placehold.co/400x400/png"
      }
    ];

    for (const product of sampleProducts) {
      try {
        await this.createProduct(product);
      } catch (error) {
        console.error(`Failed to create product ${product.name}:`, error);
      }
    }
  }
}

export const storage = new DatabaseStorage();

// Initialize products
storage.initializeProducts().catch(console.error);