import { useStateValue } from "../state";
import { useParams } from 'react-router-dom';
import EntryLine from "../components/EntryLine";


const PatientPage = () => {
  const { id } = useParams<{id:string}>();
  const [{ patient }] = useStateValue();


  const { name,
         occupation,
         ssn,
         entries
        } = patient[id ? id : ''];

  return (
    <div>
      <h2>{name}</h2>
      <p>ssh: {ssn}</p>
      <p>occupation: {occupation}</p>
      <section>
        <h3>entries</h3>
        {entries.map(entry => <EntryLine key={entry.id} entry={entry}  />)}
      </section>
    </div>
  );
};

export default PatientPage;