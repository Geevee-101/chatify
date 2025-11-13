import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { LoaderIcon } from 'lucide-react';

const shinjiAvatar = "/defaultAvatars/shinji.jpg";
const reiAvatar = "/defaultAvatars/rei.jpg";
const asukaAvatar = "/defaultAvatars/asuka.jpg";

const convertImageToBase64 = async (imageUrl: string): Promise<string> => {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const handleResetDatabase = async (setIsResetting: (value: boolean) => void) => {
  setIsResetting(true);
  try {
    // Convert images to base64
    const shinjiBase64 = await convertImageToBase64(shinjiAvatar);
    const reiBase64 = await convertImageToBase64(reiAvatar);
    const asukaBase64 = await convertImageToBase64(asukaAvatar);

    await axiosInstance.post(`/reset`, {
      shinjiAvatar: shinjiBase64,
      reiAvatar: reiBase64,
      asukaAvatar: asukaBase64,
    })
    toast.success("Database reset successfull");
    setIsResetting(false);
  } catch (error) {
    toast.error(error instanceof AxiosError ? error.response?.data?.message : 'Something went wrong');
    setIsResetting(false);
  }
}

function ResetDatabase() {
  const [isResetting, setIsResetting] = useState(false);

  return (
    <button 
      className="auth-link hover:cursor-pointer"
      onClick={() => handleResetDatabase(setIsResetting)}
      disabled={isResetting}
    >
      {isResetting ? (
        <LoaderIcon className="w-full h-5 animate-spin text-center" />
      ) : (
        'Reset Database'
      )}
    </button>
  )
}

export default ResetDatabase;