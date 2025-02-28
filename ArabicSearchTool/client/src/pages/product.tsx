import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Globe, Building2, Factory } from "lucide-react";
import type { Product } from "@shared/schema";

export default function ProductPage() {
  const [, setLocation] = useLocation();
  const { id } = useParams<{ id: string }>();

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: [`/api/products/${id}`],
    enabled: !!id
  });

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="h-64 bg-muted animate-pulse rounded-lg" />
        <div className="space-y-4">
          <div className="h-8 bg-muted animate-pulse rounded w-1/3" />
          <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
          <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">المنتج غير موجود</h2>
        <Button onClick={() => setLocation("/")} variant="outline">
          <ArrowRight className="h-4 w-4 ml-2" />
          العودة للصفحة الرئيسية
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <Button
        onClick={() => setLocation("/")}
        variant="ghost"
        className="mb-4"
      >
        <ArrowRight className="h-4 w-4 ml-2" />
        العودة للصفحة الرئيسية
      </Button>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full aspect-square object-cover rounded-lg"
          />
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <Badge 
                variant={product.isBoycotted === "نعم" ? "destructive" : "secondary"}
                className="text-sm"
              >
                {product.isBoycotted === "نعم" ? "مقاطعة" : "وطني"}
              </Badge>
            </div>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">الشركة المصنعة:</span>
                  <span>{product.manufacturer}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">بلد المنشأ:</span>
                  <span>{product.country}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Factory className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">التصنيف:</span>
                  <span>{product.category}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {product.alternatives.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">البدائل المتوفرة</h2>
              <Card>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {product.alternatives.map((alternative) => (
                      <li
                        key={alternative}
                        className="flex items-center gap-2 text-lg"
                      >
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        {alternative}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}