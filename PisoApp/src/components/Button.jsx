export default function Button({
  children,
  px = "px-16",
  hoverBg = "hover:bg-[#10549f] hover:text-white",
  isRound = true,
  url,
  target="_blank",
  borderB = "border border-black",
  click
}) {
  const baseStyle =
    "whitespace-nowrap py-2 transition ease-in-out hover:scale-105";
  const classStyle = isRound ? "rounded-full" : "rounded-md";

  function handleClick() {
    if (url) {
      window.open(url, target);
    }
    if (url?.startsWith("/")) {
    return (
      <Link
        to={url}
        className="whitespace-nowrap py-2 px-8 rounded-full transition ease-in-out hover:scale-105 bg-black/80 hover:bg-black text-white"
      >
        {children}
      </Link>
    );
  }

    if (click) {
      click()
    }
  }

  return (
    <button
      className={`${px} ${hoverBg} ${classStyle} ${baseStyle} ${borderB}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
