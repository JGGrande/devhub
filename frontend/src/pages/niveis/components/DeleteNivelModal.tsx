import { Button } from "@/components/ui/button";
import { toaster } from "@/components/ui/toaster";
import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import NivelService from "../service";

type DeleteNivelModalProps = {
  show: boolean;
  closeModal: () => void;
  updateContentTable: () => Promise<void>;
  nivelId: number;
};

export const DeleteNivelModal = ({ show, closeModal, updateContentTable, nivelId }: DeleteNivelModalProps) => {
  if (!show) {
    return null;
  }

  const [loading, setLoading] = useState(false);

  const handleDelete = useCallback(async () => {
    setLoading(true);

    try {
      await NivelService.delete(nivelId);

      toaster.create({
        title: "Nível deletado com sucesso",
        description: "O nível foi deletado com sucesso.",
        type: "success",
        duration: 5000,
      });

      updateContentTable();

      closeModal();
    } catch (error) {
      let errorMessage = "Ocorreu um erro ao deletar o nível, tente novamente.";

      if (error instanceof AxiosError) {
        if(error.response?.status === 404 || error.response?.status === 409) {
          errorMessage = error.response?.data.message;
        }

        if(error.response?.status === 400) {
          errorMessage = error.response?.data.error.map((e: any) => e.message).join(', ') || errorMessage;
        }
      }

      toaster.create({
        title: "Erro ao deletar nível",
        description: errorMessage,
        type: "error",
        duration: 5000,
      });
    }

    setLoading(false);
  }, []);

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
        w="450px"
        maxW="90%"
        onClick={(e) => e.stopPropagation()}
      >
        <Text
          fontSize="2xl"
          mb={4}
          fontWeight="bold"
          color="white"
        >
          Deseja deletar nível?
        </Text>
        <Flex justify="flex-end" gap={3}>
          <Button p={2} _hover={{ bg: "GrayText" }} color="white" variant="ghost" onClick={closeModal}>
            Cancelar
          </Button>
          <Button p={2} bgColor="red.500" onClick={handleDelete}>
            {loading ? (<Spinner size="sm" />) : (<Text color="white">Deletar</Text>)}
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}