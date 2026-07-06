interface SpinnerProps {
  white?: boolean;
}

export default function Spinner({ white }: SpinnerProps) {
  return <span className={`spinner ${white ? "spinner-white" : ""}`} />;
}
