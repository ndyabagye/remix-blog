import { type ActionArgs, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { mongodb } from "~/utils/db.server";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const user = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const db = await mongodb.db("sample_mflix");
  const collection = await db.collection("users");
  const result = await collection.insertOne(user);
  return redirect(`/users/${result.insertedId}`);
}

export default function Index() {
  return (
    <div>
      <h2>Add a User</h2>
      <Form method="POST" action="/users/add">
        <input type="text" name="name" placeholder="Name" />
        <br />
        <br />
        <input type="text" name="email" placeholder="Email" />
        <br />
        <br />
        <input type="text" name="password" placeholder="Password" />
        <br />
        <br />
        <button type="submit">Search</button>
      </Form>
    </div>
  );
}
