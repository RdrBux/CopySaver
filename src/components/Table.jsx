import { useContext } from 'react';
import TableRow from './TableRow';
import { DataContext } from '../context/data';

export default function Table() {
  const { data } = useContext(DataContext);

  const rows = data.map((row) => {
    return <TableRow key={row.id} row={row} />;
  });

  return (
    <table className="text-sm text-left text-gray-500 table-fixed w-[620px]">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-5 py-3 w-[130px]">
            Date
          </th>
          <th scope="col" className="px-5 py-3 w-[235px]">
            Content
          </th>
          <th scope="col" className="px-5 py-3 w-[155px]">
            Title
          </th>
          <th scope="col" className="px-5 py-3 w-[100px]">
            Actions
          </th>
        </tr>
      </thead>

      <tbody>{rows}</tbody>
    </table>
  );
}
