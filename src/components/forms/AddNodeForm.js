import { React } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "react-hook-form";

// class AddNodeForm extends React.Component {
export default function AddNodeForm() {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch()
  const onSubmit = data => {
    dispatch({ type: 'graph/addNode', payload: data.fullName })
  }

  const nodeNameMap = useSelector(state => state.graph.nodeNameMap)

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Full Name</label>
        <input type="text" placeholder="Full Name" name="fullName" ref={register({
          required: true, maxLength: 80,
          validate: newName => !(newName in nodeNameMap) ? true : `${newName} already exists!`
        })} />
        {errors.fullName && errors.fullName.type === "required" && <p>This field is required.</p>}
        {errors.fullName && errors.fullName.type === "validate" && <p>{errors.fullName.message}</p>}
        
        {/* <label>Connected To</label>
        <input type="text" placeholder="Connected To" name="connected" ref={register} />
        {/* errors will return when field validation fails  */}
        {/* {errors.exampleRequired && <span>This field is required</span>} */}
        
        <input type="submit"/>
      </form>
    </div>
  );
}
