import { useContext, useRef, useState } from 'react';
import {
  ClipboardCopied,
  ClipboardIcon,
  Pencil,
  Star,
  StarFilled,
  Trash,
} from './Icons';
import { DataContext } from '../context/data';
import { format, formatDistanceToNowStrict, isToday } from 'date-fns';

export default function TableRow({ row }) {
  const { setFavorite, removeOne, editTitle } = useContext(DataContext);
  const { id, content, title, date, isFav } = row;
  const [copied, setCopied] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [changingTitle, setChangingTitle] = useState(false);
  const inputTitle = useRef();

  const formattedDate = new Date(date);

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
    }, 200);
  }

  function handleTitleChange(e) {
    e.preventDefault();
    editTitle(id, inputTitle.current.value);
    setChangingTitle(false);
  }

  return (
    <tr className={`${removing ? 'border-transparent' : ''} bg-white border-b`}>
      <td className="font-medium text-gray-900 px-5 whitespace-nowrap">
        <TableDiv removing={removing}>
          {isToday(formattedDate)
            ? formatDistanceToNowStrict(formattedDate)
            : format(formattedDate, 'PP')}
        </TableDiv>
      </td>

      <td className="px-5" title={content}>
        <TableDiv removing={removing}>{content}</TableDiv>
      </td>

      {changingTitle ? (
        <td>
          <form onSubmit={handleTitleChange} className="px-2">
            <label htmlFor={id} className="sr-only">
              Title
            </label>
            <input
              ref={inputTitle}
              autoFocus
              onBlur={handleTitleChange}
              type="text"
              id={id}
              defaultValue={title}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-1.5"
              placeholder=""
            />
          </form>
        </td>
      ) : (
        <td className="whitespace-nowrap px-5" title={title}>
          <TableDiv removing={removing}>
            <button
              className="relative group w-full py-1 text-left"
              onClick={() => setChangingTitle(true)}
            >
              {title ? (
                title
              ) : (
                <span className="text-blue-600 font-medium">
                  click to add a title
                </span>
              )}
              {title && (
                <div
                  title="Click to edit"
                  className="hidden group-hover:block absolute right-0 top-0 bg-white"
                >
                  {Pencil}
                </div>
              )}
            </button>
          </TableDiv>
        </td>
      )}

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
      } overflow-y-hidden transition-all duration-200`}
    >
      <div className="py-1 truncate">{children}</div>
    </div>
  );
}
