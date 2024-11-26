import {Button} from "~/components/ui/button"

export default function BusinessHeader() {
    return (
        <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
            <h3 className="text-2xl font-light leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Job Postings</h3>
            <div className="mt-3 sm:ml-4 sm:mt-0">
                <Button variant="default" size="sm">
                    Add New
                </Button>
            </div>
        </div>
    )
}