interface HeaderComponentProps {
    title: string
    description?: string
}
export default function HeaderComponent({ title, description }: HeaderComponentProps) {
    return (
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {title}
          </h2>
          {description && (
            <p className="mt-3 text-sm leading-6 text-gray-600">
              {description}
            </p>
          )}    
        </div>
        {/* <div className="mt-4 flex md:ml-4 md:mt-0 justify-end sm:justify-end">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Edit
          </button>
          <button
            type="button"
            className="ml-3 inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Publish
          </button>
        </div> */}
      </div>
    )
  }
  