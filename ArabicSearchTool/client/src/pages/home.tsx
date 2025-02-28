import { ProductList } from "@/components/products/product-list";
import { SearchBar } from "@/components/products/search-bar";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">
          ابحث عن المنتجات والبدائل الوطنية
        </h1>
        <p className="text-lg text-muted-foreground">
          اكتشف البدائل الوطنية والعربية للمنتجات
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <SearchBar onSearch={setSearchQuery} />
      </div>

      <ProductList searchQuery={searchQuery} />
    </div>
  );
}
