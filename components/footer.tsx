import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-center text-2xl mt-32 mb-20">
      <h2 className="text-7xl font-bold mb-3">StyleFast</h2>
      <p>Edit & Live preview styles on this website</p>
      <div className="flex mt-10 justify-center gap-5">
        <p className="">
          Made by <Link
            href="https://thisisthecarm1ne.github.io/"
            className="underline transition-all duration-100 hover:font-semibold"
          >Carm1ne</Link>
        </p>
        <p>&#x2022;</p>
        <p>No Cookies</p>
        <p>&#x2022;</p>
        <p>
          Licensed under <Link
            href="https://github.com/ThisIsTheCarm1ne/StyleFast/blob/main/LICENSE"
            className="underline transition-all duration-100 hover:font-semibold"
          >
            GNU GPL v3.0
          </Link>
        </p>
      </div>
    </footer>
  )
}
