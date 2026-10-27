interface PriceTableProps {
  columns: [string, string];
  rows: [string, string][];
  /** id of the heading that names this table. */
  labelledBy?: string;
}

export default function PriceTable({ columns, rows, labelledBy }: PriceTableProps) {
  return (
    <div className="mt-4 overflow-x-auto rounded-2xl bg-mint-light ring-1 ring-deep/5">
      <table aria-labelledby={labelledBy} className="w-full min-w-[20rem] text-left text-sm">
        <thead>
          <tr className="border-b border-deep/10">
            <th scope="col" className="px-5 py-3.5 font-bold">
              {columns[0]}
            </th>
            <th scope="col" className="px-5 py-3.5 text-right font-bold">
              {columns[1]}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([service, price]) => (
            <tr key={service} className="border-b border-deep/5 last:border-0">
              <th scope="row" className="px-5 py-3 font-medium text-ink">
                {service}
              </th>
              <td className="whitespace-nowrap px-5 py-3 text-right font-semibold text-deep">
                {price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
