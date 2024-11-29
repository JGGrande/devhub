import { EmptyState } from "@/components/ui/empty-state";
import { Center } from "@chakra-ui/react";
import { FiXOctagon } from "react-icons/fi";

function NotFoundPage(){

  return (
    <Center h="70vh">
      <EmptyState
        icon={<FiXOctagon color="red" />}
        title="Página não encontrada"
      />
    </Center>
  );
}

export default NotFoundPage;