interface ColumnProps {
    children: React.ReactNode;
}

export default function Column({ children }: ColumnProps) {
    return (
        <div className="w-full space-y-5">
            {children}
        </div>
    )
}