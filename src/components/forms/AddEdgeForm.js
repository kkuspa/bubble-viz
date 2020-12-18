import { React, Component } from "react";

import { connect, useDispatch } from 'react-redux'
import { addEdge } from '../../redux/actions'

import { useForm } from "react-hook-form"


export function AddEdgeForm() {
    const { register, handleSubmit, watch, errors } = useForm();
    const dispatch = useDispatch()
    const onSubmit = data => {
        console.log(data)
        dispatch({type: 'ADD_EDGE', payload: data.person_a})
        dispatch({type: 'ADD_EDGE', payload: data.person_b})
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        
            <label>Name</label>
            <input type="text" placeholder="Name" name="person_a" ref={register({required: true, maxLength: 80})} />
            {errors.exampleRequired && <span>This field is required</span>}

            <label>Name</label>
            <input type="text" placeholder="Name" name="person_b" ref={register({required: true, maxLength: 80})} />
            {errors.exampleRequired && <span>This field is required</span>}

            <input type="submit"></input>
        </form>
    );
}

export default connect(
    null,
    { addEdge }
  )(AddEdgeForm)