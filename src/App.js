// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// components
import ScrollToTop from "./components/scroll-to-top";
import { StyledChart } from "./components/chart";
import { Slide, ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./app/store";

import "react-toastify/dist/ReactToastify.css";
import { OverlayLoader } from "./common";

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <ScrollToTop />
        <StyledChart />
        <Router />
        <OverlayLoader />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          transition={Slide}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          theme="colored"
        />
      </Provider>
    </ThemeProvider>
  );
}
