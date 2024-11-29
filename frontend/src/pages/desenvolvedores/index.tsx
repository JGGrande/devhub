import { PaginatedContent } from "@/@types/pagination";
import { Desenvolvedor } from "@/models/desenvolvedor";
import { useCallback, useEffect, useMemo, useState, JSX } from "react";
import DesenvolvedorService from "./service";
import { Box, Flex, IconButton, Input, Table } from "@chakra-ui/react";
import Loading from "./components/Loading";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FcNext, FcPrevious } from "react-icons/fc";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import { TbGenderGenderless } from "react-icons/tb";
import { CreateDesenvolvedorModal } from "./components/CreateDesenvolvedorModal";
import { DeleteDesenvolvedorModal } from "./components/DeleteDesenvolvedorModal";
import { UpdateDesenvolvedorModal } from "./components/UpdateDesenvolvedorModal";


function DesenvolvedorPage(){
  const [desenvolvedores, setDesenvolvedores] = useState<Desenvolvedor[]>([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [meta, setMeta] = useState<PaginatedContent<Desenvolvedor>["meta"]>();

  const [showCreateDesenvolvedorModal, setShowCreateDesenvolvedorModal] = useState(false);

  const [showDeleteDesenvolvedorModal, setShowDeleteDesenvolvedorModal] = useState(false);
  const [desenvolvedorIdSelectedToDelete, setDesenvolvedorIdSelectedToDelete] = useState<number>();

  const [showUpdateDesenvolvedorModal, setShowUpdateDesenvolvedorModal] = useState(false);
  const [desenvolvedorSelectedToUpdate, setDesenvolvedorSelectedToUpdate] = useState<Desenvolvedor>();

  const sexoMapToIcon: Record<string, JSX.Element> = {
    "M": <BsGenderMale />,
    "F": <BsGenderFemale />,
    "P": <TbGenderGenderless />,
  }

  const paginationInfo = useMemo(() => {
    const start = (page - 1) * (meta?.per_page ?? 0) + 1;
    const end = Math.min(page * (meta?.per_page ?? 0), meta?.total ?? 0);
    const total = meta?.total;

    return { start, end, total };
  }, [page, meta]);

  const fetchDesenvolvedores = useCallback(async () => {
    setIsLoading(true);

    try {
      const { data, meta } = await DesenvolvedorService.findAll(page);

      setDesenvolvedores(data);
      setMeta(meta);
    } catch (error) {
      setDesenvolvedores([]);
      setMeta(undefined);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  const searchDesenvolvedores = useCallback(async () => {
    setIsLoading(true);
    setPage(1);

    try {
      const { data, meta } = await DesenvolvedorService.findAll(page, searchTerm);

      setDesenvolvedores(data);
      setMeta(meta);
    } catch (error) {
      setDesenvolvedores([]);
      setMeta(undefined);
    } finally {
      setIsLoading(false);
    }
  }, [page, searchTerm]);

  useEffect(() => {
    const searchTermHaveMinLength = searchTerm.length >= 3;
    const searchTermIsEmpty = searchTerm.length === 0;

    if (searchTermHaveMinLength) {
      searchDesenvolvedores();
      return;
    }

    if (searchTermIsEmpty) {
      fetchDesenvolvedores();
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchDesenvolvedores();
  }, [page]);

  const handleClickUpdateDesenvolvedor = useCallback((desenvolvedor: Desenvolvedor) => {
    setDesenvolvedorSelectedToUpdate(desenvolvedor);
    setShowUpdateDesenvolvedorModal(true);
  }, []);

  const handleClickDeleteDesenvolvedor = useCallback((desenvolvedorId: number) => {
    setDesenvolvedorIdSelectedToDelete(desenvolvedorId);
    setShowDeleteDesenvolvedorModal(true);
  }, []);

  return (
    <Flex justify="center">
      <Box w={"60vw"} p={4}>
        <Loading visible={isLoading} />

        <Toaster />

        <CreateDesenvolvedorModal
          show={showCreateDesenvolvedorModal}
          closeModal={() => setShowCreateDesenvolvedorModal(false)}
          updateContentTable={fetchDesenvolvedores}
        />

        <UpdateDesenvolvedorModal
          show={showUpdateDesenvolvedorModal}
          closeModal={() => setShowUpdateDesenvolvedorModal(false)}
          updateContentTable={fetchDesenvolvedores}
          desenvolvedor={desenvolvedorSelectedToUpdate!}
        />

        <DeleteDesenvolvedorModal
          show={showDeleteDesenvolvedorModal}
          closeModal={() => setShowDeleteDesenvolvedorModal(false)}
          desenvolvedorId={desenvolvedorIdSelectedToDelete!}
          updateContentTable={fetchDesenvolvedores}
        />

        <Flex justify="space-between" mb={4}>
          <Input
            placeholder="Buscar níveis..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            width="300px"
            padding={4}
          />
          <Button
            variant="solid"
            padding={4}
            onClick={() => setShowCreateDesenvolvedorModal(true)}
          >
            Adicionar
          </Button>
        </Flex>

        <Table.Root variant="outline" size="lg">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader p={3}><strong>ID</strong></Table.ColumnHeader>
              <Table.ColumnHeader><strong>Nome</strong></Table.ColumnHeader>
              <Table.ColumnHeader><strong>Nível</strong></Table.ColumnHeader>
              <Table.ColumnHeader><strong>Sexo</strong></Table.ColumnHeader>
              <Table.ColumnHeader><strong>Idade</strong></Table.ColumnHeader>
              <Table.ColumnHeader><strong>Hobby</strong></Table.ColumnHeader>
              <Table.ColumnHeader
                pr={8}
                textAlign="end"
              ><strong>Ações</strong></Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {desenvolvedores.length === 0 && (
              <Table.Row>
                <Table.Cell colSpan={3} p={3}>
                  Nenhum desenvolvedor encontrado
                </Table.Cell>
              </Table.Row>
            )}
            {desenvolvedores.map((desenvolvedor) => (
              <Table.Row key={desenvolvedor.id}>
                <Table.Cell p={3}>
                  <strong>{desenvolvedor.id}</strong>
                </Table.Cell>
                <Table.Cell>{desenvolvedor.nome}</Table.Cell>
                <Table.Cell>{desenvolvedor.nivel.nivel}</Table.Cell>
                <Table.Cell>{sexoMapToIcon[desenvolvedor.sexo]}</Table.Cell>
                <Table.Cell>{desenvolvedor.idade}</Table.Cell>
                <Table.Cell>
                  {
                    desenvolvedor.hobby.length > 50
                      ? `${desenvolvedor.hobby.substring(0, 50)}...`
                      : desenvolvedor.hobby
                  }
                </Table.Cell>
                <Table.Cell
                  pr={4}
                  textAlign="end"
                >
                  <Flex gap={3} justifyContent="flex-end">
                    <IconButton
                      aria-label="Editar"
                      onClick={() => handleClickUpdateDesenvolvedor(desenvolvedor)}
                      variant="solid"
                      size="sm"
                    >
                      <FaEdit />
                    </IconButton>
                    <IconButton
                      aria-label="Excluir"
                      onClick={() => handleClickDeleteDesenvolvedor(desenvolvedor.id)}
                      variant="surface"
                      size="sm"
                    >
                      <FaTrashAlt />
                    </IconButton>
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
        <Box mt={4}>
          <Box mt={4}>
            {meta?.total && (
              <strong>
                Exibindo {paginationInfo.start} - {paginationInfo.end} de um total de {paginationInfo.total}
              </strong>
            )}
          </Box>
        </Box>

        <Flex justify="center" align="center" mt={4}>
          <Button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            variant="ghost"
          >
            <FcPrevious />
          </Button>
          <Box mx={4}>Página {page}</Box>
          <Button
            onClick={() =>
              setPage((prev) =>
                meta?.last_page ? Math.min(prev + 1, meta.last_page) : prev + 1
              )
            }
            disabled={meta && page === meta.last_page}
            variant="ghost"
          >
            <FcNext />
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}

export default DesenvolvedorPage;