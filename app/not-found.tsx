import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-3">
      <h2 className="text-3xl font-bold">Opps! Not Found😓</h2>
      <p className="font-semibold">Could not find requested resource</p>
      <Link className="bg-secondary rounded-md px-2 py-1 text-white" href="/">
        Return Home
      </Link>
    </div>
  );
}
