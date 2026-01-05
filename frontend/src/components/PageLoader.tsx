import { LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";

function PageLoader({ publicRoute }: { publicRoute: boolean }) {
  const [showBackendMessage, setShowBackendMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBackendMessage(true);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <LoaderIcon className="size-10 animate-spin" />
      {publicRoute && showBackendMessage && (
        <p className="text-white text-sm mt-2">
          Waking up the server. This may take a moment.
        </p>
      )}
      {!publicRoute && showBackendMessage && (
        <p className="text-white text-sm mt-2">
          This may take a moment. Please wait.
        </p>
      )}
    </div>
  );
}

export default PageLoader;
