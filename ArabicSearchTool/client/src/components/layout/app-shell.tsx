import { MoonIcon, SunIcon, SearchIcon, BarcodeIcon } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              منتجات بديلة
            </h1>
          </Link>
          
          <nav className="flex items-center gap-4">
            <Link href="/search">
              <Button variant="ghost" size="icon">
                <SearchIcon className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/scan">
              <Button variant="ghost" size="icon">
                <BarcodeIcon className="h-5 w-5" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
