export const ImageLoadingIndicator = () => (
    <div
        className="absolute inset-0 bg-neutral-200 dark:bg-gray-800 z-40 flex items-center justify-center gap-1.5">
        <span className="block relative rounded-full h-1.5 w-1.5 bg-gray-500 animate-bounce"/>
        <span
            className="block relative rounded-full h-1.5 w-1.5 bg-gray-500 animate-bounce"
            style={{animationDelay: '250ms'}}
        />
        <span
            className="block relative rounded-full h-1.5 w-1.5 bg-gray-500 animate-bounce"
            style={{animationDelay: '400ms'}}
        />
    </div>
);
