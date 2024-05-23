import UserForn from "@/components/UserForm";
import React from "react";

interface Props {
  params: { id: string };
}

export default async function UsersEdit({ params }: Props) {
  const response = await fetch(
    `${process.env.URL}/api/users/${parseInt(params.id)}`,
    { next: { revalidate: 0 } }
  );

  let data = await response?.json();

  return (
    <div>
      <UserForn user={data} />
    </div>
  );
}
