import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Box,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Heading,
  HStack,
  Input,
  Image,
  Radio,
  RadioGroup,
  Select,
  Text,
} from '@chakra-ui/react';
import { AutoResizeTextarea } from 'src/components';
import { BackButton, NextButton } from 'src/components/buttons';
import { images, paths } from 'src/assets';
import type { Wallet } from 'src/types';

export const Form = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<Wallet>();

  // ネットワークの選択肢
  const networks = [
    'イーサリアム　メインネット',
    'ゴレリ　テストネットワーク',
    'セポリア　テストネットワーク',
  ] as const;

  /** 「未来日で公開する」が選択されているか(boolean) */
  const isFuture = watch('publicType') === 'future';

  /** 未来日が選択されているか(boolean) */
  const isFutureDate = (date: Date | string) => new Date(date) > new Date();

  /** 「確認画面へ」ボタン押下時の処理 */
  const onSubmit = (formValues: Wallet) => {
    // フォーム入力値を持って、確認画面に遷移
    navigate(paths.confirmation, { state: formValues });
  };

  /** 「もどる」ボタン押下時に前のページに戻る */
  const goBack = () => navigate(-1);

  return (
    <Flex justify="space-between">
      {/* 左側のフォームエリア */}
      <Box w="700px" ml="100" my={20}>
        {/* 進捗状況の画像 */}
        <Image src={images.step1} alt="step1" w="100%" mb={16} />

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* グレーのフォーム入力エリア */}
          <Box bg="gray.50" mb={16} borderRadius={10}>
            <Box py={10} px={12}>
              <Heading as="h2" sx={{ fontSize: '24px' }} mb={2} noOfLines={1}>
                Wallet情報の入力
              </Heading>
              <Text fontSize="lg" color="black" mb={6}>
                ご自身の不要なWalletの情報をご入力ください
              </Text>

              {/* ネットワーク入力欄 */}
              <FormControl mb={6} isInvalid={errors?.network !== undefined}>
                <FormLabel htmlFor="network" color="gray.700">
                  NetWork
                </FormLabel>
                <Select
                  id="network"
                  {...register('network', {
                    required: '必須です',
                  })}
                  placeholder="選択してください"
                >
                  {networks.map((network) => (
                    <option key={network} value={network}>
                      {network}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage> {errors?.network?.message}</FormErrorMessage>
              </FormControl>

              {/* ウォレットアドレス入力欄 */}
              <FormControl mb={6} isInvalid={errors?.walletAddress !== undefined}>
                <FormLabel htmlFor="walletAddress" color="gray.700">
                  Wallet address
                </FormLabel>
                <Input
                  id="walletAddress"
                  type="text"
                  placeholder="0xE94f1fa4F27D9d288FFeA234bB62E1fBC086CA0c"
                  {...register('walletAddress', {
                    required: '必須です',
                    minLength: {
                      value: 42,
                      message: '42桁で入力してください',
                    },
                    maxLength: {
                      value: 42,
                      message: '42桁で入力してください',
                    },
                    pattern: {
                      value: /^0x.+/,
                      message: '先頭は「0x」にしてください',
                    },
                  })}
                />
                <FormHelperText>「0x」からはじまる42桁の英数字の文字列です</FormHelperText>
                <FormErrorMessage>{errors?.walletAddress?.message}</FormErrorMessage>
              </FormControl>

              {/* 秘密鍵入力欄 */}
              <FormControl mb={6} isInvalid={errors?.secretKey !== undefined}>
                <FormLabel htmlFor="secretKey" color="gray.700">
                  秘密鍵
                </FormLabel>
                <Input
                  id="secretKey"
                  type="text"
                  placeholder="0xE9kynr6nkt2i7298f4aryjxcu29pri4muchipynsb92rgfgrdrze9g4e9ptu4gc4ep4f1fa4F27D9d288FFeA234bB62E1fBC086CA0c"
                  {...register('secretKey', {
                    required: '必須です',
                  })}
                />
                <FormHelperText>
                  「リカバリーフレーズ」「シードフレーズ」「ニーモニック」ではありません
                </FormHelperText>
                <FormErrorMessage>{errors?.secretKey?.message}</FormErrorMessage>
              </FormControl>

              {/* メッセージ入力欄 */}
              <FormControl mb={12} isInvalid={errors?.messageToRecipient !== undefined}>
                <FormLabel htmlFor="messageToRecipient" color="gray.700">
                  メッセージ（140字まで）
                </FormLabel>
                <AutoResizeTextarea
                  id="messageToRecipient"
                  resize="none"
                  placeholder="Cryptoの世界へようこそ！"
                  {...register('messageToRecipient', {
                    required: '必須です',
                    maxLength: {
                      value: 140,
                      message: '140文字を超えています',
                    },
                  })}
                />
                <FormHelperText>
                  Walletをひろった人へのメッセージです。おすすめのDappsなど記入してみてください
                </FormHelperText>
                <FormErrorMessage>{errors?.messageToRecipient?.message}</FormErrorMessage>
              </FormControl>

              <Divider mb={12} />

              <Heading as="h2" sx={{ fontSize: '24px' }} mb={2} noOfLines={1}>
                公開日の設定
              </Heading>
              <Text fontSize="md" color="black" mb={6}>
                Wallet情報を公開する日付を設定してください
              </Text>

              {/* 公開時期の選択 */}
              <FormControl as="fieldset" mb={6}>
                <RadioGroup defaultValue="now">
                  <HStack spacing="24px">
                    <Radio value="now" {...register('publicType')}>
                      いますぐ公開する
                    </Radio>
                    <Radio value="future" {...register('publicType')}>
                      未来日で公開する
                    </Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>

              {/* 未来日の設定 */}
              {isFuture && (
                <FormControl isInvalid={errors?.publicDate !== undefined}>
                  <FormLabel htmlFor="publicDate" color="gray.700">
                    Wallet情報の公開日
                  </FormLabel>
                  <Input
                    id="publicDate"
                    type="date"
                    {...register('publicDate', {
                      required: '必須です',
                      validate: {
                        futureDate: (inputDate) =>
                          isFutureDate(inputDate) || '明日以降で設定してください',
                      },
                    })}
                  />
                  <FormErrorMessage>{errors?.publicDate?.message}</FormErrorMessage>
                </FormControl>
              )}
            </Box>
          </Box>

          {/* ボタン */}
          <HStack spacing="12px" justify="center">
            <Box w="200px">
              <BackButton buttonText="もどる" onClick={goBack} />
            </Box>
            <Box w="200px">
              <NextButton buttonText="確認画面へ" />
            </Box>
          </HStack>
        </form>
      </Box>

      {/* 右側の画像 */}
      <Image src={images.giveWallet} alt="Walletをあげる" h="100vh" position="sticky" top="0" />
    </Flex>
  );
};
