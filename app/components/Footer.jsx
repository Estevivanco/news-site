export default function Footer({ text }) {
  return (
    <footer className="mt-auto border-t border-black/10 px-6 py-4 text-center text-sm dark:border-white/15">
      <p>{text}</p>
    </footer>
  );
}