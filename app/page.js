import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Welcome</h1>
      <Link href="/articles">Read our articles</Link>
    </div>
  );
}