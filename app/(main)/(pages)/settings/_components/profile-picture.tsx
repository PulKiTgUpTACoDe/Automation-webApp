"use client";
import React from "react";
import UploadImgButton from "./uploadImg-button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X, User } from "lucide-react";

type Props = {
  userImage: string | null;
  onDelete?: any;
  onUpload: any;
};

const ProfilePicture = ({ userImage, onDelete, onUpload }: Props) => {
  const router = useRouter();

  const onRemoveProfileImage = async () => {
    const response = await onDelete();
    if (response) {
      router.refresh();
    }
  };

  const handleUpload = async (url: string) => {
    const response = await onUpload(url);
    if (response) {
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg font-semibold">Profile Picture</p>
      <div className="flex flex-col items-center justify-center gap-6">
        {userImage ? (
          <>
            <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-primary/20">
              <Image
                src={userImage}
                alt="User Profile"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={onRemoveProfileImage}
                variant="outline"
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <X className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-primary/20 bg-muted flex items-center justify-center">
              <User className="h-16 w-16 text-muted-foreground" />
            </div>
            <UploadImgButton onUpload={handleUpload} />
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePicture;
