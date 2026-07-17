/* Electric Blueprint routing: preserve the parent Lab shell while giving feature experiences stable, indexable paths. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import SaveMySeatRedirect from "./pages/SaveMySeatRedirect";
import TopicPage from "./pages/TopicPage";
import WhileYouSleep from "./pages/WhileYouSleep";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/topics/:id" component={TopicPage} />
      <Route path="/whileyousleep" component={WhileYouSleep} />
      <Route path="/savemyseat" component={SaveMySeatRedirect} />
      <Route path="/savemyseat/" component={SaveMySeatRedirect} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
