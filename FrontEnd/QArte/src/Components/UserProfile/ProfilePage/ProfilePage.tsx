import React, { useState, useRef, useEffect } from "react";
import "./ProfilePage.css";
import ProfileSubPageLister, {
  SubPageListerRef,
} from "../ProfileSubPageLister/ProfileSubPageLister";
import PageAdd from "../PageAdd/PageAdd";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "../../Stripe/StripeCheckout";
import Typography from "@mui/material/Typography";
import PageNavigator from "../ProfilePageNavigator";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import { useDispatch, useSelector } from "react-redux";
import { setAvatar, setLoggedIn } from "../../../store/loginSlice";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import CheckIcon from "@mui/icons-material/Check";

const ProfilePage = () => {
  const Uid = sessionStorage.getItem("userId");
  const val = Uid;

  const [showAddPage, setAddPage] = useState(false);
  const [User, setUser] = useState<any>({});
  const [Upages, setPages] = useState<any>([]);
  const [selectedPage, setSelectedPage] = useState<number | null>(null);
  const [ShowSettlementCycle, setShowSettlementCycle] = useState(false);
  const [settlementCycle, setSettlementCycle] = useState("");
  const [settlementCycles, setSettlementCycles] = useState([
    "Daily",
    "Weekly",
    "Monthly",
  ]);
  const [currentSettlementCycle, setCurrentSettlementCycle] = useState("");
  const [textFieldWidth, setTextFieldWidth] = useState<string>("auto");

  const [usernameEditMode, setUsernameEditMode] = useState(false);
  const [userName, setUserName] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      try {
     
        const userFromServer = await fetchUser();
        const pagesFromServer = await fetchPages(userFromServer.id);
        const userSettlementCycle = await fetchCurrentSettlementCycle(
          userFromServer.settlementCycleID
        );
        setUser(userFromServer);
        setPages(pagesFromServer);
        setCurrentSettlementCycle(userSettlementCycle);
        setUserName(userFromServer.username);

        if (pagesFromServer.length > 0) {
          setSelectedPage(pagesFromServer[0].id);
        }
      } catch (error) {
        console.error("Error fetching user data!", error);
      }
    };
    getUser();
  }, []);

  const fetchCurrentSettlementCycle = async (id: number) => {
    try {

        const currentCycleResponse = await fetch(`https://localhost:7191/api/SettlementCycle/GetByID/${id}`);
        const currentCycleData = await currentCycleResponse.json();


        switch(currentCycleData.settlementCycles)
        {
          case 0:
            return "Daily";
          case 1:
            return "Weekly";
          case 2: 
            return "Monthly";
          default:
            return "";
        }



      // return currentCycleData.settlementCycles;
      switch (currentCycleData.settlementCycles) {
        case 0:
          return "Daily";
        case 1:
          return "Weekly";
        case 2:
          return "Monthly";
        default:
          return "";
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return "";
    }
  };

  const fetchUser = async () => {
    const res = await fetch(
      `https://localhost:7191/api/User/GetUserByID/${val}`
    );
    const userData = await res.json();
    return userData;
  };
  const fetchUserID = async () => {
    const res = await fetch(
      `https://localhost:7191/api/User/GetUserByID/${User.id}`
    );
    const userData = await res.json();
    return userData;
  };

  const fetchPages = async (id: number) => {
    const res = await fetch(
      `https://localhost:7191/api/Page/GetByUserID/${id}`
    );
    const pageData = await res.json();
    return pageData;
  };

  const PageRef = useRef<SubPageListerRef>(null);

  const addPage = async (bio: any) => {
    const qr = Math.floor(Math.random() * 1000) + 1; // to fix

    try {
      const response = await fetch("https://localhost:7191/api/Page/Post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: 0,
          bio: bio.bio,
          PageName: bio.name,
          qrLink: qr.toString(),
          galleryID: 0,
          userID: User.id,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.error("Failed to add page:", data);
        throw new Error(`Failed to add page. Status: ${response.status}`);
      }
      const res = await fetchPages(User.id);
      setPages(res);
      setAddPage(false);
    } catch (error) {
      console.error("Error adding page:", error);
    }
  };

  const deletePageFetch = async (id: any) => {
    try {

      const response = await fetch(
        `https://localhost:7191/api/Page/DeleteByID/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete page. Status: ${response.status}`);
      }
      const res = await fetchPages(User.id);
      setPages(res);
    } catch (error) {
      console.error("Error deleting page:", error);
    }
  };



  const changePageFetch = async (page: any) => {
    try {
      console.log("Updating page: ", page);

      const response = await fetch(
        `https://localhost:7191/api/Page/PatchByID/${page.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: page.id,
            bio: page.bio,
            qrLink: "string",
          }),
        }
      );

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error(
          `Failed to update page. Status: ${response.status}. Details:`,
          errorDetails
        );
        throw new Error(`Failed to update page. Status: ${response.status}`);
      }
      const res = await fetchPages(User.id);
      setPages(res);
      console.log("Page updated successfully.");

      // If you want to update the UI or perform other actions after the update, add them here.
    } catch (error) {
      console.error("Error updating page:", error);
    }
  };

  const changePage = (page: any) => {
    changePageFetch(page);
    // setPages(Upages);
    //PageRef.current.Awake(Upages[awake].id);
    console.log(Upages);
  };

  const UploadPhoto = async (file: any) => {
    try {
      const formData = new FormData();
      formData.append("formFile", file);
      formData.append("id", String(User.id));
      const response = await fetch(
        `https://localhost:7191/api/User/ProfilePicture/${User.id}`,
        {
          method: "PATCH",
          headers: {},
          body: formData,
        }
      );
      const data = await response.json();
      if (!response.ok) {
        console.error("Failed to add page:", data);
        throw new Error(`Failed to add page. Status: ${response.status}`);
      }

      const res = await fetchUserID();
      setUser(res);
      console.log("Page added successfully:", data);
      console.log("THe full data", res);
      const pictureUrl = res.pictureURL;
      if (pictureUrl) {
        console.log("RESPONSE");
        console.log(response);
        sessionStorage.setItem("userPictureUrl", pictureUrl);
        dispatch(setAvatar(pictureUrl));
      }
    } catch (error) {
      console.error("Error adding page:", error);
    }
  };

  const handleOnChange = async (e: any) => {
    let target = e.target.files;
    AddPhoto(target[0]);
    console.log("file", target);
    let v = window.location.href;
    console.log(v);
  };

  const AddPhoto = async (file: any) => {
    if (file == undefined) {
      alert("Choose an image");
    } else {
      console.log(file);
      UploadPhoto(file);
    }
  };

  const DeleteUser = async () => {
    try {
      console.log("Deleting user: " + User.id);

      const response = await fetch(
        `https://localhost:7191/api/User/DeleteByID/${User.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete user. Status: ${response.status}`);
      }
      localStorage.clear();
      sessionStorage.clear();
      dispatch(setLoggedIn(false));
      window.location.href = `http://localhost:5173/home`;
      console.log("User deleted successfully.");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (buttonRef.current) {
      const buttonWidth = buttonRef.current.clientWidth;
      setTextFieldWidth(`${buttonWidth}px`);
    }
  }, [ShowSettlementCycle]);

  const onSelectedPage = (pageId: number) => {
    setSelectedPage(pageId);
  };

  const onAddPage = (set: boolean) => {
    setAddPage(set);
  };

  const onClickSettlementCycle = () => {
    setShowSettlementCycle(!ShowSettlementCycle);
  };

  const onSubmitChangedSettlementCycle = async () => {
    if (currentSettlementCycle === settlementCycle) {
      setShowSettlementCycle(false);
      return;
    }

    try {
      const response = await fetch(
        `https://localhost:7191/api/SettlementCycle/PatchByID/${User.settlementCycleID}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: 0,
            settlementCycles: settlementCycles.indexOf(settlementCycle),
          }),
        }
      );

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error(
          `Failed to update settlement cycle. Status: ${response.status}. Details:`,
          errorDetails
        );
        return;
      }

      setCurrentSettlementCycle(settlementCycle);
      setShowSettlementCycle(false);

      console.log("Settlement cycle updated successfully.");
    } catch (error) {
      console.error("Error updating settlement cycle:", error);
    }
  };

  const changeUsernameEditMode = () => {
    setUsernameEditMode(!usernameEditMode);
  };

  const handleSubmitChangeUsername = async () => {
    if (userName === User.username) {
      setUsernameEditMode(!usernameEditMode);
      return;
    }

    try {
      const response = await fetch(
        `https://localhost:7191/api/User/Username/${User.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userName.toString()),
        }
      );

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error(
          `Failed to update username. Status: ${response.status}. Details:`,
          errorDetails
        );
        return;
      }

      const res = await fetchUserID();
      setUser(res);
      setUsernameEditMode(!usernameEditMode);

      console.log("Username updated successfully.");
    } catch (error) {
      console.error("Error updating username:", error);
    }
  };

  return (
    <div className="top-of-page">
      {/* User Info and SubPageLister Container */}
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "2%",
            marginTop: "2%",
          }}
        >
          <div style={{ textAlign: "start", marginLeft: "2%" }}>
            <Button
              ref={buttonRef}
              onClick={() => {
                onClickSettlementCycle();
              }}
            >
              Change settlement cycle
            </Button>
            {ShowSettlementCycle && (
              <div>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="settlementCycle"
                  label="Settlement Cycle"
                  name="settlementCycle"
                  select
                  size="small"
                  sx={{ width: textFieldWidth }}
                  value={settlementCycle}
                  onChange={(e) => setSettlementCycle(e.target.value)}
                  SelectProps={{
                    IconComponent: () => null,
                    native: false,
                  }}
                >
                  {settlementCycles.map((cycle, index) => (
                    <MenuItem key={index} value={cycle}>
                      {cycle}
                      {currentSettlementCycle === cycle && (
                        <CheckIcon style={{ marginLeft: "auto" }} />
                      )}
                    </MenuItem>
                  ))}
                </TextField>
                <div>
                  <Button onClick={() => onSubmitChangedSettlementCycle()}>
                    Submit
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div
            className="delete-user-button"
            style={{ marginLeft: "auto", marginRight: "2%" }}
          >
            <Button
              variant="contained"
              style={{ backgroundColor: "red", color: "white" }}
              onClick={DeleteUser}
            >
              Delete User
            </Button>
          </div>
        </div>
        {/* User Image Container */}
        <div
          className="user-image-container"
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <CardMedia
              component="img"
              sx={{
                width: 180,
                height: 180,
                borderRadius: "50%",
                marginRight: "20px",
                objectFit: "cover",
                "@media (max-width:600px)": {
                  width: 140,
                  height: 140,
                },
              }}
              image={User.pictureURL}
              alt="User Picture"
            />
          </div>
          <div className="Edit-user-image">
            <label htmlFor="profile-picture-upload">
              <Input
                id="profile-picture-upload"
                type="file"
                name="image"
                onChange={handleOnChange}
                style={{ display: "none" }}
                inputProps={{accept:"image/png,image/jpg"}}
              />
              <IconButton
                size="large"
                title="Edit profile picture"
                component="span"
                style={{ color: "blue" }}
              >
                <EditIcon />
              </IconButton>
            </label>
          </div>
        </div>

        {/* User Details */}
        <div className="user-details" style={{ marginTop: "10px" }}></div>

        <Typography
          variant="h4"
          component="div"
          style={{ marginBottom: "10px" }}
        >
          {usernameEditMode ? (
            <>
              <Input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmitChangeUsername}
              >
                Submit
              </Button>

              <IconButton
                size="small"
                title="Edit username"
                component="span"
                style={{ color: "blue", marginLeft: "5px" }}
                onClick={changeUsernameEditMode}
              >
                <EditIcon />
              </IconButton>
            </>
          ) : (
            <div style={{ display: "flex", justifyContent: "center" }}>
              {User.username}
              <IconButton
                size="small"
                title="Edit username"
                component="span"
                style={{ color: "blue", marginLeft: "2px" }}
                onClick={changeUsernameEditMode}
              >
                <EditIcon />
              </IconButton>
            </div>
          )}
        </Typography>
        <Typography
          component="div"
          style={{ fontSize: 14, textDecoration: "" }}
          color="text.secondary"
          gutterBottom
        >
          {`${User.firstName} ${User.lastName}`}
        </Typography>
      </div>

      <div>
        <a
          className="show-pages-dropdown"
          style={{ textAlign: "center", width: "35%", marginRight: "3%" }}
        >
          <ProfileSubPageLister
            ref={PageRef}
            pages={Upages}
            onSelectedPage={onSelectedPage}
            onAddPage={onAddPage}
            userID={User.id}
          />
        </a>

        {showAddPage && <PageAdd onAdd={addPage} />}

        {selectedPage != null && (
          <div>
            <PageNavigator pageId={selectedPage} userId={User.id} />
          </div>
        )}
      </div>
    </div>
  );
};
export default ProfilePage;
