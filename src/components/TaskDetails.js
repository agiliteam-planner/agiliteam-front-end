import { Link, useParams, useMatch } from 'react-router-dom';
import data from "../tasks.json";

function TaskDetails(props) {
 const {params} = useMatch('/task/:id');
  console.log(props);
  console.log(params.id);
  console.log(data);




  return <div>Task Detalis page</div>;
}

export default TaskDetails;
