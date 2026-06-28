type ServiceExpandButtonVariant = "default" | "compact" | "filled";

type ServiceExpandButtonProps = {
  className?: string;
  isOpen: boolean;
  variant?: ServiceExpandButtonVariant;
};

export function ServiceExpandButton({
  className,
  isOpen,
  variant = "default",
}: ServiceExpandButtonProps) {
  return (
    <span
      aria-hidden="true"
      className={[
        "service-expand-button",
        `service-expand-button-${variant}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-state={isOpen ? "open" : "closed"}
    >
      <svg
        className="service-expand-button__icon"
        viewBox="0 0 61.65 61.65"
        role="img"
      >
        <circle
          cx="30.83"
          cy="30.83"
          r="29.83"
          fill="none"
          stroke="currentColor"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <rect x="17.36" y="18.08" width="26.43" height="3.8" fill="currentColor" />
        <rect
          x="29.14"
          y="29.4"
          width="25.5"
          height="3.8"
          fill="currentColor"
          transform="translate(73.19 -10.58) rotate(90)"
        />
        <rect
          x="14.54"
          y="30.19"
          width="30.02"
          height="3.8"
          fill="currentColor"
          transform="translate(73.15 33.89) rotate(135)"
        />
      </svg>
    </span>
  );
}
