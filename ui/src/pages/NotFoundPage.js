import React from 'react';
import {
  Container,
  Paper,
  Typography,
} from '@mui/material';

const NotFoundPage = () => {
  return (
    <>
      <Container sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center', maxWidth: '1220px', margin: '24px auto 0;' }} >
        <Paper sx={{ mt: 4, p: 3, display: 'flex', flexDirection: 'column', gap: 2, minWidth: '375px' }} >
          <Typography variant='h5' color='primary' >Page Not Found</Typography>
        </Paper>
      </Container>
    </>
  );
}

export default NotFoundPage;
