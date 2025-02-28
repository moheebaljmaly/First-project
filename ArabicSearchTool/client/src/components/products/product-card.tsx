import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@shared/schema";
import { useLocation } from "wouter";

export function ProductCard({ product }: { product: Product }) {
  const [, setLocation] = useLocation();

  return (
    <Card 
      className="overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]"
      onClick={() => setLocation(`/product/${product.id}`)}
      role="button"
      tabIndex={0}
    >
      <CardHeader className="p-0">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-lg hover:text-primary transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground">{product.manufacturer}</p>
          </div>
          <Badge 
            variant={product.isBoycotted === "نعم" ? "destructive" : "secondary"}
          >
            {product.isBoycotted === "نعم" ? "مقاطعة" : "وطني"}
          </Badge>
        </div>

        {product.alternatives.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">البدائل المتوفرة:</p>
            <div className="flex flex-wrap gap-2">
              {product.alternatives.map((alt) => (
                <Badge key={alt} variant="outline">
                  {alt}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}