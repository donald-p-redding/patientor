import { HospitalEntry } from '../types';


const Hospital = ({ entry }:{ entry:HospitalEntry}) => {

  const style = {
    border: '2px solid black',
  };


  return (
    <section style={style}>
      <h3>{entry.date}</h3>
      <p>{entry.description}</p>
      <div>
        Discharge:
        <p>date: {entry.discharge.date}</p>
        <p>criteria: {entry.discharge.criteria}</p>
      </div>
    </section>
  );
};

export default Hospital;