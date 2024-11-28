import { Button } from "@/components/ui/button";
import { Box, Flex, Input, Spinner, Text } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import NivelService from "../service";
import { toaster, Toaster } from "@/components/ui/toaster";

type CreateNivelModalProps = {
  show: boolean;
  closeModal: () => void;
};

export const CreateNivelModal = ({ show, closeModal }: CreateNivelModalProps) => {
  if (!show) {
    return null;
  }

  const [nivel, setNivel] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = useCallback(async () => {
    setLoading(true);

    try{
      await NivelService.create(nivel);
    }catch(error){
      toaster.create({
        title: "Erro ao criar nível",
        description: "Ocorreu um erro ao criar o nível, tente novamente.",
        type: "error",
        duration: 5000,
      });
    }

    setLoading(false);

    setNivel("");
    closeModal();
  }, [nivel]);

  return (
    <Flex
      position="fixed"
      top={0}
      left={0}
      w="100vw"
      h="100vh"
      bg="blackAlpha.600"
      backdropFilter="blur(10px)"
      zIndex={10}
      justify="center"
      align="center"
    >
      <Toaster />

      <Box
        bg="white"
        p={6}
        rounded="md"
        shadow="lg"
        w="400px"
        maxW="90%"
      >
        <Text fontSize="xl" mb={4} fontWeight="bold">
          Cadastrar Nível
        </Text>
        <Input
          placeholder="Digite o nível"
          value={nivel}
          onChange={(e) => setNivel(e.target.value)}
          mb={4}
        />
        <Flex justify="flex-end" gap={3}>
          <Button variant="ghost" onClick={closeModal}>
            Cancelar
          </Button>
          <Button colorScheme="blue" onClick={handleCreate}>
          { loading ? (<Spinner size="sm" />) : (<>Cadastrar</>) }
          </Button>
        </Flex>
      </Box>

      <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        onClick={closeModal}
      />
    </Flex>
  );
}