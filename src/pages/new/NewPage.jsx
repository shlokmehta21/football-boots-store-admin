import React, { useState } from "react";
import NavBar from "../../components/layout/navbar/NavBar";
import SideBar from "../../components/layout/sideBar/SideBar";
import "./New.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { addProduct } from "../../redux/apiCalls";
import app from "../../firebase";
import { useDispatch } from "react-redux";

function NewPage({ title }) {
  const [file, setFile] = useState("");
  const [input, setInput] = useState({});
  const [category, setCategory] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCat = (e) => {
    setCategory(e.target.value.split(","));
  };

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;

    const storage = getStorage(app);
    const StorageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(StorageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = { ...input, img: downloadURL, categories: category };
          addProduct(product, dispatch);
        });
      }
    );
  };

  return (
    <div className="new">
      <SideBar />
      <div className="newContainer">
        <NavBar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  id="file"
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>

              <div className="formInput">
                <label>Title</label>
                <input
                  name="title"
                  type="text"
                  placeholder="Apple Airpods"
                  onChange={handleChange}
                />
              </div>

              <div className="formInput">
                <label>Description</label>
                <input
                  name="desc"
                  type="text"
                  placeholder="description..."
                  onChange={handleChange}
                />
              </div>

              <div className="formInput">
                <label>Price</label>
                <input
                  name="price"
                  type="number"
                  placeholder="100"
                  onChange={handleChange}
                />
              </div>

              <div className="formInput">
                <label>Categories</label>
                <input
                  type="text"
                  placeholder="jeans,skirts"
                  onChange={handleCat}
                />
              </div>

              <div className="formInput">
                <label>Size</label>
                <input
                  type="text"
                  name="size"
                  placeholder="X,Xl"
                  onChange={handleChange}
                />
              </div>

              <div className="formInput">
                <label>Color</label>
                <input
                  type="text"
                  name="color"
                  placeholder="gray darkblue"
                  onChange={handleChange}
                />
              </div>

              <div className="formInput">
                <label>Stock</label>
                <select
                  style={{ padding: "10px" }}
                  name="inStock"
                  onChange={handleChange}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPage;
