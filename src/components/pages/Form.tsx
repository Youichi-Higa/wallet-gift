import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
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
import { paths } from 'src/const/paths';
import type { FormValues } from 'src/types/FormValues';

export const Form = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  // ネットワークの選択肢
  const networks = [
    'イーサリアム　メインネット',
    'ゴレリ　テストネットワーク',
    'セポリア　テストネットワーク',
  ];

  // 「未来日で公開する」が選択されているか(boolean)
  const isFuture = watch('publicType') === 'future';

  // 未来日が選択されているか(boolean)
  const isFutureDate = (date: string) => new Date(date) > new Date();

  // 「確認画面へ」ボタン押下時の処理
  const onSubmit = (formValues: FormValues) => {
    console.log(formValues);

    // フォーム入力値を持って、確認画面に遷移
    navigate(paths.confirmation, { state: formValues });
  };

  // 「もどる」ボタン押下時の処理
  const goBack = () => navigate(-1);

  return (
    <Box w="700px" mx="auto" py={10}>
      {/* タイトル */}
      <Heading as="h1" sx={{ fontSize: '32px' }} mb={12} noOfLines={1} textAlign="center">
        Walletをあげる
      </Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* グレーのフォーム入力エリア */}
        <Box bg="gray.50" mb={12} borderRadius={10}>
          <Box py="40px" px="50px">
            <Heading as="h2" sx={{ fontSize: '24px' }} mb={2} noOfLines={1}>
              Wallet情報の入力
            </Heading>
            <Text fontSize="lg" color="black" mb={6}>
              ご自身の不要なWalletの情報をご入力ください
            </Text>

            {/* ネットワーク入力欄 */}
            <FormControl mb={6} isInvalid={typeof errors?.network?.message === 'string'}>
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
              <FormErrorMessage> {errors.network && errors.network.message}</FormErrorMessage>
            </FormControl>

            {/* ウォレットアドレス入力欄 */}
            <FormControl mb={6} isInvalid={typeof errors?.walletAddress?.message === 'string'}>
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
              <FormErrorMessage>
                {errors.walletAddress && errors.walletAddress.message}
              </FormErrorMessage>
            </FormControl>

            {/* 秘密鍵入力欄 */}
            <FormControl mb={6} isInvalid={typeof errors?.secretKey?.message === 'string'}>
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
              <FormErrorMessage>{errors.secretKey && errors.secretKey.message}</FormErrorMessage>
            </FormControl>

            <Divider mb={6} />

            <Heading as="h2" sx={{ fontSize: '24px' }} mb={2} noOfLines={1}>
              公開日の設定
            </Heading>
            <Text fontSize="md" color="black" mb={6}>
              Wallet情報を公開する日付を設定してください。
            </Text>

            {/* 公開時期の選択 */}
            <FormControl as="fieldset" mb={12}>
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
              <FormControl isInvalid={typeof errors?.publicDate?.message === 'string'}>
                <FormLabel htmlFor="publicDate" color="gray.700">
                  Wallet情報の公開日
                </FormLabel>
                <Input
                  id="publicDate"
                  type="date"
                  size="md"
                  {...register('publicDate', {
                    required: '必須です',
                    validate: {
                      futureDate: (inputDate) =>
                        isFutureDate(inputDate) || '明日以降で設定してください',
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.publicDate && errors.publicDate.message}
                </FormErrorMessage>
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
  );
};
