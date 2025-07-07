"use client";

import { useState } from "react";
import { pinata } from "@/utils/config";
import { Button } from "@/components/ui/button";
import { Upload, Loader2 } from "lucide-react";

type Props = {
  onUpload: (url: string) => Promise<any>;
};

export default function UploadImgButton({ onUpload }: Props) {
  const [file, setFile] = useState<File>();
  const [uploading, setUploading] = useState(false);

  const uploadFile = async () => {
    if (!file) {
      alert("No file selected");
      return;
    }

    try {
      setUploading(true);
      const urlRequest = await fetch("/api/url"); // Fetches the temporary upload URL
      const urlResponse = await urlRequest.json(); // Parse response
      const upload = await pinata.upload.public.file(file).url(urlResponse.url); // Upload the file with the signed URL
      const fileUrl = await pinata.gateways.public.convert(upload.cid);

      // Call the onUpload callback with the uploaded URL
      await onUpload(fileUrl);
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert("Trouble uploading file");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target?.files?.[0]);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4">
        <input
          type="file"
          onChange={handleChange}
          accept="image/*"
          className="hidden"
          id="profile-upload"
        />
        <label
          htmlFor="profile-upload"
          className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          Choose Image
        </label>
        {file && (
          <Button
            type="button"
            disabled={uploading}
            onClick={uploadFile}
            className="bg-green-600 hover:bg-green-700"
          >
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload"
            )}
          </Button>
        )}
      </div>
      {file && (
        <p className="text-sm text-muted-foreground">Selected: {file.name}</p>
      )}
    </div>
  );
}
