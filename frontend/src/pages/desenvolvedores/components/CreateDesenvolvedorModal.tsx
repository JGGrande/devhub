import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import {
  Box,
  createListCollection,
  Flex,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import DesenvolvedorService from "../service";
import { toaster } from "@/components/ui/toaster";
import { desenvolvedorIsValidToSave } from "../validations";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { Nivel } from "@/models/niveis";

type CreateDesenvolvedorModal = {
  show: boolean;
  closeModal: () => void;
  updateContentTable: () => Promise<void>;
};

export const CreateDesenvolvedorModal = ({
  show,
  closeModal,
  updateContentTable,
}: CreateDesenvolvedorModal) => {
  if (!show) {
    return null;
  }

  const [loading, setLoading] = useState(false);
  const [niveis, setNiveis] = useState<Nivel[]>([]);

  const [nome, setNome] = useState("");
  const [sexo, setSexo] = useState("M");
  const [nivelId, setNivelId] = useState(0);
  const [dataNascimento, setDataNascimento] = useState(new Date());
  const [hobby, setHobby] = useState("");

  const [errors, setErrors] = useState({
    nome: "",
    sexo: "",
    nivelId: "",
    dataNascimento: "",
    hobby: "",
  });

  const sexoList = createListCollection({
    items: [
      { label: "Masculino", value: "M" },
      { label: "Feminino", value: "F" },
      { label: "Prefiro não informar", value: "P" },
    ],
  });

  const niveisList = createListCollection({
    items: niveis.map((nivel) => ({
      label: nivel.nivel,
      value: nivel.id.toString(),
    })),
  });

  const fetchNiveis = useCallback(async () => {
    const { data } = await DesenvolvedorService.findAllNiveis();

    setNivelId(data[0].id);
    setNiveis(data);
  }, []);

  const handleCreate = useCallback(async () => {
    const { valid, errors: validationErrors } = desenvolvedorIsValidToSave({
      nome,
      dataNascimento,
      hobby,
      nivelId: nivelId!,
      sexo,
    });

    if (!valid) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      await DesenvolvedorService.create({
        nome,
        dataNascimento,
        hobby,
        nivelId: nivelId!,
        sexo,
      });

      toaster.create({
        title: "Desenvolvedor criado com sucesso",
        description: "O desenvolvedor foi criado com sucesso.",
        type: "success",
        duration: 5000,
      });

      updateContentTable();

      setNome("");
      setSexo("M");
      setHobby("");
      setDataNascimento(new Date());
      setNivelId(0);
      setErrors({
        nome: "",
        sexo: "",
        nivelId: "",
        dataNascimento: "",
        hobby: "",
      });

      closeModal();
    } catch (error) {
      console.log(error);
      let errorMessage =
        "Ocorreu um erro ao criar o desenvolvedor, tente novamente.";

      if (error instanceof AxiosError) {
        errorMessage =
          error.response?.data.error
            .map((e: { message: string }) => e.message)
            .join(", ") || errorMessage;
      }

      toaster.create({
        title: "Erro ao criar desenvolvedor",
        description: errorMessage,
        type: "error",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  }, [nome, dataNascimento, hobby, sexo, nivelId]);

  useEffect(() => {
    fetchNiveis();
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
        w="600px"
        maxW="90%"
        onClick={(e) => e.stopPropagation()}
      >
        <Text fontSize="2xl" mb={4} fontWeight="bold">
          Cadastrar desenvolvedor
        </Text>

        <Box p={6} border="1px" borderColor="gray.300" borderRadius="md">
          <Field required label="Nome" mb={6}>
            <Input
              type="text"
              name="nome"
              placeholder="Digite o nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              variant="subtle"
              p={2}
            />
            {errors.nome && <Text color="red.500">{errors.nome}</Text>}
          </Field>

          <SelectRoot
            mb={6}
            collection={niveisList}
            size="md"
            variant="subtle"
            value={[nivelId.toString()]}
            onValueChange={({ value }) => setNivelId(+value[0])}
          >
            <SelectLabel>Nível</SelectLabel>
            <SelectTrigger>
              <SelectValueText p={2} placeholder="Escolha um nível" />
            </SelectTrigger>
            <SelectContent p={2}>
              {niveisList.items.map((nivel) => (
                <SelectItem item={nivel} key={nivel.value}>
                  {nivel.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
          {errors.nivelId && <Text color="red.500">{errors.nivelId}</Text>}

          <SelectRoot
            mb={6}
            collection={sexoList}
            size="md"
            variant="subtle"
            value={[sexo]}
            onValueChange={({ value }) => setSexo(value[0])}
          >
            <SelectLabel>Sexo</SelectLabel>
            <SelectTrigger>
              <SelectValueText p={2} />
            </SelectTrigger>
            <SelectContent p={2}>
              {sexoList.items.map((sexo) => (
                <SelectItem item={sexo} key={sexo.value}>
                  {sexo.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
          {errors.sexo && <Text color="red.500">{errors.sexo}</Text>}

          <Field required label="Data de nascimento" mb={6}>
            <Input
              type="date"
              variant="subtle"
              p={2}
              value={dataNascimento.toISOString().split("T")[0]}
              onChange={(e) => setDataNascimento(e.target.valueAsDate!)}
            />
            {errors.dataNascimento && (
              <Text color="red.500">{errors.dataNascimento}</Text>
            )}
          </Field>

          <Field required label="Hobby">
            <Input
              type="text"
              name="text"
              placeholder="Digite o hobby"
              value={hobby}
              onChange={(e) => setHobby(e.target.value)}
              variant="subtle"
              p={2}
            />
            {errors.hobby && <Text color="red.500">{errors.hobby}</Text>}
          </Field>
        </Box>

        <Flex justify="flex-end" gap={3}>
          <Button p={2} variant="ghost" onClick={closeModal}>
            Cancelar
          </Button>
          <Button p={2} colorScheme="blue" onClick={handleCreate}>
            {loading ? <Spinner size="sm" /> : <>Cadastrar</>}
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};
