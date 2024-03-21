import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ObjectId } from "mongodb";
import { mongodb } from "~/utils/db.server";

export async function loader({ params }: LoaderArgs) {
  const userId = params.userId;

  let db = await mongodb.db("sample_mflix");
  let collection = await db.collection("users");
  let user = await collection.findOne({ _id: new ObjectId(userId) });

  return json(user);
}

export default function Index() {
  const user = useLoaderData();
  return (
    <div>
      <h1>User: {user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
