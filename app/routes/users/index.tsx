import { json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { mongodb } from "~/utils/db.server";
import type { User } from "~/utils/types.server";
import UserComponent from "~/components/user";

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);

  let db = await mongodb.db("sample_mflix");
  let collection = await db.collection("users");
  let users = await collection.find({}).limit(10).toArray();

  let searchedUsers: User[] = [];
  let searchTerm = url.searchParams.get("search");
  if (searchTerm) {
    let searchRegex = new RegExp(searchTerm, "i");
    searchedUsers = (await collection
      .find({ name: { $regex: searchRegex } })
      .limit(10)
      .toArray()) as User[];
  }

  return json({ users, searchedUsers });
}

export default function Users() {
  let { users, searchedUsers } = useLoaderData();
  return (
    <div>
      <h1>Users</h1>
      <h2>Fetch Ten Users</h2>
      <p className="mb-2">Here are some users from `sample_mflix.users`</p>
      {users.map((user: User) => {
        return <UserComponent key={user.id} {...user} />;
      })}

      <hr />

      <h2>Search for a user</h2>
      <Form>
        <input type="text" name="search" placeholder="Partial Name" />
        <button type="submit">Search</button>
      </Form>
      {!!searchedUsers.length &&
        searchedUsers.map((user: User) => {
          return <UserComponent key={user.id} {...user} />;
        })}
    </div>
  );
}
