import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { paths } from 'src/const/paths';

type Props = {
  buttonText: string;
};

export const GiveButton = (props: Props) => {
  const { buttonText } = props;

  const navigate = useNavigate();
  const goToForm = () => navigate(paths.form);

  return (
    <Button
      bg="#FF6F6F"
      _hover={{ bg: '#ff9999' }}
      color="white"
      sx={{ width: '100%' }}
      onClick={goToForm}
    >
      {buttonText}
    </Button>
  );
};
