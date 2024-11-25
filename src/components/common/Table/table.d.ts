export type Column = {
    label: string
    accessorKey: string
    type: "text" | "email" | "tel" | "textarea" | "select" | "radio" | "checkbox"
    required?: boolean
    options?: string[]
}

export type Actions = {
    label: string
    type: "link" | "dialog"
    href: string
    // icon: React.ReactNode
}

export default interface TableDefinition {
    bulkActions: Actions[] | undefined
    filter: boolean
    columns: Column[] | undefined
}