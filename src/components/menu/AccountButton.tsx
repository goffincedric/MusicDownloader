import { Fragment, MouseEvent, useContext, useState } from 'react';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AccountCircle, Key, Logout } from '@mui/icons-material';
import { TranslationConstants } from '../../shared/constants/translation.constants';
import { ListItemIcon, ListItemText } from '@mui/material';
import { AuthenticationDispatchContext } from '../../shared/contexts/authentication/AuthenticationContext';
import { AuthenticationActionType } from '../../shared/contexts/authentication/AuthenticationActions';

export function AccountButton(props: Omit<IconButtonProps, 'onClick'>) {
  const dispatchAuthenticationAction = useContext(AuthenticationDispatchContext);

  // Menu logic
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = !!anchorEl;
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // Menu item logic
  const handleLogout = () => {
    dispatchAuthenticationAction({ type: AuthenticationActionType.LOGOUT });
    handleClose();
  };

  return (
    <Fragment>
      <IconButton {...props} onClick={handleClick}>
        <AccountCircle />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText>{TranslationConstants.BUTTONS.LOGOUT}</ListItemText>
        </MenuItem>
      </Menu>
    </Fragment>
  );
}
