import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Error: FC<{ message: string }> = ({ message }) => {
  return (
    <div className="flex w-full justify-center">
      <div className="flex h-[400px] flex-col items-center justify-center gap-2 rounded-xl bg-white sm:w-[800px]">
        <h1 className="text-2xl font-semibold text-rose-600">Error</h1>
        <h4 className="text-xl font-medium">{message}</h4>
        <Button>
          <Link to={"/"}>Return to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default Error;
