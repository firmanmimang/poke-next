import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
  return (
    <>
            <div>
              <Skeleton className="w-[250px] h-10" />
            </div>
            <div className="m-4" style={{ position: "relative", width: '320px', height: '320px' }}>
              <Skeleton className="h-full w-full rounded-lg" />
            </div>
            <Skeleton className="w-[90px] h-5 mb-5" />
            <div className="flex flex-col gap-y-5 mb-7">
              {Array.from({ length: 6 }, (_, index) => 1 + index).map((_, index) => 
                <div className="flex items-stretch md:w-[500px] w-screen px-2" key={index}>
                  <div className="w-2/4">
                    <Skeleton className="w-1/4 h-5" />
                  </div>
                  <Skeleton className="w-2/4 h-5" />
                </div>
              )}
            </div>
        </>
  )
}

export default Loading