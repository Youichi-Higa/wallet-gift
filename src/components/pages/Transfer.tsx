import { useNavigate } from 'react-router-dom';
import { Box, Flex, Image } from '@chakra-ui/react';
import { NextButton } from 'src/components/buttons';
import { images, paths } from 'src/assets';

export const Transfer = () => {
  const navigate = useNavigate();

  /** トップページに遷移 */
  const GoToTopPage = () => navigate(paths.top);

  return (
    <Flex justify="space-between">
      {/* 左側のフォームエリア */}
      <Flex w="700px" ml="100" my={20} direction="column" justify="center" align="center">
        {/* 進捗状況の画像 */}
        <Image src={images.step3} alt="step1" w="100%" mb={16} />

        <img src={images.complete} alt="ありがとうございます！Wallet情報が送信されました" />

        <Box w="200px" mt={16}>
          <NextButton buttonText="Topに戻る" onClick={GoToTopPage} />
        </Box>
      </Flex>

      {/* 右側の画像 */}
      <Image src={images.giveWallet} alt="Walletをあげる" h="100vh" position="sticky" top="0"/>
    </Flex>
  );
};
