import { AppBar, Box, List, ListItem, ListItemText, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';



const navItems = [
    {
        label: "Home",
        path: "/"
    },
    {
        label: "Contact",
        path: "/contact-us"
    },
    {
        label: "About",
        path: "/about"
    }
];

export default function Header() {
    const { pathname } = useLocation();
    const pathDirect = pathname;



    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar component="nav">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        LOGO
                    </Typography>
                    <Box>
                        <List component="li" disablePadding sx={{ display: "flex" }}>
                            {navItems.map((item) => (
                                <ListItem
                                    key={item.label}
                                    button
                                    component={NavLink}
                                    to={item.path}
                                    selected={pathDirect === item.path}
                                    sx={{
                                        mb: 0, mx: 0, py: 0, borderRadius: 0, position: 'relative',
                                        ...(pathDirect === item.path && {
                                            color:"#F4CE2C",
                                            borderBottom: "2px solid #F4CE2C",
                                        }),
                                    }}
                                >
                                    <ListItemText>{item.label}</ListItemText>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
