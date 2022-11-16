import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Error = () => (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      width="100vw"
      textAlign="center"
      justifyContent="center"
      sx={{ backgroundColor: '#e4f5ff' }}
    >
      <Container maxWidth="md">
        <Typography
          align="center"
          variant="h1"
          sx={{
            pt: 2,
            color: (theme) =>
              `${theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.87)' : 'rgba(0, 0, 0, 0.87)'}`,
          }}
        >
          404
        </Typography>
        <Typography
          align="center"
          variant="h4"
          sx={{
            pt: 1,
            pb: 3,
            color: (theme) =>
              `${theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.87)' : 'rgba(0, 0, 0, 0.87)'}`,
          }}
        >
          This page could not be found.
        </Typography>
        <Button color="primary" variant="contained" component={Link} to="/" disableElevation>
          Back to Home
        </Button>
      </Container>
    </Box>
);

export default Error;
