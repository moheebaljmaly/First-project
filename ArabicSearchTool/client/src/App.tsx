import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { AppShell } from "./components/layout/app-shell";
import Home from "./pages/home";
import Scan from "./pages/scan";
import Search from "./pages/search";
import Product from "./pages/product";
import NotFound from "./pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/scan" component={Scan} />
      <Route path="/search" component={Search} />
      <Route path="/product/:id" component={Product} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppShell>
        <Router />
      </AppShell>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;