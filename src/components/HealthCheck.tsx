import { HealthCheckEntry } from "../types";
import FavoriteIcon  from '@mui/icons-material/Favorite';

const HealthCheck = ({ entry }: { entry:HealthCheckEntry}) => {
  const colors = {
    0: "green",
    1:  "yellow",
    2:  "purple",
    3: "red",
  };

  const style = {
    border: '2px solid black',
  };

  return (
    <section style={style}>
      <h3>{entry.date}</h3>
      <p>{entry.description}</p>
      <FavoriteIcon sx={{ color: `${colors[entry.healthCheckRating]}` }} />
      <p>Diagnosed by {entry.specialist}</p>
    </section>
  );
};

export default HealthCheck;