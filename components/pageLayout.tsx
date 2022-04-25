import { Container } from '@mui/material';
import { Box } from '@mui/system';

interface PageLayoutProps {
  children?: React.ReactNode;
}
export const PageLayout = (props: PageLayoutProps) => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {props.children}
      </Box>
    </Container>
  );
};
