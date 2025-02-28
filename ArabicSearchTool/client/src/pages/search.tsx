import { ProductList } from "@/components/products/product-list";
import { SearchBar } from "@/components/products/search-bar";
import { useState } from "react";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">
          البحث عن المنتجات
        </h1>
        <p className="text-muted-foreground">
          ابحث عن المنتجات بالاسم أو الشركة المصنعة
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <SearchBar onSearch={setSearchQuery} />
      </div>

      <ProductList searchQuery={searchQuery} />
    </div>
  );
}
