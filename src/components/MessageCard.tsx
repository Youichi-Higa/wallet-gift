import { Box, Text } from '@chakra-ui/react';

type Props = {
  message: string;
  onConfirmationModalOpen: () => void;
};

export const MessageCard = (props: Props) => {
  const { message, onConfirmationModalOpen } = props;

  return (
    <Box
      bg="gray.50"
      _hover={{ bg: 'gray.100' }}
      w="100%"
      p={7}
      borderRadius="3xl"
      sx={{ cursor: 'pointer' }}
      onClick={onConfirmationModalOpen}
    >
      <Text>{message}</Text>
    </Box>
  );
};
