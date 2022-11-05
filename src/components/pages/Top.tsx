import { Box, Flex, Image, Link, Text, VStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { MessageCard } from 'src/components';
import { images, paths } from 'src/assets';

export const Top = () => {
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

      {/* 右側のメッセージ表示エリア */}
      <VStack w="70%" spacing="32px" p={20}>
        <MessageCard message="Cryptoの世界へようこそ！" />
        <MessageCard message="吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれ" />
        <MessageCard message="恥の多い生涯を送って来ました。自分には、人間の生活というものが、見当つかないのです。自分は東北の田舎" />
        <MessageCard message="ワリなガャぢヰあヘゥマでテんでンボマヮホごごナネヤナジプヂてょびュゎそべっさホろせムザデらダゐポヰおかやまホイモヹマッょにヒわさばそぐかィさばびゃづほにあなテむぜブちイやらどロそっばふとゼびほゃぬたろポィょねまぎよふナヲけやけわとヷこェくぼぅサぐろせケヶでッゅらザおめハてドラペズ" />
        <MessageCard message="吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれ" />
        <MessageCard message="Cryptoの世界へようこそ！" />
        <MessageCard message="吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれ" />
        <MessageCard message="恥の多い生涯を送って来ました。自分には、人間の生活というものが、見当つかないのです。自分は東北の田舎" />
        <MessageCard message="ワリなガャぢヰあヘゥマでテんでンボマヮホごごナネヤナジプヂてょびュゎそべっさホろせムザデらダゐポヰおかやまホイモヹマッょにヒわさばそぐかィさばびゃづほにあなテむぜブちイやらどロそっばふとゼびほゃぬたろポィょねまぎよふナヲけやけわとヷこェくぼぅサぐろせケヶでッゅらザおめハてドラペズ" />
        <MessageCard message="吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれ" />
      </VStack>
    </Flex>
  );
};
