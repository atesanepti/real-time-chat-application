import React from 'react'

const Loader = () => {
  return (
    <div className="lds-ellipsis scale-[.4] lg:scale-50 text-white">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Loader