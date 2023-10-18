export default function Footer() {
  return (
    <footer className="text-sm text-center text-gray-600 md:flex md:items-center md:justify-between pb-10 pt-5">
      <p className="">Your data will be persisted in your browser 😊</p>

      <p className="mt-5 md:mt-0">
        Created by{" "}
        <a
          href="https://lichess.org/@/A03L"
          target="_blank"
          rel="noreferrer"
          className="font-bold text-white"
        >
          A03L
        </a>
      </p>
    </footer>
  );
}
