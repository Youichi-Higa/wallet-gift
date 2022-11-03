import { Button } from '@chakra-ui/react';

type Props = {
  buttonText: string;
  onClick?: () => void;
  disabled?: boolean;
  isSubmitting?: boolean;
};

export const NextButton = (props: Props) => {
  const { buttonText, onClick, disabled, isSubmitting } = props;

  return (
    <Button
      type="submit"
      colorScheme="blue"
      sx={{ width: '100%' }}
      onClick={onClick}
      disabled={disabled || isSubmitting}
      isLoading={isSubmitting}
    >
      {buttonText}
    </Button>
  );
};
