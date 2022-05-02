// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";


import { useEffect, useState } from "react";
import Switch from "@mui/material/Switch";

export default function data() {
  const [state, setState] = useState([{
    path: "solvencyCredentialVerification",
    tem: ["ABD","EBF"],
    desc: "Establish Trust in Solvency",
    active: true,
    policy:
      "verifyAbd :=\"http://127.0.0.1:7776/abd/verify\"\n" +
      "trustSchemeEBF  = \"000G0012V5ZV0TQC6MVWGATR7QX54R63FATH6FXPVYAFCKGB8BWWY5BFKR\"\n" +
      "solvencyTrusted = true {          \n" +
      "\n" +
      "    solvency := input.solvencyVC\n" +
      "    solvency.type[_] == \"SolvencyCredential\" \n" +
      "    solvency.credentialSubject.solvency.value != \"insufficient\"\n" +
      "\n" +
      "    response := http.send({\n" +
      "        \"url\":verifyAbd, \n" +
      "        \"method\":\"POST\" ,\n" +
      "        \"body\":{\n" +
      "            \"issuer_key\": trustSchemeEBF,\n" +
      "            \"subject_key\": solvency.issuer.id,\n" +
      "            \"issuer_attr\": \"trusted\",\n" +
      "            \"backward\": true\n" +
      "            }\n" +
      "        })\n" +
      "    response.body[\"success\"] == true\n" +
      "}\n"
  },{
    path: "ageVerification",
    tem: ["ABD","EUTL"],
    desc: "Establish Trust in Age",
    active: true,
    policy:"verifyAbd :=\"http://127.0.0.1:7776/abd/verify\"\n" +
      "trustSchemeEUTL = \"000G00773DAFT2QKJZJ1EHGB2V77QN0F7T17TXB2XK92R3W3JKTPEKZN90\"\n"+
      "ageVerificationTrusted = true {          \n" +
      "    age := input.ageVC\n" +
      "\n" +
      "    age.type[_] == \"AgeVerificationCredential\"\n" +
      "    age.credentialSubject.age.value == \"legalAge\"\n" +
      "    \n" +
      "    response := http.send({\n" +
      "        \"url\":verifyAbd, \n" +
      "        \"method\":\"POST\" ,\n" +
      "        \"body\":{\n" +
      "            \"issuer_key\": trustSchemeEUTL,\n" +
      "            \"subject_key\": age.issuer.id,\n" +
      "            \"issuer_attr\": \"trusted\",\n" +
      "            \"backward\": true\n" +
      "            }\n" +
      "        })\n" +
      "    response.body[\"success\"] == true\n" +
      "}\n"
  }]);

  const Policy = ({ name, id }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>

      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{id}</MDTypography>
      </MDBox>
    </MDBox>
  );

  return {
    columns: [
      //todo percent from average
      { Header: "Trust Policy", accessor: "policy", width: "45%", align: "left" },
      { Header: "Trust Establishment Mechanisms", accessor: "tem", align: "left" },

      { Header: "Active", accessor: "active", align: "center" },
      {
        Header: "action", accessor: "action", align: "center", Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>   <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Expand
        </MDTypography></span>),
      },
    ],
    rows: state.map(s => ({
      values: s,
      policy: (<Policy name={s.path} id={s.desc}/>),
      tem:  (
        <MDBox ml={-1}>
          {s.tem.map(t => ( <MDBadge badgeContent={t}  mr = {0} variant="gradient" size="sm"/>))}

        </MDBox>

      ),
      active: (            <Switch checked={s.active} onChange={() => s.active = !s.active} color="success" />



      ),

    })),

  };
}
