import React, { useState, useContext } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/auth';

function NavBar(props) {

  const pathname = window.location.pathname;
  const path = pathname === '/' ? 'home' : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);
  const context = useContext(AuthContext);
  let history = useHistory();
  const handleItemClick = (e, { name }) => setActiveItem(name);
  const handleLogout = () => {
    context.logout();
        history.push("/");
  }
  return (

    <Menu pointing secondary size='massive' color='blue'>
      <Menu.Item
        name='home'
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to='/'
      />

      <Menu.Menu position='right'>
        <Menu.Item
          name='login'
          active={activeItem === 'login'}
          onClick={handleItemClick}
          as={Link}
          to='/login'
        />
        <Menu.Item
          name='logout'
          active={activeItem === 'logout'}
          onClick={handleLogout}
        />
        <Menu.Item
          name='register'
          active={activeItem === 'register'}
          onClick={handleItemClick}
          as={Link}
          to='/register'
        />
      </Menu.Menu>
    </Menu>

  )
}

export default NavBar;