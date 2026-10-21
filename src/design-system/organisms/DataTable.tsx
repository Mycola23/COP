import type { DataTableProps } from '@/types';

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  onRowClick,
  rowClassName,
  sortField,
  sortDirection,
  onSort,
  footerText,
  ariaLabel = 'Data table',
}: DataTableProps<T>) {
  return (
    <div className="table-wrap">
      <table className="countries-table" aria-label={ariaLabel}>
        <thead>
          <tr>
            {columns.map(col => {
              const isSorted = sortField === col.id;
              const alignClass = col.align ? `col-${col.align}` : 'col-left';

              return (
                <th
                  key={col.id}
                  scope="col"
                  className={`${alignClass} ${col.className ?? ''}`.trim()}
                  aria-sort={isSorted ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
                >
                  {col.sortable && onSort ? (
                    <button type="button" className="sort-btn" onClick={() => onSort(col.id)}>
                      <span>{col.header}</span>
                      <span className={`sort-arrow ${!isSorted ? 'sort-arrow--idle' : ''}`}>
                        {!isSorted ? '⇅' : sortDirection === 'asc' ? '▲' : '▼'}
                      </span>
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map(item => {
            const key = keyExtractor(item);
            const extraRowClass = rowClassName ? rowClassName(item) : '';

            return (
              <tr
                key={key}
                className={`countries-table__row ${extraRowClass}`.trim()}
                onClick={() => onRowClick?.(item)}
                role={onRowClick ? 'button' : undefined}
                tabIndex={onRowClick ? 0 : undefined}
                onKeyDown={e => {
                  if (onRowClick && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    onRowClick(item);
                  }
                }}
              >
                {columns.map(col => {
                  const alignClass = col.align ? `col-${col.align}` : 'col-left';
                  return (
                    <td key={col.id} className={`${alignClass} ${col.className ?? ''}`.trim()}>
                      {col.render ? col.render(item) : String((item as Record<string, unknown>)[col.id] ?? '')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {footerText && <p className="table-footer">{footerText}</p>}
    </div>
  );
}