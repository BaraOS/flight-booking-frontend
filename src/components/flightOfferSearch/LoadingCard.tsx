import { Skeleton } from "@/components/ui/skeleton";

const LoadingCard = () => {
  return (
    <div className="relative mx-3 w-full sm:max-w-[800px]">
      <div className="absolute -left-[10px] bottom-[26.3%] h-[20px] w-[20px] rounded-full bg-gray-100 sm:-top-[12px] sm:bottom-auto sm:left-auto sm:right-[23.85%]"></div>
      <div className="absolute -right-[10px] bottom-[26.3%] h-[20px] w-[20px] rounded-full bg-gray-100 sm:-bottom-[12px] sm:right-[23.85%]"></div>
      <div className="flex w-full flex-col rounded-xl bg-white shadow-md sm:h-[250px] sm:flex-row sm:shadow-sm">
        <div className="flex w-[75%] items-center justify-evenly gap-4 px-2">
          <div>
            <Skeleton className="h-[100px] w-[100px] rounded-full" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-[60px] w-[100px]" />
            <Skeleton className="h-[20px] w-[100px]" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="h-[20px] w-[100px]" />
            <Skeleton className="h-[20px] w-[50px]" />
            <Skeleton className="h-[20px] w-[70px]" />
          </div>
          <div>
            <Skeleton className="h-[100px] w-[100px] rounded-full" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-[60px] w-[100px]" />
            <Skeleton className="h-[20px] w-[100px]" />
          </div>
        </div>
        <div className="w-[25%]">
          <div className="flex h-full flex-col items-center justify-center gap-5">
            <Skeleton className="h-[50px] w-[130px]" />
            <Skeleton className="h-[50px] w-[130px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingCard;
