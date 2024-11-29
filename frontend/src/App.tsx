import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { VerticalSlideBar } from "./components/ui/vertical-slide-bar";
import AppRoutes from "./routes";

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Flex>
          <VerticalSlideBar
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />

          <Box ml={isCollapsed ? "70px" : "10%" } w="full" p={4}>
            <AppRoutes />
          </Box>
        </Flex>
      </BrowserRouter>
    </>
  );
}

export default App;
