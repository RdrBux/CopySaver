import { ClipboardIcon, Star, Trash } from './Icons';

export default function TableRow({ row }) {
  const { id, content, tags, date, isFav } = row;

  return (
    <tr className="bg-white border-b">
      <td className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">
        {date}
      </td>
      <td className="px-6 py-2 whitespace-nowrap">{content}</td>
      <td className="px-6 py-2 whitespace-nowrap">{tags}</td>
      <td className="px-6 flex items-center h-full">
        <button className="py-2 px-1">{Star}</button>
        <button className="py-2 px-1">{ClipboardIcon}</button>
        <button className="py-2 px-1">{Trash}</button>
      </td>
    </tr>
  );
}
