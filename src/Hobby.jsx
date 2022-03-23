import React from "react";

export default function Hobby(props) {
  return (
    <div className='hobby-item bg-light'>
      <div className='d-flex flex-row justify-content-between'>
        <div>
          <h3 className='hobby-name'>{props.hobby.name}</h3>
          <p>{props.hobby.doc}</p>
        </div>
        <button
          className='remove-btn btn btn-danger'
          onClick={() => {
            props.delete(props.hobby._id);
          }}>
          Remove
        </button>
      </div>

      <p className='hobby-body'>{props.hobby.desc}</p>
    </div>
  );
}
