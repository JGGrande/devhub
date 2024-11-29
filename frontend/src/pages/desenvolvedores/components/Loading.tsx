import React from 'react';
import { Flex, Spinner, Text } from '@chakra-ui/react';

type SpinnerSize = "inherit" | "xs" | "sm" | "md" | "lg" | "xl";

type LoadingProps = {
  visible: boolean;
  size?: SpinnerSize;
  color?: string;
  message?: string;
};

const Loading: React.FC<LoadingProps> = ({
  size = 'xl',
  color = 'blue.500',
  message = 'Carregando...',
  visible
}) => {
  if (!visible) {
    return null;
  }

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      h="100vh"
      w="100%"
      zIndex={9999}
    >
      <Spinner size={size} color={color} mb={4} />
      {message && <Text fontSize="lg" color="gray.600">{message}</Text>}
    </Flex>
  );
};

export default Loading;
