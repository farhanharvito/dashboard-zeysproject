import {
  Box,
  Modal as Cmodal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

const ModalDetails = ({
  isOpen,
  onClose,
  title,
  withCloseIcon = false,
  children,
}) => {
  return (
    <Cmodal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {title}
          {withCloseIcon && <ModalCloseButton onClick={onClose} />}
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Cmodal>
  );
};

export default ModalDetails;
