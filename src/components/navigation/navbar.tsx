import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { deleteToken, getToken } from "../../assets/helpers";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const logout = () => {
    deleteToken();
    navigate("/signIn");
  };

  const pages = ["Feed", "Volunteers", "Post"];
  const navigation = [() => navigate("/"), () => navigate("/volunteers"), () => navigate("/createpost")];
  const settings = ["Profile", "Account", "Dashboard", "Logout"];
  const events = [() => {}, () => {}, () => {}, logout];

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    getToken() && (
      <Box>
        <AppBar color="primary">
          <Container maxWidth={false}>
            <Toolbar>
              <IconButton
                size="large"
                aria-label="menu"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  ml: 2,
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                LOGO
              </Typography>

              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                {pages.map((page, index) => (
                  <MenuItem
                    key={page}
                    onClick={() => {
                      handleCloseNavMenu();
                      navigation[index]();
                    }}
                  >
                    {page}
                  </MenuItem>
                ))}
              </Menu>

              <Box sx={{ flexGrow: 1 }} />

              <Box>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Avatar" src="/static/images/avatar.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting, index) => (
                    <MenuItem
                      key={setting}
                      onClick={() => {
                        handleCloseUserMenu();
                        events[index]();
                      }}
                    >
                      {setting}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Box sx={{ marginTop: 10 }}>
        </Box>
      </Box>
    )
  );
}

export default Navbar;
