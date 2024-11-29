import { Button } from "@/components/ui/button";
import { toaster } from "@/components/ui/toaster";
import { Nivel } from "@/models/niveis";
import { Box, Flex, Input, Spinner, Text } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import NivelService from "../service";
import { useColorModeValue } from "@/components/ui/color-mode";

type UpdateNivelModalProps = {
  show: boolean;
  closeModal: () => void;
  updateContentTable: () => Promise<void>;
  nivel: Nivel;
};

export const UpdateNivelModal = ({ show, closeModal, updateContentTable, nivel }: UpdateNivelModalProps) => {
  if (!show) {
    return null;
  }

  const [nivelName, setNivelName] = useState(nivel.nivel);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpdate = useCallback(async () => {
    if (!nivelName.trim()) {
      setError("Por favor, preencha o campo.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await NivelService.update({
        id: nivel.id,
        nivel: nivelName,
      });

      toaster.create({
        title: "Nível alterado com sucesso",
        description: "O nível foi alterado com sucesso.",
        type: "success",
        duration: 5000,
      });

      updateContentTable();

      setNivelName("");
      closeModal();
    } catch (error) {
      let errorMessage = "Ocorreu um erro ao alterar o nível, tente novamente.";

      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.error?.map((e: { message: string }) => e.message).join(', ') || errorMessage;
      }

      toaster.create({
        title: "Erro ao alterar nível",
        description: errorMessage,
        type: "error",
        duration: 5000,
      });
    }

    setLoading(false);
  }, [nivelName]);

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
          color="white"
        >
          Alterar Nível
        </Text>
        <Input
          placeholder="Digite o nível"
          value={nivelName}
          onChange={(e) => setNivelName(e.target.value)}
          mb={4}
          variant="subtle"
          p={2}
          color={useColorModeValue("black", "white")}
        />
        {error && (
          <Text color="red.500" mb={4}>
            {error}
          </Text>
        )}
        <Flex justify="flex-end" gap={3}>
          <Button p={2} _hover={{ bg: "GrayText" }} color="white" variant="ghost" onClick={closeModal}>
            Cancelar
          </Button>
          <Button p={2} bgColor="orange.500" colorScheme="blue" onClick={handleUpdate}>
            {loading ? (<Spinner size="sm" />) : (<>Alterar</>)}
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}