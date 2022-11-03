import { useNavigate } from 'react-router-dom';
import { Box, Flex, Heading } from '@chakra-ui/react';
import { NextButton } from 'src/components/buttons';
import { paths } from 'src/const';

export const Complete = () => {
  const navigate = useNavigate();
  const GoToTop = () => navigate(paths.top);

  return (
    <Flex w="700px" mx="auto" py={10} direction="column" justify="center" align="center">
      {/* タイトル */}
      <Heading as="h1" sx={{ fontSize: '32px' }} mb={12} noOfLines={1}>
        Walletをあげる
      </Heading>

      <img
        src={`${process.env.PUBLIC_URL}/complete.png`}
        alt="ありがとうございます！Wallet情報が送信されました"
      />

      <Box w="200px" mt={16}>
        <NextButton buttonText="Topに戻る" onClick={GoToTop} />
      </Box>
    </Flex>
  );
};
