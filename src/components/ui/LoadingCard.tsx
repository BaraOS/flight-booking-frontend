import { Skeleton } from "@/components/ui/skeleton";

const LoadingCard = () => {
  return (
    <div className="flex justify-center">
      <div className="flex w-full items-center justify-center gap-4">
        <Skeleton className="h-[80px] w-[80px] rounded-full bg-gray-300 sm:h-[80px] sm:w-[80px]" />
        <div className="flex flex-col justify-center gap-2">
          <Skeleton className="h-[20px] w-[300px] bg-gray-300 sm:w-[600px]" />
          <Skeleton className="h-[20px] w-[300px] bg-gray-300 sm:w-[500px]" />
          <Skeleton className="h-[20px] w-[300px] bg-gray-300 sm:w-[400px]" />
          <Skeleton className="h-[20px] w-[300px] bg-gray-300 sm:w-[300px]" />
        </div>
      </div>
    </div>
  );
};

export default LoadingCard;
