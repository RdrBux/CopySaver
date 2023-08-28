import { ClipboardIcon, Star, Trash } from './Icons';

export default function TableRow() {
  return (
    <tr className="bg-white border-b">
      <td className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">
        2 hours
      </td>
      <td className="px-6 py-2 whitespace-nowrap">
        Acá va el texto copiado...
      </td>
      <td className="px-6 py-2 whitespace-nowrap">texto, copiado, bla...</td>
      <td className="px-6 flex items-center h-full">
        <button className="py-2 px-1">{Star}</button>
        <button className="py-2 px-1">{ClipboardIcon}</button>
        <button className="py-2 px-1">{Trash}</button>
      </td>
    </tr>
  );
}
