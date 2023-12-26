import { BaseSkeletonLoader, CardRoot } from "@/components";

interface QuoteCardProps {
  content: string;
  source_text: string;
  media_detail_text: string;
}

export const QuoteCard = ({
  content,
  source_text,
  media_detail_text,
}: QuoteCardProps) => (
  <div className="flex flex-col group hover:shadow-lg hover:-mt-1 hover:mb-1 transition-all relative bg-white dark:bg-neutral-200 rounded-md">
    <div className="px-6 pb-6 pt-16 grow text-base md:text-2xl text-neutral-700 font-bold">
      {content}
    </div>
    <div className="px-6 pt-4 pb-6 flex justify-between">
      <p className="inline-block border-b-4 border-transparent transition-colors text-neutral-600 text-base md:text-lg group-hover:border-neutral-700 group-hover:text-neutral-800">
        {`${media_detail_text}, ${source_text}`}
      </p>
    </div>
  </div>
);

export const QuoteCardLoading = () => (
  <CardRoot className="flex flex-col" rounded>
    <div className="px-6 pb-6 pt-16 grow text-2xl text-neutral-700 dark:text-neutral-200 font-bold flex flex-col gap-1">
      <BaseSkeletonLoader
        className="rounded-md w-full"
        style={{ height: "32px" }}
      />

      <BaseSkeletonLoader
        className="rounded-md w-1/2"
        style={{ height: "32px" }}
      />
    </div>
    <div className="px-6 pt-4 pb-6 flex justify-between">
      <p className="flex flex-row items-end">
        <BaseSkeletonLoader
          className="rounded-md w-24 mr-0.5"
          style={{ height: "32px" }}
        />
      </p>
    </div>
  </CardRoot>
);
