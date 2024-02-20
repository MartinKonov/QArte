import React from "react";
import UserBio from "../UserBio/UserBio";
import UserGallery from "../UserGallery/UserGallery";
import { useState, useEffect } from "react";
import ChangePage from "../../ChangePage/ChangePage";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './SubPageContainer.css'

const SubPageContainer = () =>{

    const [ShowChangePage, setShowChangePage] = useState(false);
    const [page,setPage] = useState({
        id:'',
        pageName:'',
        bio:'',
        galleryID:'',
        qrLink:'',
        userID:'',
    });

    const navigate=useNavigate();
    const{id} = useParams();

    useEffect(()=>{
        const getPage =async () => {
            try
            {
                const pageFromServer = await fetchPage();
                setPage(pageFromServer);
            }
            catch(error)
            {
                console.error('Error fetching user data!', error);
            }
        }
        console.log("THIS IS THE Page");
        getPage();
    },[id]);

    const fetchPage = async()=>{
        const res = await fetch(`https://localhost:7191/api/Page/GetByID/${id}`);
        const pageData = await res.json();
        //console.log("THIS IS THE GALLERY!")
        console.log(pageData)
        return pageData;
    }

    const callPageChange = async (pages:any) =>{
        try {

            console.log("Updating page: ", pages);
    
            const response = await fetch(`https://localhost:7191/api/Page/PatchByID/${pages.page.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        id : pages.page.id,
                        bio : pages.bio,
                        pageName:pages.name,
                        qrLink: 'string',
                    }
                ),
            });
    
            if (!response.ok) {
                const errorDetails = await response.json();
                console.error(`Failed to update page. Status: ${response.status}. Details:`, errorDetails);
                throw new Error(`Failed to update page. Status: ${response.status}`);
            }
            window.location.href = `http://localhost:5173/explore/${page.userID}`
            const res = await fetchPage();
            setPage(res);
            console.log('Page updated successfully.');
            console.log(page.userID);
            setShowChangePage(false);
           
            // If you want to update the UI or perform other actions after the update, add them here.
        } catch (error) {
            console.error('Error updating page:', error);
            
        }
        
    }

    const callPageDelete = async (id:any) =>{
        try {
            console.log("Deleting page: " + id);
    
            const response = await fetch(`https://localhost:7191/api/Page/DeleteByID/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error(`Failed to delete page. Status: ${response.status}`);
            }
            window.location.href = `http://localhost:5173/explore/${page.userID}`;
            console.log('Page deleted successfully.');
        } catch (error) {
            console.error('Error deleting page:', error);
        }
    }


    return (
        <div className="sub-page-container" style={{ width: '100%', position: 'relative' }}>
          <div className="top-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <div className="name-And-Edit" style={{display:'flex', width:'100%'}}>
            <h1 style={{ marginLeft: '10%' }}>{page.pageName}</h1>
        </div>
            {/* Delete Page Button */}
            <IconButton
              size="large"
              onClick={() => callPageDelete(page.id)}
              title="Delete page"
              style={{ color: 'red', marginLeft: 'auto', marginRight:'3%'}}
              sx={{ '& .MuiSvgIcon-root': { fontSize: '3rem', strokeWidth: 2 } }}
            >
              <DeleteIcon />
            </IconButton>
          </div>
          <div className="bio-editPageButton-container">
          <UserBio page={page} callPageChange={callPageChange}/>
          </div>
          {/* {ShowChangePage && <ChangePage onChange={callPageChange} page={page} />} */}
          {page.galleryID !== "" && <UserGallery gallery={page.galleryID} />}
        </div>
      );
};

export default SubPageContainer;