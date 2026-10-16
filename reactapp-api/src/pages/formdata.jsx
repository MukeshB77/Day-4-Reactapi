import React from "react";
import { useState } from "react";

function formdata() {
  const [form, setForm] = useState({
    firstName: "",
    email: "",
    age: "",
  });

  const [display, setDisplay] = useState(false);

  const event = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const just = (e) => {
    setDisplay(true);
  };

  return (
    <div>
      <input
        type="text"
        name="firstName"
        onChange={event}
        value={form.firstName}
      />
      <input type="email" name="email" onChange={event} value={form.email} />
      <input type="number" name="age" onChange={event} value={form.age} />
      <button onClick={just}>submit</button>
      {display ? (
        <>
          <h1>{form.firstName}</h1>
          <h1>{form.email}</h1>
          <h1>{form.age}</h1>
        </>
      ) : (
        <></>
      )}
      ;
    </div>
  );
}

export default formdata;
