import Link from "next/link";

export const Pagination = ({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) => {
  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className="flex justify-center items-center gap-4 pt-8">
      {!isFirstPage && (
        <Link
          className="text-gray-600 hover:text-gray-800"
          href={`/admin/products?page=${page - 1}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
            />
          </svg>
        </Link>
      )}

      <div className="flex justify-center gap-2">
        {
          pages.map(pageIndex => (
            <div
              key={pageIndex}
             
            >
              <Link 
                href={`/admin/products?page=${pageIndex}`}
               className={`${
                page === pageIndex ? "bg-amber-400 text-white border-transparent" : "bg-white hover:bg-orange-500 hover:text-white"
              } text-sm font-semibold py-2 px-4 rounded transition-colors` }
              >
                {pageIndex}
              </Link>
              
            </div>
          ))
        }
      </div>

      {!isLastPage && (
        <Link
          className="text-gray-600 hover:text-gray-800"
          href={`/admin/products?page=${page + 1}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
            />
          </svg>
        </Link>
      )}
    </nav>
  );
};
