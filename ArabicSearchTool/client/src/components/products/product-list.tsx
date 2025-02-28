import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "./product-card";
import type { Product } from "@shared/schema";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function ProductList({ searchQuery = "" }) {
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: searchQuery ? ["/api/products/search", searchQuery] : ["/api/products"],
    queryFn: async () => {
      const url = searchQuery 
        ? `/api/products/search?q=${encodeURIComponent(searchQuery)}`
        : "/api/products";
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    }
  });

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          حدث خطأ أثناء تحميل المنتجات. يرجى المحاولة مرة أخرى.
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="h-80 bg-muted animate-pulse rounded-lg"
            role="progressbar"
            aria-label="جاري تحميل المنتجات"
          />
        ))}
      </div>
    );
  }

  if (!products?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">لم يتم العثور على منتجات</p>
      </div>
    );
  }

  return (
    <div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      role="list"
      aria-label="قائمة المنتجات"
    >
      {products.map((product) => (
        <div key={product.id} role="listitem">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}