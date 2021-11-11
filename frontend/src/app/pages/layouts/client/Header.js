import React, { useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiShoppingCart, FiUser } from 'react-icons/fi';
import {
  Grid,
  Box,
  Avatar,
  MenuItem,
  Menu,
  Tooltip,
  IconButton,
  ListItemIcon,
  Divider,
} from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import Logo from '../../../components/Logo';
import useAuth from 'app/hooks/useAuth';
import { useDispatch } from 'react-redux';
import { logout } from 'app/store/auth/actions';

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    padding: '0 30px',
    borderBottom: '1px solid #E5E5E5',
    [theme.breakpoints.down('sm')]: {
      '& > div': {
        margin: '10px 0',
      },
      '& > div:nth-child(2)': {
        order: 1,
        margin: '0',
      },
    },
  },
  logo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0',
  },
  navMenuWrapper: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
    },
  },
  nav: {
    position: 'relative',
  },
  menuList: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'nowrap',
    margin: '0',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '0',
    },
  },
  menuListItem: {
    listStyle: 'none',
    padding: '17px 15px',
    fontWeight: '550',
    fontSize: '16px',
    lineHeight: '16px',
    '&.active': {
      borderBottom: '2px solid #000',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '17px 10px',
    },
  },
  navLink: {
    fontWeight: '550',
    fontSize: '16px',
    lineHeight: '16px',
    color: '#111111',
  },
  rightMenu: {
    '& div': {
      fontSize: '14px',
      fontWeight: '300',
      padding: '0 5px',
    },
  },
  signinLink: {
    color: theme.palette.text.main,
  },
}));

const Header = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const location = useLocation();
  const dispatch = useDispatch();

  const { isAuthenticated, currentUser } = useAuth();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <Box className={classes.root}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        className={classes.header}
      >
        <Grid item className={classes.logo}>
          <Logo />
        </Grid>
        <Grid item className={classes.navMenuWrapper}>
          <nav className={classes.nav}>
            <ul className={classes.menuList}>
              <li
                className={[
                  classes.menuListItem,
                  location.pathname === '/' ? 'active' : '',
                ].join(' ')}
              >
                <Link to="/" className={classes.navLink}>
                  Feed
                </Link>
              </li>
              <li
                className={[
                  classes.menuListItem,
                  location.pathname === '/available' ? 'active' : '',
                ].join(' ')}
              >
                <Link to="/available" className={classes.navLink}>
                  Available
                </Link>
              </li>
              <li
                className={[
                  classes.menuListItem,
                  location.pathname === '/upcoming' ? 'active' : '',
                ].join(' ')}
              >
                <Link to="/upcoming" className={classes.navLink}>
                  Upcoming
                </Link>
              </li>
              <li
                className={[
                  classes.menuListItem,
                  location.pathname === '/gone' ? 'active' : '',
                ].join(' ')}
              >
                <Link to="/gone" className={classes.navLink}>
                  Gone
                </Link>
              </li>
            </ul>
          </nav>
        </Grid>
        <Grid item>
          <Box
            display="flex"
            sx={{ alignItems: 'center' }}
            className={classes.rightMenu}
          >
            <Box>En</Box>
            <Box display="flex">
              <Link to="/cart" className={classes.cartLink}>
                <FiShoppingCart />
              </Link>
            </Box>
            {!isAuthenticated ? (
              <Box>
                <Link to="/login" className={classes.signinLink}>
                  Login
                </Link>
              </Box>
            ) : currentUser ? (
              <Box>
                <Tooltip title="Account settings">
                  <IconButton onClick={handleClick} size="small">
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        textTransform: 'uppercase',
                      }}
                    >
                      {currentUser.name.charAt(0) || 'U'}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem>My account</MenuItem>
                  <Divider />
                  <MenuItem onClick={onLogOut}>Logout</MenuItem>
                </Menu>
              </Box>
            ) : null}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Header;
