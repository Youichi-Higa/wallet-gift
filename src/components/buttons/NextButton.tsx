import { Button } from '@chakra-ui/react';

type Props = {
  buttonText: string;
  onClick?: () => void;
  disabled?: boolean;
};

export const NextButton = (props: Props) => {
  const { buttonText, onClick, disabled } = props;

  return (
    <Button
      type="submit"
      colorScheme="teal"
      sx={{ width: '100%' }}
      onClick={onClick}
      disabled={disabled}
    >
      {buttonText}
    </Button>
  );
};
