import { Profile, Organization } from "~/types";

interface BusinessesProps {
    profile: Profile;
    organization: Organization;
}
export default function Businesses( { profile, organization }: BusinessesProps) {
    return (
        <div>
            <h3>Org Businesses</h3>
        </div>
    )
}