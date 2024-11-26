
interface BusineessTableProps {
    profile: {};
    rows: any[];
    setRows: React.Dispatch<React.SetStateAction<unknown[]>>;
}

export default function BusinessTable( {profile, rows, setRows}: BusineessTableProps) {
    
    return (
        <div>
            <h3>Business Table</h3>
            <div>{JSON.stringify(profile, null, 2)}</div>
            <div>
                <h3>Table Data</h3>
                {JSON.stringify(rows, null, 2)}
            </div>
        </div>
    )
}