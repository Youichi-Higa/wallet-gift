import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { paths } from 'src/const/paths';

type Props = {
  buttonText: string;
};

export const PickUpButton = (props: Props) => {
  const { buttonText } = props;

  const navigate = useNavigate();
  const goToChoice = () => navigate(paths.choice);

  return (
    <Button
      bg="#392C6F"
      _hover={{ bg: '#4c456d' }}
      color="white"
      sx={{ width: '100%' }}
      onClick={goToChoice}
    >
      {buttonText}
    </Button>
  );
};
