import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Camera } from "lucide-react";
import type { Product } from "@shared/schema";
import { BrowserMultiFormatReader } from "@zxing/browser";

export default function Scan() {
  const [barcode, setBarcode] = useState("");
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReader = useRef<BrowserMultiFormatReader>();

  // Initialize the code reader
  useEffect(() => {
    codeReader.current = new BrowserMultiFormatReader();
    return () => {
      if (codeReader.current) {
        codeReader.current.stopStreams();
      }
    };
  }, []);

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["/api/products/barcode", barcode],
    queryFn: async () => {
      if (!barcode) return null;
      const res = await fetch(`/api/products/barcode/${barcode}`);
      if (!res.ok) throw new Error("Product not found");
      return res.json();
    },
    enabled: !!barcode
  });

  const startScanning = async () => {
    try {
      setScanning(true);
      setError("");

      // Get video input devices using the static method
      const videoInputDevices = await BrowserMultiFormatReader.listVideoInputDevices();

      if (!videoInputDevices || videoInputDevices.length === 0) {
        throw new Error("لم يتم العثور على كاميرا");
      }

      // Use the first available camera
      const selectedDeviceId = videoInputDevices[0].deviceId;

      if (videoRef.current && codeReader.current) {
        await codeReader.current.decodeFromVideoDevice(
          selectedDeviceId,
          videoRef.current,
          (result) => {
            if (result) {
              setBarcode(result.getText());
              stopScanning();
            }
          }
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ أثناء تشغيل الكاميرا");
      setScanning(false);
    }
  };

  const stopScanning = () => {
    if (codeReader.current) {
      codeReader.current.stopStreams();
      codeReader.current.stopAsyncDecode();
    }
    setScanning(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (codeReader.current) {
        codeReader.current.stopStreams();
        codeReader.current.stopAsyncDecode();
      }
    };
  }, []);

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">مسح الباركود</h1>
        <p className="text-muted-foreground">
          قم بمسح الباركود للتحقق من المنتج
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex gap-2">
            <Input
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              placeholder="أدخل رقم الباركود"
            />
            <Button 
              onClick={scanning ? stopScanning : startScanning}
              variant={scanning ? "destructive" : "default"}
            >
              {scanning ? (
                "إيقاف"
              ) : (
                <>
                  <Camera className="h-4 w-4 ml-2" />
                  مسح
                </>
              )}
            </Button>
          </div>

          {scanning && (
            <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border-2 border-primary/50 animate-pulse" />
            </div>
          )}

          {error && (
            <div className="text-destructive text-sm text-center">
              {error}
            </div>
          )}

          {isLoading && (
            <div className="text-center py-8">
              <div className="animate-pulse">جاري البحث...</div>
            </div>
          )}

          {product && (
            <div className="space-y-4">
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-muted-foreground">
                {product.manufacturer} - {product.country}
              </p>
              {product.alternatives.length > 0 && (
                <div>
                  <p className="font-medium mb-2">البدائل المتوفرة:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {product.alternatives.map((alt) => (
                      <li key={alt}>{alt}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}