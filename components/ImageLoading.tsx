const ImageLoading = () => (
  <div className="absolute inset-0 bg-neutral-300 dark:bg-gray-800 z-40 flex items-center justify-center gap-1.5">
    <span className="rounded-full h-2 w-2 bg-gray-500 animate-pulse"/>
    <span className="rounded-full h-2 w-2 bg-gray-500 animate-pulse" style={{animationDelay: '200ms'}}/>
    <span className="rounded-full h-2 w-2 bg-gray-500 animate-pulse" style={{animationDelay: '400ms'}}/>
  </div>
)

export default ImageLoading;
