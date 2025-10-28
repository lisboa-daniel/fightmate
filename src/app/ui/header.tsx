'use client';

import {ReactElement, ReactNode, useState} from 'react'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Tab, Tabs } from '@mui/material';
import { Home, Theaters, Translate } from '@mui/icons-material';
import { usePathname, useRouter } from 'next/navigation';

const navItems : NavItem[] = [
    {
        id: 0,
        label: "Home",
        href: "/",
        icon : <Home/>   
    },
    {
        id: 1,
        label: "Translator",
        href: "/translator",
        icon : <Translate/>   
    },
    {
        id: 2,
        label: "Combo Editor",
        href: "/editor",
        icon : <Theaters/>   
    },


]
const drawerWidth = 240;

interface NavItem {
    id: number,
    label : string,
    href : string,
    icon : ReactElement
    
}

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const active_page = usePathname();
    let startLinkIndex = 0;

    let searchTabIndex = navItems.findIndex( item => active_page == item.href);

    if (searchTabIndex != -1)
        startLinkIndex = searchTabIndex
    
    const [menuIndex, setMenuIndex] = useState(startLinkIndex);
    const router = useRouter();
    
    const onClickMenuHandler = (id : number) => {
        setMenuIndex(id)
        page2Go(navItems[id].href)
    }

    const page2Go = (href: string) => {
        if (close) close();

        router.push(href);
        //router.replace(href);
        
    }
    
  

    const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ my: 2 }}>
        Fightmate
        </Typography>
        <Divider />
        <List>
        {navItems.map((item) => (
            <ListItem key={item.id} disablePadding>
            <ListItemButton onClick={() => onClickMenuHandler(item.id)} sx={{ textAlign: 'center' }}>
                <ListItemText primary={item.label} />
            </ListItemButton>
            </ListItem>
        ))}
        </List>
    </Box>
    );

   
    return (
        <div>
        {/*style={{background: 'linear-gradient(to right, rgba(245, 41, 14.8), rgba(245, 41, 14,.15)'}}*/}
        <AppBar sx={{backgroundColor: "black" }} component="nav">
            <Toolbar>
            <div aria-label='menu_drawer' className='mr-2 flex md:hidden'>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    
                >
                    <MenuIcon />
                </IconButton>
            </div>
            
            <div role='link' rel='/' onClick={() => page2Go('/')} id="logo" aria-label='logo' className='flex md:fixed pr-3 cursor-pointer'>
                <Typography> <img src="logov2.svg" alt='logo' className='min-w-[120px] max-w-[230px] sm:max-w-[190px] md:max-w-[170px] xl:max-w-[272px]'/></Typography>
            </div>
            
        
            <div className="w-full hidden md:flex flex-row items-center justify-center">
            <Tabs value={menuIndex} aria-label="basic tabs example">
            {navItems.map(({id, label, icon }) => (
                    
                <Tab  icon={icon} iconPosition="start" onClick={() => onClickMenuHandler(id)} key={id} value={id} label={label} />
                    
            ))}
            </Tabs>   

            </div>
            </Toolbar>
            <Divider orientation="horizontal" flexItem />
            </AppBar>
            <nav>
                <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                >
                {drawer}
                </Drawer>
                
            </nav>

            
        </div>
    );
}