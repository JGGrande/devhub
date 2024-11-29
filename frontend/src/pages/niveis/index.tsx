import { PaginatedContent } from "@/@types/pagination";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { Nivel } from "@/models/niveis";
import { Box, Flex, IconButton, Input, Table } from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FcNext, FcPrevious } from "react-icons/fc";
import { CreateNivelModal } from "./components/CreateNivelModal";
import { DeleteNivelModal } from "./components/DeleteNivelModal";
import Loading from "./components/Loading";
import { UpdateNivelModal } from "./components/UpdateNivelModal";
import NivelService from "./service";

function NivelPage() {
  const [niveis, setNiveis] = useState<Nivel[]>([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateNivelModal, setShowCreateNivelModal] = useState(false);
  const [showDeleteNivelModal, setShowDeleteNivelModal] = useState(false);
  const [nivelIdSelectedToDelete, setNivelIdSelectedToDelete] = useState<number>();
  const [showUpdateNivelModal, setShowUpdateNivelModal] = useState(false);
  const [nivelSelectedToUpdate, setNivelSelectedToUpdate] = useState<Nivel>();
  const [meta, setMeta] = useState<PaginatedContent<Nivel>["meta"]>();

  const paginationInfo = useMemo(() => {
    const start = (page - 1) * (meta?.per_page ?? 0) + 1;
    const end = Math.min(page * (meta?.per_page ?? 0), meta?.total ?? 0);
    const total = meta?.total;

    return { start, end, total };
  }, [page, meta]);

  const fetchNiveis = useCallback(async () => {
    setIsLoading(true);

    try {
      const { data, meta } = await NivelService.findAll(page);

      setNiveis(data);
      setMeta(meta);
    } catch (error) {
      setNiveis([]);
      setMeta(undefined);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  const searchNiveis = useCallback(async () => {
    setIsLoading(true);
    setPage(1);

    try {
      const { data, meta } = await NivelService.findAll(page, searchTerm);

      setNiveis(data);
      setMeta(meta);
    } catch (error) {
      setNiveis([]);
      setMeta(undefined);
    } finally {
      setIsLoading(false);
    }
  }, [page, searchTerm]);

  useEffect(() => {
    const searchTermHaveMinLength = searchTerm.length >= 3;
    const searchTermIsEmpty = searchTerm.length === 0;

    if (searchTermHaveMinLength) {
      searchNiveis();
      return;
    }

    if (searchTermIsEmpty) {
      fetchNiveis();
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchNiveis();
  }, [page]);

  const handleClickUpdateNivel = useCallback((nivel: Nivel) => {
    setNivelSelectedToUpdate(nivel);
    setShowUpdateNivelModal(true);
  }, []);

  const handleClickDeleteNivel = useCallback((nivelId: number) => {
    setNivelIdSelectedToDelete(nivelId);
    setShowDeleteNivelModal(true);
  }, []);

  return (
    <Flex justify="center">
      <Box w={"40vw"} p={4}>
        <Loading visible={isLoading} />

        <Toaster />

        <CreateNivelModal
          show={showCreateNivelModal}
          closeModal={() => setShowCreateNivelModal(false)}
          updateContentTable={fetchNiveis}
        />

        <UpdateNivelModal
          show={showUpdateNivelModal}
          closeModal={() => setShowUpdateNivelModal(false)}
          updateContentTable={fetchNiveis}
          nivel={nivelSelectedToUpdate!}
        />

        <DeleteNivelModal
          show={showDeleteNivelModal}
          closeModal={() => setShowDeleteNivelModal(false)}
          updateContentTable={fetchNiveis}
          nivelId={nivelIdSelectedToDelete!}
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
            onClick={() => setShowCreateNivelModal(true)}
          >
            Adicionar
          </Button>
        </Flex>

        <Table.Root variant="outline" size="lg">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader p={3}><strong>ID</strong></Table.ColumnHeader>
              <Table.ColumnHeader><strong>Nível</strong></Table.ColumnHeader>
              <Table.ColumnHeader
                pr={8}
                textAlign="end"
              ><strong>Ações</strong></Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {niveis?.length === 0 && (
              <Table.Row>
                <Table.Cell colSpan={3} p={3}>
                  Nenhum nível encontrado
                </Table.Cell>
              </Table.Row>
            )}
            {niveis.map((nivel) => (
              <Table.Row key={nivel.id}>
                <Table.Cell p={3}><strong>{nivel.id}</strong>
                </Table.Cell>
                <Table.Cell>{nivel.nivel}</Table.Cell>
                <Table.Cell
                  pr={4}
                  textAlign="end"
                >
                  <Flex gap={3} justifyContent="flex-end">
                    <IconButton
                      aria-label="Editar"
                      onClick={() => handleClickUpdateNivel(nivel)}
                      variant="solid"
                      size="sm"
                    >
                      <FaEdit />
                    </IconButton>
                    <IconButton
                      aria-label="Excluir"
                      onClick={() => handleClickDeleteNivel(nivel.id)}
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

export default NivelPage;
