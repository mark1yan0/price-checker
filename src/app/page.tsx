import AddNewButton from "@/components/Buttons/AddNewButton";
import ListItem from "@/components/ListItem";
import { getItems } from "@/db";
import Link from "next/link";

export default async function Home() {
  const data = await getItems();
  return (
    <>
      <h2 className="mb-4 mt-8 text-2xl">my list</h2>

      {!data ? (
        <p>No data</p>
      ) : (
        data.map((item) => {
          return <ListItem item={item} key={item.id} />;
        })
      )}

      <AddNewButton />
    </>
  );
}
