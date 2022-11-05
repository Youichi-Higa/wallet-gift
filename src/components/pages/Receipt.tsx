import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Divider, Flex, Heading, Image, Link, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { images, paths } from 'src/assets';
import { BackButton, NextButton } from 'src/components/buttons';
import type { Wallet } from 'src/types';

export const Receipt = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const wallet: Wallet = location.state;

  /** イーサリアムに遷移 */
  const GoToEthereum = () => (window.location.href = 'https://ethereum.org/ja/wallets/');

  /** トップページに遷移 */
  const GoToTopPage = () => navigate(paths.top);

  return (
    <Flex justify="space-between">
      {/* 左側の画像エリア */}
      <Box minW="450px" h="100vh" position="sticky" top="0">
        {/* 画像 */}
        <Image src={images.getWallet} alt="Walletをあげる" h="100vh" position="sticky" top="0" />

        {/* 画像内の「Walletをあげる」ページへのリンクメッセージ */}
        <Box bg="white" p={2} w="75%" position="absolute" top="70%" left="15%">
          <Text
            fontSize="xs"
            color="#4776E6"
            sx={{ fontFamily: 'Noto Sans JP', fontWeight: 'bold' }}
          >
            不要なWalletがある方、死んだ後にそなえてだれかに
            <br />
            Walletあげたい方は
            <Link as={RouterLink} to={paths.form} sx={{ textDecoration: 'underline' }}>
              こちら
            </Link>
            からWallet情報を登録できます
          </Text>
        </Box>
      </Box>

      {/* 右側のグレーのエリア */}
      <Box bg="gray.50" w="700px" h="50%" mt={20} mx="auto" borderRadius={40}>
        <Box py={10} px={12}>
          <Heading as="h2" sx={{ fontSize: '24px' }} mb={8} noOfLines={1}>
            Wallet情報
          </Heading>

          <Text fontSize="md" color="gray.700">
            NetWork
          </Text>
          <Text fontSize="md" color="black" sx={{ fontWeight: '700' }} mb={4}>
            {wallet.network}
          </Text>

          <Text fontSize="md" color="gray.700">
            Wallet address
          </Text>
          <Text fontSize="md" color="black" sx={{ fontWeight: '700' }} mb={4}>
            {wallet.walletAddress}
          </Text>

          <Text fontSize="md" color="gray.700">
            秘密鍵
          </Text>
          <Text fontSize="md" color="black" sx={{ fontWeight: '700' }} mb={4}>
            {wallet.secretKey}
          </Text>

          <Divider my={12} />

          <Heading as="h2" sx={{ fontSize: '24px' }} color="black" mb={6} noOfLines={1}>
            もらったWalletを使ってみましょう！
          </Heading>

          {/* ボタン */}
          <Box mb={6}>
            <NextButton buttonText="イーサリアムの公式サイトへ" onClick={GoToEthereum} />
          </Box>
          <Box>
            <BackButton buttonText="Topにもどる" onClick={GoToTopPage} />
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};
