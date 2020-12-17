import React from "react";
import { useForm } from "react-hook-form";

export function AddNodeForm() {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => alert(JSON.stringify(data));
  // const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
    {/* register your input into the hook by invoking the "register" function */}
      <label>Name</label>
      <input type="text" placeholder="Name" name="name" ref={register({required: true, maxLength: 80})} />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}
      
      <input type="submit" />
    </form>
  );
}
