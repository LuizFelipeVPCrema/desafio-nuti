import { OrgInfoType } from "@/OrgInfo";
import React from "react";


interface OrgInfoProps {
    org: OrgInfoType;
}

const OrgInfoComponent: React.FC<OrgInfoProps> = ({ org }) => (
    <div>
        <h2>{org.razaoSocial}</h2>
    </div>
);

export default OrgInfoComponent;