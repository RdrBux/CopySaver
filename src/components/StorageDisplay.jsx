import { useEffect, useState } from 'react';

export default function StorageDisplay() {
  const [kbytes, setKbytes] = useState(0);

  useEffect(() => {
    chrome.storage.local.getBytesInUse(null, function (bytesInUse) {
      setKbytes(bytesInUse / 1024);
    });
  });

  const space = Math.min(100, Math.ceil((kbytes / 3000) * 100));

  return (
    <>
      <div className="text-base font-medium text-blue-700 mb-1">
        Storage used
      </div>
      <div className="w-full bg-gray-200 rounded-full">
        <div
          className="bg-blue-600 text-xs min-w-fit font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
          style={{ width: `${space}%` }}
        >
          {' '}
          {`${space}%`}
        </div>
      </div>
    </>
  );
}
