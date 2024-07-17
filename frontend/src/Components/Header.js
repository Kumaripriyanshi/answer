import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import { useState, useEffect } from "react";
import { useList } from "../Context/listContext";
import { useInput } from "../Context/InputContext";
import { useUserList } from "../Context/userLists";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/authContext";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [input, setInput] = useInput();
  const [photos, setPhotos] = useList();
  const [tempphotos, setTempPhotos] = useState([]);
  const [userList, setUserList] = useUserList();
  const [auth] = useAuth();
  const navigate = useNavigate();

  const handleSave = () => {
    // setOpen(true);
    navigate("/listpage");
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    navigate("/header");
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
    navigate("/header");
  };

  const fetchData = async () => {
    const data = await axios.get("/api/lists/fetchLists");
    setPhotos(data.data.list);
  };

  useEffect(() => {
    const fetchDatas = async () => {
      const data = await axios.get("/api/lists/fetchLists");
      setTempPhotos(data.data.list);
    };
    fetchDatas();
    console.log("tempphotos ", tempphotos);
  }, []);

  const handleChange = (e) => {
    const inputValue = e.target.value;

    setInput(inputValue);
    if (inputValue.length == 0 || inputValue === "x") fetchData();
    // Check if input starts with 'x'

    // Check if input length is 1
    if (inputValue.length === 1) {
      let num = Number(inputValue);
      if (!isNaN(num)) {
        // Check if num is a valid number
        const filteredPhotos = tempphotos.filter((elem) => {
          return elem.status_code.toString().charAt(0) === num.toString();
        });

        setPhotos(filteredPhotos);
      }
    } else if (inputValue.length === 2) {
      console.log("as ", inputValue.length);
      let num1 = Number(inputValue.charAt(0));
      let num2 = Number(inputValue.charAt(1));
      if (!isNaN(num1)) {
        const filteredPhotos = tempphotos.filter((elem) => {
          return elem.status_code.toString().charAt(0) === num1.toString();
        });
        setPhotos(filteredPhotos);
        if (!isNaN(num2)) {
          const filterBysecondDigit = filteredPhotos.filter((elem) => {
            return elem.status_code.toString().charAt(1) === num2.toString();
          });
          setPhotos(filterBysecondDigit);
        }
        console.log("filtered ", photos);
      }
    } else if (inputValue.length === 3) {
      let num1 = Number(inputValue.charAt(0));
      let num2 = Number(inputValue.charAt(1));
      let num3 = Number(inputValue.charAt(2));

      if (!isNaN(num1)) {
        const filteredPhotos = tempphotos.filter((elem) => {
          return elem.status_code.toString().charAt(0) === num1.toString();
        });
        setPhotos(filteredPhotos);
        if (!isNaN(num2)) {
          const filterBysecondDigit = filteredPhotos.filter((elem) => {
            return elem.status_code.toString().charAt(1) === num2.toString();
          });
          setPhotos(filterBysecondDigit);
        }

        if (!isNaN(num3)) {
          const filterBythirdDigit = photos.filter((elem) => {
            return elem.status_code.toString().charAt(2) === num3.toString();
          });
          setPhotos(filterBythirdDigit);
        }
      }
    }
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>{auth?.user?.name}</MenuItem>
      <MenuItem onClick={handleMenuClose}>Home</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
          onClick={handleSave}
        >
          <Badge badgeContent={userList.length} color="error">
            <BookmarksIcon />
          </Badge>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <p>{auth?.user?.name}</p>
        </IconButton>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={input}
              onChange={handleChange}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={() => {
                navigate("/listpage");
              }}
            >
              <Badge badgeContent={userList.length} color="error" showZero>
                <BookmarksIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
