import { Button } from '@chakra-ui/react';

type Props = {
  buttonText: string;
};

export const PickUpButton = (props: Props) => {
  const { buttonText } = props;

  return (
    <Button background="#392C6F" _hover={{ bg: '#4c456d' }} color="white" sx={{ width: '255px' }}>
      {buttonText}
    </Button>
  );
};
