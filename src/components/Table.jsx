import { useContext } from 'react';
import TableRow from './TableRow';
import { DataContext } from '../context/data';

export default function Table() {
  const { data } = useContext(DataContext);

  const rows = data.map((row) => {
    return <TableRow key={row.id} row={row} />;
  });

  return (
    <table className="w-full text-sm text-left text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3">
            Date
          </th>
          <th scope="col" className="px-6 py-3">
            Content
          </th>
          <th scope="col" className="px-6 py-3">
            Tags
          </th>
          <th scope="col" className="px-6 py-3">
            Actions
          </th>
        </tr>
      </thead>

      <tbody>{rows}</tbody>
    </table>
  );
}
