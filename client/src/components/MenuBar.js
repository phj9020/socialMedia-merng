import React, {useState, useEffect} from 'react';
import { Menu } from 'semantic-ui-react';
import {Link, useLocation} from 'react-router-dom';
import { logUserOut } from '../client';

function MenuBar({isLoggedIn}) {
    const [activeItem, setActiveItem] = useState("home");
    let location = useLocation();
    const pathname = location.pathname.substr(1);
    
    const handleItemClick = (e, { name }) => {
        setActiveItem(name);
    };

    const handleLogout = (e)=> {
        e.preventDefault();
        logUserOut();
    }
    
    useEffect(()=> {
        setActiveItem(pathname === "" ? "home" : pathname);
    },[pathname]);

    return (
        <Menu pointing secondary size="massive" color="teal">
            <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link} to='/'
            />
            {isLoggedIn ? 
            <Menu.Menu position='right'>
                <Menu.Item
                    name='logout'
                    onClick={handleLogout}
                    />
            </Menu.Menu> : 
                <Menu.Menu position='right'>
                    <Menu.Item
                    name='login'
                    active={activeItem === 'login'}
                    onClick={handleItemClick}
                    as={Link} to='/login'
                    />
                    <Menu.Item
                        name='register'
                        active={activeItem === 'register'}
                        onClick={handleItemClick}
                        as={Link} to='/register'
                    />
                </Menu.Menu>
            }
        </Menu>
    )
}

export default MenuBar;