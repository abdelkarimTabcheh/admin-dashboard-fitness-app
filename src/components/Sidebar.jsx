//components/Sidebar.jsx
import React from 'react';
import { Nav } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const Sidebar = ({ onLinkClick }) => {
  const location = useLocation();
  const links = [
    { path: '/home', label: 'Dashboard' },
    { path: '/users', label: 'Users' },
    { path: '/exercises', label: 'Exercises' },
    { path: '/home-config', label: 'Home Config' },
  ];

  return (
    <Nav className="flex-column p-3">
      {links.map(link => (
        <Nav.Link
          key={link.path}
          href={link.path}
          active={location.pathname === link.path}
          onClick={onLinkClick}
        >
          {link.label}
        </Nav.Link>
      ))}
    </Nav>
  );
};

export default Sidebar;
