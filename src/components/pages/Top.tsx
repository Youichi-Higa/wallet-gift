import { VStack } from '@chakra-ui/react';
import { Card } from 'src/components';

export const Top = () => {
  return (
    <VStack h="100vh" spacing={10} justify="center" bg="blue.50">
      <Card
        title="Wallet を持っている方"
        text="ここにテキストここにテキストここにテキストここにテキストここにテキストここにテキスト"
        buttonText="Wallet（ウォレット）をあげる"
      />
      <Card
        title="Wallet が欲しい方"
        text="ここにテキストここにテキストここにテキストここにテキストここにテキストここにテキスト"
        buttonText="Wallet（ウォレット）を拾う"
      />
    </VStack>
  );
};
