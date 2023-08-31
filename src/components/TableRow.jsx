import { useContext, useState } from 'react';
import {
  ClipboardCopied,
  ClipboardIcon,
  Star,
  StarFilled,
  Trash,
} from './Icons';
import { DataContext } from '../context/data';

export default function TableRow({ row }) {
  const { setFavorite, removeOne } = useContext(DataContext);
  const { id, content, title, date, isFav } = row;
  const [copied, setCopied] = useState(false);
  const [removing, setRemoving] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 500);
  }

  function handleDelete() {
    setRemoving(true);
    setTimeout(() => {
      setRemoving(false);
      removeOne(id);
    }, 100);
  }

  return (
    <tr className="bg-white border-b">
      <td className="font-medium text-gray-900 px-5 whitespace-nowrap">
        <TableDiv removing={removing}>{date}</TableDiv>
      </td>
      <td className="px-5" title={content}>
        <TableDiv removing={removing}>{content}</TableDiv>
      </td>
      <td className="whitespace-nowrap px-5" title={title}>
        <TableDiv removing={removing}>
          {title ? (
            title
          ) : (
            <button className="text-blue-600 font-medium">
              click to add a title
            </button>
          )}
        </TableDiv>
      </td>
      <td className="flex justify-center items-center h-full">
        <TableDiv removing={removing}>
          <button
            title="Favorite"
            onClick={() => setFavorite(id)}
            className="py-1 px-1 hover:text-gray-700"
          >
            {isFav ? StarFilled : Star}
          </button>
          <button
            title="Copy to clipboard"
            className="py-1 px-1 hover:text-gray-700"
            onClick={handleCopy}
          >
            {copied ? ClipboardCopied : ClipboardIcon}
          </button>
          <button
            onClick={handleDelete}
            title="Delete"
            className="py-1 px-1 hover:text-gray-700 active:text-red-700"
          >
            {Trash}
          </button>
        </TableDiv>
      </td>
    </tr>
  );
}

function TableDiv({ children, removing }) {
  return (
    <div
      className={`${
        removing ? 'max-h-0' : 'max-h-[40px]'
      } overflow-y-hidden transition-all duration-100`}
    >
      <div className="py-1 truncate">{children}</div>
    </div>
  );
}
