import Link from "next/link";

function MainHeader() {
  return (
    <header>
      <div>
        <Link href="/">NextEvents</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/events">Browse All Event</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
