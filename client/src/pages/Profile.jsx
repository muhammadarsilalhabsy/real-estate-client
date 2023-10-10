import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { APIbaseURL } from "../constant/index.js";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../utils/firebase";

import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUser,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../features/user/userSlice.js";
import { toast } from "react-toastify";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector(
    (state) => state.persistedReducer.user
  );
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  // const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  // firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, photo: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(
        `${APIbaseURL}/api/v1/users/update/${currentUser._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ ...formData, token: currentUser.token }),
        }
      );

      const data = await res.json();

      if (data.success !== false) {
        dispatch(updateUserSuccess(data));
        toast.success(data.msg);
      } else {
        dispatch(updateUserFailure(data.msg));
      }

      // setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(
        `${APIbaseURL}/api/v1/users/delete/${currentUser._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ token: currentUser.token }),
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.success !== false) {
        dispatch(deleteUserSuccess());
        toast.success(data.msg);
      } else {
        dispatch(deleteUserFailure(data.msg));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    dispatch(signOutUser());
    toast.success("You've been sign out");
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);

      const res = await fetch(
        `${APIbaseURL}/api/v1/users/listings/${currentUser._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ token: currentUser.token }),
        }
      );

      const data = await res.json();

      if (data.success !== false) {
        setUserListings(data.data);
        if (data.data.length !== 0) {
          toast.success(data.msg);
        } else {
          toast.info("You did'nt create any listing yet");
        }
      } else {
        showListingsError(true);
      }
    } catch (error) {
      setShowListingsError(true);
      console.log(error);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(
        `${APIbaseURL}/api/v1/listing/delete/${listingId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ token: currentUser.token }),
        }
      );
      const data = await res.json();

      if (data.success !== false) {
        toast.success(data.msg);
        setUserListings((prev) =>
          prev.filter((listing) => listing._id !== listingId)
        );
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.photo || currentUser.photo}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          defaultValue={currentUser.username}
          id="username"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          defaultValue={currentUser.email}
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          onChange={handleChange}
          id="password"
          className="border p-3 rounded-lg"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <Link
          className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
          to={"/create-listing"}
        >
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign out
        </span>
      </div>

      <div className="flex flex-col justify-center my-4">
        <button onClick={handleShowListings} className="text-green-700 ">
          Show My Listings
        </button>

        <div className="mt-8">
          {showListingsError && (
            <p className=" bg-red-500 text-center text-white p-3 text-xs">
              Error Showing listing, please refresh the pages!
            </p>
          )}

          {userListings.length !== 0 && (
            <div className="max-h-[21rem] overflow-auto px-4">
              {userListings.map((data) => {
                return (
                  <div
                    className="flex justify-between items-center mb-3"
                    key={data._id}
                  >
                    <Link to={`/listing/${data._id}`} className="w-1/2 h-40">
                      <img
                        src={data.imageURLs[0]}
                        alt="prev-upload"
                        className="w-full h-full object-cover rounded-lg"
                        title={data.name}
                      />
                    </Link>
                    <div className="flex flex-col md:flex-row gap-4">
                      <button
                        onClick={() => handleListingDelete(data._id)}
                        type="button"
                        className="bg-red-500 py-2 px-4 rounded-lg text-sm font-semibold text-center"
                      >
                        Delete
                      </button>
                      <Link
                        to={`/update-listing/${data._id}`}
                        className="bg-yellow-500 py-2 px-4 rounded-lg text-sm font-semibold text-center"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
