import { Entry } from "../types";
import HealthCheck from "../components/HealthCheck";
import Hospital from "../components/Hospital";
import OccupationalHealth from "../components/OccupationalHealth";
// import { useStateValue } from "../state";

const EntryLine = ({ entry }:{entry:Entry}) => {
  // const [{ diagnoses }] = useStateValue();

  const assertNever = (entry:never):never => {
    throw new Error(
      `${JSON.stringify(entry)} was not accounted for`
      );
  };

  switch(entry.type) {
    case "HealthCheck":
      return <HealthCheck entry={entry}/>;
    case "OccupationalHealthcare":
      return <OccupationalHealth entry={entry}/>;
    case "Hospital":
      return <Hospital entry={entry}/>;
    default:
      return assertNever(entry);
  }
};

export default EntryLine;