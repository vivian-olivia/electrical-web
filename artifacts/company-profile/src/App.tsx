import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { LanguageProvider } from '@/i18n/LanguageContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';

// Pages
import Home from '@/pages/Home';
import About from '@/pages/About';
import ProjectDetail from '@/pages/ProjectDetail';
import Products from '@/pages/Products';
import Contact from '@/pages/Contact';

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/tentang-kami" component={About} />
          <Route path="/tentang-kami/proyek/:slug" component={ProjectDetail} />
          <Route path="/produk" component={Products} />
          <Route path="/hubungi-kami" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
