import { Button } from '@chakra-ui/react';

type Props = {
  buttonText: string;
};

export const GiveButton = (props: Props) => {
  const { buttonText } = props;

  return (
    <Button background="#FF6F6F" _hover={{ bg: '#ff9999' }} color="white" sx={{ width: '255px' }}>
      {buttonText}
    </Button>
  );
};
