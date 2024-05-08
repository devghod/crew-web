import React from 'react';

export default function ErrorPage() {
  let [ errorMessage, setErrorMessage ] = React.useState("Page Not Found");

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{ errorMessage }</i>
      </p>
    </div>
  );
}