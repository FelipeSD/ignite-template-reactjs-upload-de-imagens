import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link, Box,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay/>
      <ModalContent>
        <Image
          maxW={"900px"}
          maxH={"600px"}
          src={imgUrl}
          alt={"image"} />
        <Box bgColor={"pGray.800"} p={"1"}>
          <Link href={imgUrl} isExternal>
              Abrir original
          </Link>
        </Box>
      </ModalContent>
    </Modal>
  );
}
