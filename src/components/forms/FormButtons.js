import { React } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "react-hook-form";

function ClearStateButton() {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch()
  const onSubmit = data => {
      console.log("CLEARING STATE")
    dispatch({ type: 'graph/clearState', payload: {} })
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="submit"/>
      </form>
    </div>
  );
}

function DefaultStateButton() {
    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch()
    const onSubmit = data => {
        console.log("Resetting state to defaults")
      dispatch({ type: 'graph/defaultState', payload: {} })
    }
    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="submit" text="TEST"/>
        </form>
      </div>
    );
  }

export { ClearStateButton, DefaultStateButton };
