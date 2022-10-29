import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { path } from 'src/const';

type Props = {
  buttonText: string;
};

export const GiveButton = (props: Props) => {
  const { buttonText } = props;

  const navigate = useNavigate();
  const goToForm = () => navigate(path.form);

  return (
    <Button
      bg="#FF6F6F"
      _hover={{ bg: '#ff9999' }}
      color="white"
      sx={{ width: '255px' }}
      onClick={goToForm}
    >
      {buttonText}
    </Button>
  );
};
