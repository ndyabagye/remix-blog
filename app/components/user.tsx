import { Link } from "@remix-run/react";

export default function User(props: any) {
  return (
    <div key={props._id}>
      <Link to={`/users/${props._id}`}>
        {props.name} ({props.email})
      </Link>
    </div>
  );
}
