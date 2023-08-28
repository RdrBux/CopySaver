export default function Tabs() {
  return (
    <ul className="flex flex-wrap -mb-px text-sm font-medium">
      <li className="mr-2">
        <a
          href="#"
          className="inline-block px-4 py-2 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active"
          aria-current="page"
        >
          Show all
        </a>
      </li>
      <li className="mr-2">
        <a
          href="#"
          className="inline-block px-4 py-2 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300"
        >
          Favourites
        </a>
      </li>
    </ul>
  );
}
