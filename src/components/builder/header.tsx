export default function SectionHeader({title, description, banner}: { title: string, description?: string, banner?: string }) {
    return (
        <div className="bg-white px-6 py-6 sm:py-8 lg:px-8">
            <div className="mx-auto max-w text-center">
                {banner ? <p className="text-base/7 font-semibold text-indigo-600">{banner}</p> : null}
                <h2 className="mt-2 text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">{title}</h2>
                <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">{description}</p>
            </div>
        </div>
    )
}
