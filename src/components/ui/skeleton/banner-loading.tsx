import { Loader2 } from "lucide-react";

export function BannerLoading({image} : {image : string}) {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div
          className="relative w-full h-72 sm:h-80 md:h-96 lg:h-[450px] rounded-xl overflow-hidden shadow-lg"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl flex flex-col items-center">
              <Loader2 className="h-8 w-8 text-white animate-spin mb-2" />
              <p className="text-white font-medium">Loading banner images...</p>
            </div>
          </div>
        </div>
      </div>
    )
}