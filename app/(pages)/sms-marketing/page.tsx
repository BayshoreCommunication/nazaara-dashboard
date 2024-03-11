"use client";
import { cloudinaryImageUpload } from "@/helpers";
import { cloudinaryImageDeleteWithUrl } from "@/helpers/cloudinaryImageDeleteWithUrl";
import axios from "axios";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ScaleLoader } from "react-spinners";

const SmsMarketing = () => {
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  // console.log("file", imageFile);

  const [filteredData, setFilteredData] = useState({
    id: "",
    imageUrl: "",
  });

  // console.log("filteredData", filteredData);

  const apiUrl = `${process.env.API_URL}/api/v1/special-campain`;
  const updateApiUrl = `${process.env.API_URL}/api/v1/special-campain/${filteredData.id}`;
  //set existing image url into filteredData state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            authorization: `Nazaara@Token ${process.env.API_SECURE_KEY}`,
          },
        });
        // console.log("respnse", response);

        setFilteredData({
          id: response.data.data[0]._id,
          imageUrl: response.data.data[0].imageUrl,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [apiUrl]);

  const handleUpdate = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setImageUploadLoading(true);
    if (imageFile) {
      try {
        const previousImage = filteredData.imageUrl;
        if (previousImage) {
          await cloudinaryImageDeleteWithUrl(filteredData.imageUrl);
        }
        const { secureUrl } = await cloudinaryImageUpload(imageFile);
        if (secureUrl) {
          toast.success("new image added successfully");
        }
        // console.log("secureurl", secureUrl);

        // upload image url into database
        if (secureUrl) {
          const response = await axios.patch(
            updateApiUrl,
            { imageUrl: secureUrl },
            {
              headers: {
                authorization: `Nazaara@Token ${process.env.API_SECURE_KEY}`,
              },
            }
          );

          if (response.data) {
            toast.success("updated successfully");
          }
        }
      } catch (error) {
        console.error("Error updating data", error);
        toast.error("Error update");
      } finally {
        setImageUploadLoading(false);
      }
    }
  };

  return (
    <main className="m-4">
      <h1 className="text-xl font-semibold mb-4">SMS Marketing</h1>
      <p className="text-red-600 text-xs my-2 font-semibold">
        * After Image uploading please reload to see the changes
      </p>
      <form className="main-container" onSubmit={handleUpdate as any}>
        <div className="mb-2">
          <label className="font-medium" htmlFor="status">
            Image:
          </label>
          {imageUploadLoading ? (
            <div className="flex items-center gap-2 my-2">
              <span>uploading </span>
              <ScaleLoader
                color="#820000"
                margin={3}
                speedMultiplier={1.5}
                height={15}
                width={3}
              />
            </div>
          ) : (
            <>
              {filteredData.imageUrl && (
                <Image
                  src={filteredData.imageUrl}
                  alt="featuredImage"
                  width={300}
                  height={260}
                  className="mb-4 mt-2"
                />
              )}
            </>
          )}

          <input
            type="file"
            id="imageUpload"
            name="imageUpload"
            onChange={(e) => setImageFile(e.target.files?.[0] as any)}
          ></input>
        </div>
        <div className="w-max mt-4">
          <button
            className={`${
              imageUploadLoading && "cursor-not-allowed"
            } bg-secondary py-1 px-4 rounded-md text-white w-full`}
            type="submit"
            disabled={imageUploadLoading}
          >
            Update
          </button>
        </div>
      </form>
    </main>
  );
};

export default SmsMarketing;
