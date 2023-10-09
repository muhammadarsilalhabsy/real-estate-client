import { useEffect, useState } from "react";
import { app } from "../utils/firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { toast } from "react-toastify";

const CreateListing = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({
    imageURLs: [],
  });
  console.log(files);
  console.log(formData);

  const handleImagesSubmit = () => {
    if (files.length > 0 && files.length + formData.imageURLs.length < 7) {
      setUploading(true);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageURLs: formData.imageURLs.concat(urls),
          });
          setImageUploadError(null);
          setUploading(false);
        })
        .catch((error) => {
          setImageUploadError("Image Upload failed (max 2 mb per image)");
          setUploading(false);
        });
    } else {
      if (files.length === 0) {
        setImageUploadError("You should upload at least 1 image");
      } else {
        setImageUploadError("You can only upload 6 image per listing!");
      }
      setUploading(false);
    }
  };
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handelRemoveImageFromList = (index) => {
    setFormData({
      ...formData,
      imageURLs: formData.imageURLs.filter((_, i) => i !== index),
    });
  };

  useEffect(() => {
    console.log(imageUploadError);
    if (imageUploadError) {
      toast.error(imageUploadError);
      setImageUploadError(null);
    }
  }, [imageUploadError]);

  return (
    <main className="max-w-6xl mx-auto">
      <h1 className="text-center font-semibold text-xl md:text-3xl my-7">
        Create a new Listing
      </h1>
      <form className="flex flex-col p-3 gap-8">
        <div className="flex gap-4 w-full md:w-11/12 flex-col md:flex-row  mx-auto ">
          <div className="w-full md:w-1/2 space-y-4">
            {/* String */}
            <input
              type="text"
              id="name"
              placeholder="Name"
              maxLength="60"
              minLength="10"
              className="border outline-none p-3 rounded-lg w-full"
              required
            />
            <input
              type="text"
              id="address"
              placeholder="Address"
              maxLength="60"
              minLength="10"
              className="border outline-none p-3 rounded-lg w-full"
              required
            />
            <textarea
              id="description"
              placeholder="Description"
              className="border outline-none p-3 rounded-lg w-full"
              rows={5}
              required
            ></textarea>

            {/* boolean */}
            <div className="flex gap-6 flex-wrap text-sm">
              <div className="flex gap-2 ">
                <input type="checkbox" name="sale" id="sale" className="w-5" />
                <label htmlFor="sale" className="font-medium">
                  Sale
                </label>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" name="rent" id="rent" className="w-5" />
                <label htmlFor="rent" className="font-medium">
                  Rent
                </label>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="parking"
                  id="parking"
                  className="w-5"
                />
                <label htmlFor="parking" className="font-medium">
                  Parking spot
                </label>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="furnished"
                  id="furnished"
                  className="w-5"
                />
                <label htmlFor="furnished" className="font-medium">
                  Furnished
                </label>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="offer"
                  id="offer"
                  className="w-5"
                />
                <label htmlFor="offer" className="font-medium">
                  Offer
                </label>
              </div>
            </div>

            {/* number */}
            <div className="flex gap-4 flex-wrap text-sm">
              <div className="gap-2 flex items-center">
                <input
                  type="number"
                  name="bedrooms"
                  id="bedrooms"
                  min={1}
                  max={10}
                  required
                  className="p-3 outline-none"
                />
                <p className="font-medium">Beds</p>
              </div>
              <div className="gap-2 flex flex-wrap items-center">
                <input
                  type="number"
                  name="bathrooms"
                  id="bathrooms"
                  min={1}
                  max={10}
                  required
                  className="p-3 outline-none"
                />
                <p className="font-medium">Baths</p>
              </div>
              <div className="gap-2 flex flex-wrap items-center">
                <input
                  type="number"
                  name="regularPrice"
                  id="regularPrice"
                  min={1}
                  max={10}
                  required
                  className="p-3 outline-none"
                />
                <span className="text-center">
                  <p className="font-medium">Regular price</p>
                  <p className="text-xs">($ / price)</p>
                </span>
              </div>
              <div className="gap-2 flex flex-wrap items-center">
                <input
                  type="number"
                  name="discount"
                  id="discount"
                  min={1}
                  max={10}
                  required
                  className="p-3 outline-none"
                />
                <span className="text-center">
                  <p className="font-medium">Discounted price</p>
                  <p className="text-xs">($ / price)</p>
                </span>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex-col flex mt-4 md:mt-0">
            <span className="text-xs text-slate-700 mb-4">
              <span className="font-semibold text-sm text-black">Image: </span>
              The first image will be the cover (max 6)
            </span>

            <div className="space-x-2 flex ">
              <input
                onChange={(e) => setFiles(e.target.files)}
                type="file"
                name="images"
                id="images"
                multiple
                accept="images/*"
                className="border p-3 rounded-lg w-full"
              />
              <button
                type="button"
                onClick={handleImagesSubmit}
                className="p-3 border-2 border-green-500 text-green-500 hover:border-green-600 hover:text-green-600 rounded-lg uppercase duration-300 ease-in-out"
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
            <div className="mt-4 max-h-[21rem] overflow-auto px-4">
              {formData.imageURLs !== 0 &&
                formData.imageURLs.map((url, index) => {
                  return (
                    <div
                      className="flex justify-between items-center mb-3"
                      key={index}
                    >
                      <img
                        src={url}
                        alt="prev-upload"
                        className="w-1/2 h-40 object-cover rounded-lg"
                      />

                      <button
                        onClick={() => handelRemoveImageFromList(index)}
                        type="button"
                        className="text-red-500 text-sm font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="w-full md:w-11/12 mx-auto">
          <button
            type="submit"
            className="w-full bg-gray-500 hover:bg-gray-700 duration-300 ease-in-out text-white p-3 rounded-lg font-semibold"
          >
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
