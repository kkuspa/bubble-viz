import { React, Component } from "react";

import { connect, useDispatch } from 'react-redux'
import { useForm } from "react-hook-form";

// class AddNodeForm extends React.Component {
export function AddNodeForm() {
  const { register, handleSubmit, watch, errors } = useForm();
  const dispatch = useDispatch()
  const onSubmit = data => {
    dispatch({ type: 'graph/addNode', payload: data.name })
  }

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        
      {/* register your input into the hook by invoking the "register" function */}
        <label>Name</label>
        <input type="text" placeholder="Name" name="name" ref={register({required: true, maxLength: 80})} />
        
        <label>Connected To</label>
        <input type="text" placeholder="Conected To" name="connected" ref={register} />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}
        
        <input type="submit"/>
      </form>
    </div>
  );
}

export default AddNodeForm