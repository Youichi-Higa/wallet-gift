import { Box, Flex, Text } from '@chakra-ui/react';
import { GiveButton, PickUpButton } from 'src/components/buttons';

type Props = {
  title: string;
  text: string;
  buttonText: string;
};

export const Card = (props: Props) => {
  const { title, text, buttonText } = props;

  return (
    <Flex
      bg="white"
      w="500px"
      h="300px"
      p={10}
      borderRadius="xl"
      color="#392C6F"
      align="center"
      justify="center"
      direction="column"
    >
      <Text as="b" fontSize="4xl" mb={4}>
        {title}
      </Text>
      <Text fontSize="lg" mb={10}>
        {text}
      </Text>

      <Box w="255px">
        {title === 'Wallet を持っている方' ? (
          <GiveButton buttonText={buttonText} />
        ) : (
          <PickUpButton buttonText={buttonText} />
        )}
      </Box>
    </Flex>
  );
};
