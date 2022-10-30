import { Button } from '@chakra-ui/react';

type Props = {
  buttonText: string;
  onClick: () => void;
};

export const BackButton = (props: Props) => {
  const { buttonText, onClick } = props;

  return (
    <Button colorScheme="gray" sx={{ width: '100%' }} onClick={onClick}>
      {buttonText}
    </Button>
  );
};
