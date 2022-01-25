import { Route, Link } from 'react-router-dom';

const tempTask = {
  _id: 'abc',
  title: 'Make wireframes',
  description: 'Prepare wireframe for each view',
  stage: 'Todo',
  dueDate: 'Tue Jan 25 2022 10:12:52 GMT-0500',
  priority: 2,
  owner: 'eladsadeh',
  checklist: [{ title: 'Main View', checked: false }],
  comments: [
    {
      user: 'kurt',
      content: 'lets do it',
      time: 'Mon Jan 24 2022 9:12:52 GMT-0500',
    },
  ],
  files: ['planning.md'],
};

function TaskCard({ task }) {
  return (
    <div>
      <p>{task.title}</p>
      <Link to={`/task/${task._id}`} />
    </div>
  );
}

export default TaskCard;
