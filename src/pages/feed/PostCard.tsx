import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import post from '../../api/post';
import { getUserId } from '../../assets/helpers';
import get from '../../api/get';

interface Volunteer {
  id: number;
  name: string;
}

interface PostCardProps {
  event: {
    category: string;
    title: string;
    postedBy: string;
    createdOn: string;
    startsOn: string;
    endsOn: string;
    description: string;
    id: number;
    neededVolunteers: number;
    currentVolunteers: number;
    storyPoints: number;
    currentVolunteersNames: string[];
    categories: string[];
    createdBy: string;
    volunteers: Array<Volunteer>;
  },
  setEvents: Function
}

export default function PostCard(props: PostCardProps) {
  const date = dayjs(props.event.startsOn).format('MM/DD/YYYY');
  const startHours = dayjs(props.event.startsOn).format('HH:mm');
  const endHours = dayjs(props.event.endsOn).format('HH:mm');

  const handleVolunteerButton = async () => {
    const response = await post("/Event/AddVolunteer", props.event.id);
    if (response) {
      const response = await get("/Event/GetAllEvents");
      props.setEvents(await response.json());
    }
  };

  return (
    <Card sx={{ minWidth: 275, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <CardContent>
        <Typography variant="h6" color="primary" gutterBottom>
          {props.event.category}
        </Typography>
        <Typography variant="h5" component="div" gutterBottom>
          {props.event.title} - by {props.event.createdBy}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 1 }}>
          <strong>Date:</strong> {date}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 1 }}>
          <strong>Time:</strong> {startHours} - {endHours}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 1 }}>
          <strong>Story Points:</strong> {props.event.storyPoints}
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ mt: 2 }}>
          {props.event.description}
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ mt: 2 }}>
          <strong>Volunteers:</strong>{' '}
          {props.event.volunteers.map((volunteer) => (
            <span key={volunteer.id}>{volunteer.name}, </span>
          ))}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={handleVolunteerButton}
          disabled={props.event.volunteers.some(
            (volunteer) => volunteer.id === getUserId()
          )}
        >
          Volunteer
        </Button>
      </CardActions>
    </Card>
  );
}
