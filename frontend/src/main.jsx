import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import ChatProvier from "./context/ChatProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ChatProvier>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </ChatProvier>
  </BrowserRouter>
);
