import React from 'react'
import { Box, experimentalStyled, Grid, Typography } from '@mui/material';

const PageWrapper = experimentalStyled('div')(({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 65,
}));

export default function PageContainer({ title, children }) {
    return (
        <PageWrapper>
            <Grid
                mt={0.8}
                container
            >
                <Grid item xs={10} sm={10} lg={10} margin="auto">
                    <Typography
                        fontWeight="600"
                        mt="5px"
                        variant="h5"
                        sx={{
                            lineHeight: '1.035'
                        }}
                    >{title}</Typography>
                </Grid>

                <Grid item xs={10} sx={{marginTop:"0.7em"}} display="flex" alignItems="flex-end" margin={"auto"}>
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'block', lg: 'flex' },
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            width: '100%',
                        }}
                    >
                        {children}
                    </Box>
                </Grid>
            </Grid>
        </PageWrapper>
    )
}
