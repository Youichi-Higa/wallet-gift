import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { path } from 'src/const';

type Props = {
  buttonText: string;
};

export const PickUpButton = (props: Props) => {
  const { buttonText } = props;

  const navigate = useNavigate();
  const goToChoice = () => navigate(path.choice);

  return (
    <Button
      bg="#392C6F"
      _hover={{ bg: '#4c456d' }}
      color="white"
      sx={{ width: '255px' }}
      onClick={goToChoice}
    >
      {buttonText}
    </Button>
  );
};
