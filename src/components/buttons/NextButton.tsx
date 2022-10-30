import { Button } from '@chakra-ui/react';

type Props = {
  buttonText: string;
  onClick: () => void;
};

export const NextButton = (props: Props) => {
  const { buttonText, onClick } = props;

  return (
    <Button colorScheme="teal" sx={{ width: '100%' }} onClick={onClick} isDisabled={true}>
      {buttonText}
    </Button>
  );
};
