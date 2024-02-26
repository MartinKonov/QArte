import React from "react";
import './ProfileUserGallery.css';
import PhotoInProfile from "../PhotoInProfile/PhotoInProfile";
import { useState, useEffect } from "react";
import { Button, Grid } from "@mui/material";
import Input from '@mui/material/Input';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';


const ProfileUserGallery = ({gallery}:any) =>{

    const[file, setFile] = useState();
    const[photos, setPhotos] = useState([]);
    const[activeGallery,setActiveGallery] = useState();
    const[model, setModel] = useState(false);
    const [tempImgSrc, setTempImgSrc] = useState('');

    useEffect(()=>{
        const getPhotos =async () => {
            try
            {
                const photosFromServer = await fetchPhotos();
                setPhotos(photosFromServer);
                setActiveGallery(gallery);
            }
            catch(error)
            {
                console.error('Error fetching user data!', error);
            }
        }
        getPhotos();
    },[gallery]);


    const fetchPhotos = async()=>{

        console.log(gallery)
        const res = await fetch(`https://localhost:7191/api/Picture/GetByGalleryID/${gallery}`);
        const photoData = await res.json();
        console.log(photoData)
        return photoData;
    }

    const DeletePhoto = async (id:any) =>
    {
        try {
    
            const response = await fetch(`https://localhost:7191/api/Picture/DeleteByID/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error(`Failed to delete page. Status: ${response.status}`);
            }
            const res = await fetchPhotos();
            setPhotos(res);
        } catch (error) {
            console.error('Error deleting picture:', error);
        }
    }

    const UploadPhoto =async (photo:any) => {
        try {
            console.log(photo.type)
            const isImage=(photo.type=="image/png"||photo.type=="image/jpeg");
            console.log(isImage);
            const formData = new FormData();
            formData.append("id",String(0));
            formData.append("pictureURL","0");
            formData.append("galleryID",gallery);
            formData.append("file",photo);
            formData.append("isImage",String(isImage));
            const response = await fetch('https://localhost:7191/api/Picture/Post', {
                method: 'POST',
                headers: {

                },
                body: formData
            });
            const data = await response.json();
            if (!response.ok) {
                console.error('Failed to add page:', data);
                throw new Error(`Failed to add page. Status: ${response.status}`);
            }
            const res = await fetchPhotos();
            setPhotos(res);
        } catch (error) {
            console.error('Error adding page:', error);
        }
    }

    const handleOnChange = async(e:any)=>{
        const target = e.target.files;
        console.log('file', target);
        AddPhoto(target[0]);
    }

    const AddPhoto = async(newFile:any)=>{
        if(newFile==undefined){
            alert("Choose an image")
        }
        else
        {
            console.log(newFile);
            UploadPhoto(newFile);
        }
    }

    const onClickPhoto= async(picURL:any) =>
    {
        setModel(true);
        setTempImgSrc(picURL);
        
    }

    return (
        <div className="gallery-container">
        <div className="buttonContainer" style={{ textAlign: "right", marginBottom: "30px" }}>
            <label htmlFor="image-upload">
            <Input
                id="image-upload"
                type="file"
                name="image"
                onChange={handleOnChange}
                style={{ display: "none" }}
                inputProps={{ accept: 'image/png, image/jpeg, video/mp4, video/mp3' }}
            />
            <Button
                variant="contained"
                component="span"
                startIcon={<CloudUploadIcon />}
                style={{ marginRight: "2%" }}
            >
                Upload Image
            </Button>
            </label>
        </div>

        <div className={model ? "model open" : "model"}>
            <img src={tempImgSrc} />
            <CloseIcon onClick={() => setModel(false)} />
        </div>

        <div className="gallery">
            {photos.map((photo: any, index: any) => (
            <PhotoInProfile key={index} photo={photo} onDeletePhoto={DeletePhoto} onClickPhoto={onClickPhoto} />
            ))}
        </div>
        </div>

      );
      
};
export default ProfileUserGallery;