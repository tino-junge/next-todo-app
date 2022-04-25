import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';

interface PageLayoutProps {
  children?: React.ReactNode;
}
export const PageLayout = (props: PageLayoutProps) => {
  return (
    <Container maxWidth="lg">
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Next Todo App
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          my: 6,
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
