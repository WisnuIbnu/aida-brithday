type RsvpButtonProps = {
  className?: string;
};

export default function RsvpButton({ className = "" }: RsvpButtonProps) {
  return (
    <button
      type="button"
      className={[
        "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-white",
        "transition duration-300",
        "bg-[#8B6914] hover:bg-[#6B4F12]",
        "shadow-md hover:shadow-lg hover:shadow-[#8B6914]/30",
        "active:scale-95",
        className,
      ].join(" ")}
    >
      Submit RSVP
    </button>
  );
}