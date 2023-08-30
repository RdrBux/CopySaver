import { useContext } from 'react';
import { ClipboardIcon, Star, StarFilled, Trash } from './Icons';
import { DataContext } from '../context/data';

export default function TableRow({ row }) {
  const { setFavorite } = useContext(DataContext);
  const { id, content, tags, date, isFav } = row;

  return (
    <tr className="bg-white border-b">
      <td className="px-5 py-2 font-medium text-gray-900 whitespace-nowrap">
        {date}
      </td>
      <td className="px-5 py-2 truncate max-w-[216px]">{content}</td>
      <td className="px-5 py-2 whitespace-nowrap">
        {tags ? (
          tags
        ) : (
          <button className="text-blue-600 font-medium truncate max-w-[184px]">
            click to add tags
          </button>
        )}
      </td>
      <td className="flex justify-center items-center h-full">
        <button onClick={() => setFavorite(id)} className="py-2 px-1">
          {isFav ? StarFilled : Star}
        </button>
        <button className="py-2 px-1">{ClipboardIcon}</button>
        <button className="py-2 px-1">{Trash}</button>
      </td>
    </tr>
  );
}
