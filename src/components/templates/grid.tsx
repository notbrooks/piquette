interface GridTemplateProps {
    children: React.ReactNode;
}

export function GridContainer({ children }: GridTemplateProps) {
    return (
        <div role="list" className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
            {children}
        </div>
    )
}