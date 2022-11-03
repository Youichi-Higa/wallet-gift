import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Checkbox, Divider, Heading, HStack, Text } from '@chakra-ui/react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from 'src/services';
import { BackButton, NextButton } from 'src/components/buttons';
import { paths } from 'src/const';
import { formatDate } from 'src/utils';
import type { FormValues } from 'src/types';

export const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const formValues: FormValues = location.state;

  const [notesChecked, setNotesChecked] = useState<boolean>(false);
  const handleCheckBox = () => setNotesChecked(!notesChecked);

  // 「送信」ボタン押下時の処理
  const onSubmit = async () => {
    // 公開時期がnowの場合、本日の日付（YYYY-MM-DD）を追加
    if (formValues.publicType === 'now') formValues.publicDate = formatDate(new Date());
    // 保存不要の公開時期を削除
    delete formValues.publicType;

    try {
      // firestoreにデータ保存
      await addDoc(collection(db, 'wallets'), formValues);

      // 保存後に完了画面に遷移
      navigate(paths.complete);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  // 「もどる」ボタン押下時の処理
  const goBack = () => navigate(-1);

  return (
    <Box w="700px" mx="auto" py={10}>
      {/* タイトル */}
      <Heading as="h1" sx={{ fontSize: '32px' }} mb={12} noOfLines={1} textAlign="center">
        Walletをあげる
      </Heading>

      {/* グレーのエリア */}
      <Box bg="gray.50" mb={12} borderRadius={10}>
        <Box py="40px" px="50px">
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
              <Text fontSize="md" color="black" sx={{ fontWeight: '700' }} mb={6}>
                {formValues.publicDate.replaceAll('-', '/')}
              </Text>
            </>
          )}

          <Divider my={8} />

          <Heading as="h2" sx={{ fontSize: '20px' }} color="black" mb={3} noOfLines={1}>
            {formValues.publicType === 'now'
              ? 'このWalletはいらないWalletですか？'
              : 'リスクについて理解しましたか？'}
          </Heading>
          <Text fontSize="md" color="black" mb={3}>
            {formValues.publicType === 'now'
              ? 'いますぐWalletの情報が公開されます。必要な資金は移動しておきましょう。'
              : 'システムの不具合など不測の事態により、公開日よりも早くWallet Addressと秘密鍵が公開される恐れがあります'}
          </Text>

          <Box
            bg="red.50"
            h={16}
            px={4}
            py={5}
            mb={3}
            borderWidth="1px"
            borderColor="red.300"
            borderRadius="lg"
          >
            <Checkbox color="black" isChecked={notesChecked} onChange={handleCheckBox}>
              リスクについて理解した
            </Checkbox>
          </Box>

          <Text fontSize="md" color="gray.700" mb={6}>
            注意事項を読み、チェックボックスにチェックしてください
          </Text>
        </Box>
      </Box>

      {/* ボタン */}
      <HStack spacing="12px" justify="center">
        <Box w="200px">
          <BackButton buttonText="もどる" onClick={goBack} />
        </Box>
        <Box w="200px">
          <NextButton buttonText="送信" onClick={onSubmit} disabled={!notesChecked} />
        </Box>
      </HStack>
    </Box>
  );
};
