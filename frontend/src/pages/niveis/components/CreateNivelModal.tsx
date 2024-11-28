import { Button } from "@/components/ui/button";
import { toaster } from "@/components/ui/toaster";
import { Box, Flex, Input, Spinner, Text } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import NivelService from "../service";
import { AxiosError } from "axios";

type CreateNivelModalProps = {
  show: boolean;
  closeModal: () => void;
  updateContentTable: () => Promise<void>;
};

export const CreateNivelModal = ({ show, closeModal, updateContentTable }: CreateNivelModalProps) => {
  if (!show) {
    return null;
  }

  const [nivel, setNivel] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreate = useCallback(async () => {
    if (!nivel.trim()) {
      setError("Por favor, preencha o campo.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await NivelService.create(nivel);

      toaster.create({
        title: "Nível criado com sucesso",
        description: "O nível foi criado com sucesso.",
        type: "success",
        duration: 5000,
      });

      updateContentTable();

      setNivel("");
      closeModal();
    } catch (error) {
      let errorMessage = "Ocorreu um erro ao criar o nível, tente novamente.";

      if (error instanceof AxiosError) {
        errorMessage = error.response?.data.error.map((e: any) => e.message).join(', ') || errorMessage;
      }

      toaster.create({
        title: "Erro ao criar nível",
        description: errorMessage,
        type: "error",
        duration: 5000,
      });
    }

    setLoading(false);
  }, [nivel]);

  return (
    <Flex
      position="fixed"
      top={0}
      left={0}
      w="100vw"
      h="100vh"
      bg="blackAlpha.600"
      backdropFilter="blur(2px)"
      zIndex={10}
      justify="center"
      align="center"
      onClick={closeModal}
    >
      <Box
        bg="gray.800"
        p={6}
        rounded="md"
        shadow="lg"
        w="500px"
        maxW="90%"
        onClick={(e) => e.stopPropagation()}
      >
        <Text
          fontSize="2xl"
          mb={4}
          fontWeight="bold"
        >
          Cadastrar Nível
        </Text>
        <Input
          placeholder="Digite o nível"
          value={nivel}
          onChange={(e) => setNivel(e.target.value)}
          mb={4}
          variant="subtle"
          p={2}
        />
        {error && (
          <Text color="red.500" mb={4}>
            {error}
          </Text>
        )}
        <Flex justify="flex-end" gap={3}>
          <Button p={2} variant="ghost" onClick={closeModal}>
            Cancelar
          </Button>
          <Button p={2} colorScheme="blue" onClick={handleCreate}>
            {loading ? (<Spinner size="sm" />) : (<>Cadastrar</>)}
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}