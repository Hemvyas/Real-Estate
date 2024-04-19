import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import "./UploadImage.css";
const UploadImage = ({ property, setProperty }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dv3r06lvs",
        uploadPreset: "qjah240c",
        maxFiles: 1,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          setImageUrl(result.info.secure_url);
          setProperty((prev) => ({
              ...prev,
              image: result.info.secure_url,
            }));
          }
        }
    );
  }, []);

  return (
    <>
      <div className="flexColCenter uploadWrapper">
        {!imageUrl ? (
          <div
            className="flexColCenter uploadArea"
            onClick={() => widgetRef.current?.open()}
          >
            <AiOutlineCloudUpload size={60} color="gray" />
            <span>Upload image</span>
          </div>
        ) : (
          <div
            className="uploadImage"
            onClick={() => widgetRef.current?.open()}
          >
            <img src={imageUrl} alt="Uploaded" />
          </div>
        )}
      </div>
    </>
  );
};

export default UploadImage;
