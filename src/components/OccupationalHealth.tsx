import { OccupationalHealthcareEntry } from "../types";

const OccupationalHealth = ({ entry }: {entry:OccupationalHealthcareEntry}) => {
  const style = {
    border: '2px solid black',
  };

  return (
    <section style={style}>
      <h3>{entry.date} {entry.employerName}</h3>
      <p>{entry.description}</p>
      <p>Diagnosed by {entry.specialist}</p>
    </section>
  );
};

export default OccupationalHealth;