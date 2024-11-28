import { Dispatch, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, VStack, Flex } from "@chakra-ui/react";
import { MdPeopleAlt } from "react-icons/md";
import { AiOutlineSolution, AiOutlineMenuUnfold, AiOutlineMenuFold } from "react-icons/ai";

type Option = "desenvolvedores" | "niveis";

type OptionProps = {
  id: Option;
  icon: JSX.Element;
  label: string;
  path: string;
};

type VerticalSlideBarProps = {
  isCollapsed: boolean;
  setIsCollapsed: Dispatch<React.SetStateAction<boolean>>;
};

export function VerticalSlideBar({ isCollapsed, setIsCollapsed }: VerticalSlideBarProps) {
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState<Option>("desenvolvedores");

  const options: OptionProps[] = [
    {
      id: "desenvolvedores",
      icon: <MdPeopleAlt />,
      label: "Desenvolvedores",
      path: "/",
    },
    {
      id: "niveis",
      icon: <AiOutlineSolution />,
      label: "Níveis",
      path: "/niveis",
    },
  ];

  const handleOptionClick = useCallback((option: OptionProps) => {
    setSelectedOption(option.id);
    navigate(option.path);
  }, []);

  return (
    <Flex
      as="nav"
      direction="column"
      bg="gray.800"
      color="white"
      h="100vh"
      borderRightWidth="1px"
      w={isCollapsed ? "80px" : "308px"}
      transition="width 0.3s"
      overflow="hidden"
    >
      <VStack align="stretch" p={4}>
        {options.map((option) => (
          <Button
            key={option.id}
            onClick={() => handleOptionClick(option)}
            justifyContent={isCollapsed ? "center" : "flex-start"}
            variant="ghost"
            bg={selectedOption === option.id ? "teal.500" : "transparent"}
            color={selectedOption === option.id ? "white" : "gray.400"}
            _hover={{ bg: "gray.700" }}
            w="full"
          >
            {option.icon} {!isCollapsed && option.label}
          </Button>
        ))}
      </VStack>
      <Box mt="auto" p={4}>
        <Button
          variant="ghost"
          onClick={() => setIsCollapsed(!isCollapsed)}
          w="full"
          justifyContent="center"
        >
          {
            isCollapsed
              ? <AiOutlineMenuUnfold />
              : <AiOutlineMenuFold />
          }
        </Button>
      </Box>
    </Flex>
  );
}
