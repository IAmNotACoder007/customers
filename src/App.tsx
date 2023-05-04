import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AppHeader } from "./components/AppHeader";
import { Customers } from "./components/Customers";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <AppHeader />
        <Customers />
      </div>
    </QueryClientProvider>
  );
}

export default App;
