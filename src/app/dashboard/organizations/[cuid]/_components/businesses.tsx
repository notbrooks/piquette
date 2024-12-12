import { Profile, OrganizationBase } from "~/types";

interface BusinessesProps {
    profile: Profile;
    organization: OrganizationBase;
}
export default function Businesses( { profile, organization }: BusinessesProps) {
    return (
        <div>
            <h3>Org Businesses</h3>
        </div>
    )
}