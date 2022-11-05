import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Checkbox, Divider, Flex, Heading, Image, HStack, Text } from '@chakra-ui/react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from 'src/services';
import { BackButton, NextButton } from 'src/components/buttons';
import { images, paths } from 'src/assets';
import type { Wallet } from 'src/types';

export const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const formValues: Wallet = location.state;

  // 注意事項１がチェックされているか（boolean）
  const [isNotes1Checked, setIsNotes1Checked] = useState<boolean>(false);
  const handleCheckBox1 = () => setIsNotes1Checked(!isNotes1Checked);

  // 注意事項２がチェックされているか（boolean）
  const [isNotes2Checked, setIsNotes2Checked] = useState<boolean>(false);
  const handleCheckBox2 = () => setIsNotes2Checked(!isNotes2Checked);

  // 注意事項１と２が両方ともチェック（true）されている時のみbuttonDisabledがfalseになり、有効化される
  const buttonDisabled = !isNotes1Checked || !isNotes2Checked;

  // firestoreにデータ送信中か（boolean）
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  /** 「送信」ボタン押下時の処理 */
  const onSubmit = async () => {
    // 公開時期がnowの場合、本日のDateオブジェクトを追加
    if (formValues.publicType === 'now') formValues.publicDate = new Date();
    // 公開時期がfutureの場合、YYYY-MM-DDの文字列をDateオブジェクトに変換
    if (formValues.publicType === 'future') formValues.publicDate = new Date(formValues.publicDate);

    try {
      // 「送信」ボタンのローディング開始
      setIsSubmitting(true);

      // firestoreにデータ保存
      await addDoc(collection(db, 'wallets'), formValues);

      // 保存後に完了画面に遷移
      navigate(paths.complete);
    } catch (e) {
      console.error('Error adding document: ', e);
    } finally {
      // 「送信」ボタンのローディング終了
      setIsSubmitting(false);
    }
  };

  /** 「もどる」ボタン押下時に前のページに戻る */
  const goBack = () => navigate(-1);

  /** YYYY-MM-DDの文字列 又は DateオブジェクトをYYYY/MM/DDの文字列に変換する関数 */
  const formatDate = (date: Date | string) => {
    // 文字列の場合
    if (typeof date === 'string') return date.replaceAll('-', '/');

    // Dateオブジェクトの場合
    const y = date.getFullYear();
    const m = ('00' + (date.getMonth() + 1)).slice(-2);
    const d = ('00' + date.getDate()).slice(-2);
    return y + '/' + m + '/' + d;
  };

  return (
    <Flex justify="space-between">
      {/* 左側の確認表示エリア */}
      <Box w="700px" ml="100" my={20}>
        {/* 進捗状況の画像 */}
        <Image src={images.step2} alt="step1" w="100%" mb={16} />

        {/* グレーのエリア */}
        <Box bg="gray.50" mb={16} borderRadius={10}>
          <Box py={10} px={12}>
            <Heading as="h2" sx={{ fontSize: '24px' }} mb={8} noOfLines={1}>
              入力内容の確認
            </Heading>

            <Text fontSize="md" color="gray.700">
              NetWork
            </Text>
            <Text fontSize="md" color="black" sx={{ fontWeight: '700' }} mb={4}>
              {formValues.network}
            </Text>

            <Text fontSize="md" color="gray.700">
              Wallet address
            </Text>
            <Text fontSize="md" color="black" sx={{ fontWeight: '700' }} mb={4}>
              {formValues.walletAddress}
            </Text>

            <Text fontSize="md" color="gray.700">
              秘密鍵
            </Text>
            <Text fontSize="md" color="black" sx={{ fontWeight: '700' }} mb={4}>
              {formValues.secretKey}
            </Text>

            <Text fontSize="md" color="gray.700">
              受取人へのメッセージ
            </Text>
            <Text fontSize="md" color="black" sx={{ fontWeight: '700' }} mb={4}>
              {formValues.messageToRecipient}
            </Text>

            {formValues.publicType === 'future' && (
              <>
                <Text fontSize="md" color="gray.700">
                  Wallet情報の公開日
                </Text>
                <Text fontSize="md" color="black" sx={{ fontWeight: '700' }} mb={12}>
                  {formatDate(formValues.publicDate)}
                </Text>
              </>
            )}

            <Divider my={12} />

            <Heading as="h2" sx={{ fontSize: '24px' }} color="black" mb={2} noOfLines={1}>
              注意事項
            </Heading>
            <Text fontSize="md" color="black" mb={6}>
              下記項目を確認し、チェックを入れお進みください
            </Text>

            {/* 注意事項１ */}
            <Box
              bg="red.50"
              px={4}
              py={5}
              mb={6}
              borderWidth="1px"
              borderColor="red.300"
              borderRadius="lg"
            >
              <Checkbox color="black" isChecked={isNotes1Checked} onChange={handleCheckBox1}>
                {formValues.publicType === 'now'
                  ? 'いますぐWalletの情報が公開されます。公開するWalletには、不要な資産のみ残してください。'
                  : 'システムの不具合など不測の事態により、公開日より早くWalletAddressと秘密鍵が公開される恐れがあります'}
              </Checkbox>
            </Box>

            {/* 注意事項２ */}
            <Box
              bg="red.50"
              px={4}
              py={5}
              mb={6}
              borderWidth="1px"
              borderColor="red.300"
              borderRadius="lg"
            >
              <Checkbox color="black" isChecked={isNotes2Checked} onChange={handleCheckBox2}>
                1度公開したらもとに戻せません。取引の記録を消すこともできません。
              </Checkbox>
            </Box>
          </Box>
        </Box>

        {/* ボタン */}
        <HStack spacing="12px" justify="center">
          <Box w="200px">
            <BackButton buttonText="もどる" onClick={goBack} />
          </Box>
          <Box w="230px">
            <NextButton
              buttonText={
                formValues.publicType === 'now'
                  ? 'Wallet 情報を公開する'
                  : 'Wallet 情報を公開予約する'
              }
              onClick={onSubmit}
              disabled={buttonDisabled}
              isSubmitting={isSubmitting}
            />
          </Box>
        </HStack>
      </Box>

      {/* 右側の画像 */}
      <Image src={images.giveWallet} alt="Walletをあげる" h="100vh" position="sticky" top="0" />
    </Flex>
  );
};
