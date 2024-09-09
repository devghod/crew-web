import React from 'react';

export default function ErrorPage() {
  let [ errorMessage, setErrorMessage ] = React.useState("Page Not Found");

  return (
    <div id="error-page" className="container mx-auto my-10">
      <p className="text-red-500 uppercase my-2">Error!</p>
      <div className="py-2 px-4 border border-gray-100 border-l-4 border-l-gray-200 bg-gray-100">
        <p className="text-slate-500 my-2">{ errorMessage }</p>
      </div>
    </div>
  );
}