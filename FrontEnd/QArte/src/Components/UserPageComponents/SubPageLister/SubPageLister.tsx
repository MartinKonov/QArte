import { useEffect, useImperativeHandle } from "react";
import SubPageContainer from "../SubPageContainer/SubPageContainer";
import './SubPageLister.css';
import { useState , forwardRef} from "react";
import PageNavContainer from "../PageNavContainer/PageNavContainer";
import { NavLink, Route, Routes, Outlet, useNavigate } from "react-router-dom";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuList from '@mui/material/MenuList';
import AddIcon from '@mui/icons-material/Add';


    export interface SubPageListerRef {
      Awake: (id: any) => void;
    }

const SubPageLister = forwardRef(({ pages, onSelectedPage, onAddPage, userID }:any,ref) =>{

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [awakePage, setAwakePage] =useState<number>(0);
    const [Pages,setPages] = useState<any>([]);
    const navigate = useNavigate();

    useEffect(()=>{
      const getPages = async() =>{
          try{
              await fetchPage();
          }
          catch(error){
              console.error('Error fetching user data!',error);
          }
      }
      getPages()
  },[pages]);

  const fetchPage =async () => {
      try {
          const foundPage = pages;
          if (foundPage) {
              setPages(foundPage);
              setAwakePage(0);
              console.log("here");
              console.log(foundPage);
              console.log(awakePage);
          } else {
              console.error(`User with id ${awakePage} not found.`);
          }
      } catch (error) {
          console.error('Error fetching user data!', error);
      }
  }

    const onShow = (id:any) => {
      for(var i=0; i<Pages.length; i++){
        if(pages[i].id === id){
          console.log(pages[i]);
          setAwakePage(i);
        }
      }
      console.log("We change apge")
    };
  
    useImperativeHandle(ref, () => ({
      Awake: onShow,
    }));


    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleMenuClose = () => {
        setAnchorEl(null);
      };

      const handleMenuItemClick = (pageId: number) => {
        handleMenuClose();
        onAddPage(false);
        onSelectedPage(pageId);
      };

      const handleAddPageClick = () => {
        handleMenuClose();
        navigate(`/explore/${userID}`);
        onSelectedPage(null);
        onAddPage(true);
      };

      const menuItemWidth = document.getElementById('show-pages-button')?.offsetWidth;
      return (
        <>
          {/* Container to center the button */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5%' }}>
            {/* Dropdown menu trigger button */}
            <Button
              id="show-pages-button"
              variant="contained"
              style={{ backgroundColor: "green", width: '20%', position: 'relative', zIndex: 2 }}
              endIcon={<ArrowDropDownIcon />}
              onClick={handleMenuClick}>
              Show Pages
            </Button>
          </div>
      
      {/* Dropdown menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {pages.map((page: any, index: number) => (
          <MenuItem key={index} style={{ width: menuItemWidth }} onClick={() => { handleMenuItemClick(page.id) }}>
            <div style={{ width: '100%' }}>
              <PageNavContainer pages={page} index={index} onShow={onShow} />
            </div>
          </MenuItem>
        ))}
      </Menu>
      <Outlet />
    </>
  );
      
})
export default SubPageLister;