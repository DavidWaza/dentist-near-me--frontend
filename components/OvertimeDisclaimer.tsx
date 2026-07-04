interface OvertimeDisclaimerProps {
  serviceTitle: string;
  durationMinutes: number;
  startLabel: string;
  endLabel: string;
  closingLabel: string;
  showAcknowledgment?: boolean;
  acknowledged?: boolean;
  onAcknowledgeChange?: (acknowledged: boolean) => void;
}

export default function OvertimeDisclaimer({
  serviceTitle,
  durationMinutes,
  startLabel,
  endLabel,
  closingLabel,
  showAcknowledgment = false,
  acknowledged = false,
  onAcknowledgeChange,
}: OvertimeDisclaimerProps) {
  return (
    <div
      role="note"
      className="rounded-2xl border border-amber-300/80 bg-amber-50 px-4 py-3.5 text-sm text-amber-950"
    >
      <p className="font-bold">Overtime fee applies</p>
      <p className="mt-1.5 leading-relaxed text-amber-900/90">
        Your <strong>{serviceTitle}</strong> visit ({durationMinutes} min) is scheduled from{" "}
        <strong>{startLabel}</strong> to <strong>{endLabel}</strong>, which is after our standard
        closing time of <strong>{closingLabel}</strong>. An additional overtime convenience fee will
        be charged for the extended session.
      </p>
      {showAcknowledgment && onAcknowledgeChange && (
        <label className="mt-3 flex cursor-pointer items-start gap-2.5">
          <input
            type="checkbox"
            checked={acknowledged}
            onChange={(event) => onAcknowledgeChange(event.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-amber-400 text-deep focus:ring-teal/30"
          />
          <span className="text-xs leading-relaxed">
            I understand and agree to the overtime convenience fee before confirming this booking.
          </span>
        </label>
      )}
    </div>
  );
}
