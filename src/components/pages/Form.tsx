import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Heading,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Select,
  Text,
} from '@chakra-ui/react';
import { BackButton, NextButton } from 'src/components/buttons';

export const Form = () => {
  return (
    <Box w="700px" mx="auto" py={10}>
      <Heading as="h1" size="xl" mb={12} noOfLines={1} textAlign="center">
        Walletをあげる
      </Heading>

      <Box bg="gray.50" mb={12} borderRadius={10}>
        <Box py="40px" px="50px">
          <Heading as="h2" size="lg" mb={2} noOfLines={1}>
            Wallet情報の入力
          </Heading>
          <Text fontSize="lg" mb={6}>
            ご自身のWalletの情報をご入力ください
          </Text>

          <FormControl mb={6}>
            <FormLabel>NetWork</FormLabel>
            <Select placeholder="選択してください">
              <option value="1">イーサリアム　メインネット</option>
              <option value="2">ゴレリ　テストネットワーク</option>
              <option value="3">セポリア　テストネットワーク</option>
            </Select>
            <FormHelperText>対応NetWork：ここに書く</FormHelperText>
          </FormControl>

          <FormControl mb={6}>
            <FormLabel>Wallet Address</FormLabel>
            <Input type="text" placeholder="0xE94f1fa4F27D9d288FFeA234bB62E1fBC086CA0c" />
            <FormHelperText>お間違えのないようご注意ください。</FormHelperText>
          </FormControl>

          <FormControl mb={6}>
            <FormLabel>秘密鍵</FormLabel>
            <Input
              type="text"
              placeholder="0xE9kynr6nkt2i7298f4aryjxcu29pri4muchipynsb92rgfgrdrze9g4e9ptu4gc4ep4f1fa4F27D9d288FFeA234bB62E1fBC086CA0c"
            />
            <FormHelperText>注意書きが入ります</FormHelperText>
          </FormControl>

          <Divider mb={6} />

          <Heading as="h2" size="lg" mb={2} noOfLines={1}>
            公開日の設定
          </Heading>
          <Text fontSize="lg" mb={6}>
            Wallet情報を公開する日付を設定してください。
          </Text>

          <FormControl as="fieldset" mb={12}>
            <RadioGroup defaultValue="1">
              <HStack spacing="24px">
                <Radio value="1">いますぐ公開する</Radio>
                <Radio value="2">未来日で公開する</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel>Wallet情報の公開日</FormLabel>
            <Input size="md" type="date" />
            <FormHelperText>注意書きが入ります</FormHelperText>
          </FormControl>
        </Box>
      </Box>

      <HStack spacing="12px" justify="center">
        <Box w="200px">
          <BackButton buttonText="もどる" onClick={() => console.log('もどる')} />
        </Box>
        <Box w="200px">
          <NextButton buttonText="確認画面へ" onClick={() => console.log('次へ')} />
        </Box>
      </HStack>
    </Box>
  );
};
