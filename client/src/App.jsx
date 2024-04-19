import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Residency from "./Residency/Residency";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReactQueryDevtools } from "react-query/devtools";
import Property from "./pages/Property/Property";
import Bookings from "./components/Bookings/Bookings";
import Favorites from "./components/Favorites/Favorites";
function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/residency">
              <Route index element={<Residency />} />
              <Route path=":id" element={<Property />} />
            </Route>

            <Route path="/bookings" element={<Bookings />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
