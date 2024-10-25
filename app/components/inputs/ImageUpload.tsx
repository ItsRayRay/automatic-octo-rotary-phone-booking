/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import { TbPhotoPlus } from "react-icons/tb";

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const [uploadWidget, setUploadWidget] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.cloudinary) {
      const widget = window.cloudinary.createUploadWidget(
        {
          cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
          uploadPreset: 'y8todhya',
          multiple: false,
        },
        (error: any, result: any) => {
          if (!error && result && result.event === "success") {
            console.log("Upload successful, result:", result);
            onChange(result.info.secure_url);
          }
          if (error) {
            console.error("Upload error:", error);
          }
        }
      );
      setUploadWidget(widget);
    }
  }, [onChange]);

  const openWidget = () => {
    if (uploadWidget) {
      uploadWidget.open();
    }
  };

  return (
    <div>
      <button onClick={openWidget}>Upload Image</button>
      {value && (
        <div className="mt-4">
          <Image width={250} height={250} src={value} alt="Uploaded image" />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
