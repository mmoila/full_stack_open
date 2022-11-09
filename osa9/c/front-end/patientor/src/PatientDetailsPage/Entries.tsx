import { 
  Entry,
  Patient } from "../types";
import { v4 as uuid } from 'uuid';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  Work,
  LocalHospital,
  MonitorHeart
} from "@mui/icons-material";
import { SvgIconComponent } from "@mui/icons-material";


interface Props {
  patientDetails: Patient | null;
}

interface EntryProps {
  entry: Entry;
  Icon?: React.ReactElement<SvgIconComponent>;
}


const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const getHealthRating = (rating: number) => {
  switch(rating) {
    case 0:
      return <FavoriteIcon sx={{color: "green"}} />;
    case 1:
      return <FavoriteIcon sx={{color: "yellow"}} />;
    case 2:
      return <FavoriteIcon sx={{color: "orange"}} />;
    case 3:
      return <FavoriteIcon sx={{color: "red"}} />;
    default: 
      return null;
  }
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const iconStyle = {
    margin: "-10px 5px 0 0"
  };

  const BaseEntry =  ({ entry, Icon }: EntryProps) => {
    return (
      <div>
        <p>{Icon} {entry.date} {entry.description}</p>
        <p>{entry.specialist}</p>
        <ul>
          {entry.diagnosisCodes?.map(c => <li key={c}>{c}</li>)}
        </ul>
      </div>
    );
  };
  
  switch(entry.type) {
    case "HealthCheck":
      return (
        <div>
          <div style={{display: "flex"}}>
            <BaseEntry entry={entry} Icon={<MonitorHeart style={iconStyle}/>}/>
          </div>
          
          {getHealthRating(entry.healthCheckRating)}
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div>
          <div style={{display: "flex"}}>
            <BaseEntry entry={entry} Icon={<Work style={iconStyle}/>}/>
          </div>
          <p>employer: {entry.employerName}</p>
          {entry.sickLeave !== undefined ?
            (<p>
              Sickleave<br/>
              start: {entry.sickLeave.startDate}<br/>
              end: {entry.sickLeave.endDate}
            </p>)
          : null
          }
        </div>
      );
    case "Hospital":
      return (
        <div>
          <BaseEntry entry={entry} Icon={<LocalHospital style={iconStyle}/>}/>
          <p>
            discharge<br/>
            date: {entry.discharge.date}<br/>
            criteria: {entry.discharge.criteria}
          </p>
        </div>
      );
    default:
      return assertNever(entry);
  }
};

const Entries = ({ patientDetails }: Props) => {

  if (patientDetails === null) {
    return null;
  }

  return (
    <div style={{marginBottom: "20px"}}>
      <h3>entries</h3>
        {patientDetails.entries.map(e => {
          return (
            <div className="Entries" style={{
              border: "solid", 
              padding: "5px", 
              marginBottom: "2px",
              borderRadius: "5px"
            }} key={uuid()}>
              <EntryDetails entry={e} />
            </div>
          );
        })}
    </div>
    
  );
};



export default Entries;