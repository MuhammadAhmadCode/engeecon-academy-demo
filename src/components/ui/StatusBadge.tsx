interface StatusBadgeProps {
  status: "pending" | "approved" | "rejected" | string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`status-badge status-${status}`}>
      <span className="status-dot" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
