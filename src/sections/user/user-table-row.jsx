import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';

import Iconify from 'src/components/iconify';
import { Key } from '@mui/icons-material';

// ----------------------------------------------------------------------

export default function UserTableRow({ selected, status, name, id, deleted, email, handleClick }) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };
  const authToken = localStorage.getItem('token');

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>{email}</TableCell>

        <TableCell>
          <Label color={status ? 'error' : 'success'}>{status ? 'Banned' : 'Active'}</Label>
        </TableCell>
        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
        <TableCell align="right">
          <IconButton>
            <Iconify
              icon="eva:trash-2-outline"
              onClick={() => {
                handleCloseMenu();

                // Your Axios request

                const config = {
                  method: 'get',
                  maxBodyLength: Infinity,
                  url: `https://aradax.com.et/users/delete/${id}`,
                  headers: { Authorization: `Bearer ${authToken}` },
                };

                axios
                  .request(config)
                  .then((response) => {
                    console.log(JSON.stringify(response.data));
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
            />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem
          onClick={() => {
            handleCloseMenu();

            // Your Axios request
            const data = JSON.stringify({
              activated: 'true',
            });

            const config = {
              method: 'put',
              maxBodyLength: Infinity,
              url: `https://aradax.com.et/users/${id}`,
              headers: { Authorization: `Bearer ${authToken}` },
              data,
            };

            axios
              .request(config)
              .then((response) => {
                console.log(JSON.stringify(response.data));
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Activate
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseMenu();

            // Your Axios request
            const data = JSON.stringify({
              activated: 'false',
            });

            const config = {
              method: 'put',
              maxBodyLength: Infinity,
              url: `https://aradax.com.et/users/${id}`,
              headers: { Authorization: `Bearer ${authToken}` },
              data,
            };

            axios
              .request(config)
              .then((response) => {
                console.log(JSON.stringify(response.data));
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Deactiavte User
        </MenuItem>

        {/* ... Other MenuItems ... */}
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  handleClick: PropTypes.func,
  name: PropTypes.any,
  id: PropTypes.any,
  email: PropTypes.any,
  status: PropTypes.any,
  deleted: PropTypes.any,
  selected: PropTypes.any,
};
