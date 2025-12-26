import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./app";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  // <SidebarProvider>
  //   <Provider store={store}>
  //     <BrowserRouter>
  //       <StrictMode>
  //         <App />
  //       </StrictMode>
  //     </BrowserRouter>
  //   </Provider>
  // </SidebarProvider>
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <SidebarProvider>
          <App />
          {/* <SidebarTrigger /> */}
        </SidebarProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
