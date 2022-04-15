import { Entry } from "../types";
import { useStateValue } from "../state";

const EntryLine = ({ entry }:{entry:Entry}) => {
  const [{ diagnoses }] = useStateValue();
  const displayDiagnoses = (entry:Entry) => {
    if(!entry.diagnosisCodes) {
      return '';
    }

    return (
      <ul>
        {entry.diagnosisCodes.map(code => {
          return <li key={code}>{code} {diagnoses[code].name}</li>;
        })}
      </ul>
    );
  };

  return(
    <>
      <p>{entry.date} {entry.description}</p>
      {displayDiagnoses(entry)}
    </>
  );
};

export default EntryLine;