import { BiFile } from "react-icons/bi";

const BookDetailSkeleton = () => {
  return (
    <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start animate-pulse">
      <article className="flex-1">
        {/* PDF placeholder */}
        <div className="rounded-xl w-full aspect-video bg-slate-300 flex justify-center items-center">
          <BiFile className="text-4xl text-slate-400" />
        </div>
        {/* title */}
        <div className="mt-4 md:text-[26px] w-2/5 h-2 rounded-lg bg-slate-400" />
        <div className="mt-4 prose prose-sm sm:prose-base">
          <p className="w-1/2 h-2 mt-6 rounded-lg bg-slate-300"></p>
          <p className="w-full h-2 mt-4 rounded-lg bg-slate-300"></p>
          <p className="w-[70%] h-2 mt-4 rounded-lg bg-slate-300"></p>
          <p className="w-4/5 h-2 mt-4 rounded-lg bg-slate-300"></p>
        </div>
      </article>

      {/* Suggested books */}
      <div
        className={`w-full shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] rounded-lg p-4 mt-8 lg:mt-0 lg:max-w-xs`}
      >
        {/* title */}
        <div className="w-[20%] h-2 rounded-lg bg-slate-300" />
        <div className="grid gap-y-5 mt-5 md:grid-cols-2 md:gap-x-5 lg:grid-cols-1">
          {[...Array(6)].map((item, index) => (
            <div
              key={index}
              className="flex space-x-3 flex-nowrap items-center"
            >
              {/* PDF placeholder */}
              <div className="aspect-square w-1/5 rounded-lg bg-slate-300 flex justify-center items-center">
                <BiFile className="text-2xl text-slate-400" />
              </div>
              <div className="w-full">
                {/* book title */}
                <div className="w-full h-2 rounded-lg " />
                <p className="w-[60%] h-2 mt-4 rounded-lg "></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookDetailSkeleton;
