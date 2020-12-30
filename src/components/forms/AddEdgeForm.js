import { React } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from "react-hook-form"


export default function AddEdgeForm() {
    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch()
    const nodeNameMap = useSelector(state => state.graph.nodeNameMap)

    const onSubmit = data => {
        console.log(data)
        dispatch(
            {
                type: 'graph/addEdge',
                payload: {
                    source: nodeNameMap[data.person_a],
                    target: nodeNameMap[data.person_b]
                }
            })
    }

    return (
        <div>
        <form onSubmit={handleSubmit(onSubmit)}>
        
            <label>Name 1</label>
            <input type="text" placeholder="Name" name="person_a" ref={
                register({required: true, maxLength: 80,
                validate: newName => (newName in nodeNameMap) ? true : `${newName} does not exist!`
                })} />
            {errors.person_a && errors.person_a.type === "required" && <p>This field is required.</p>}
            {errors.person_a && errors.person_a.type === "validate" && <p>{errors.person_a.message}</p>}

            <label>Name 2</label>
            <input type="text" placeholder="Name" name="person_b" ref={
                register({required: true, maxLength: 80,
                    validate: newName => (newName in nodeNameMap) ? true : `${newName} does not exist!`
                })} />
            {errors.person_b && errors.person_b.type === "required" && <p>This field is required.</p>}
            {errors.person_b && errors.person_b.type === "validate" && <p>{errors.person_b.message}</p>}

            <input type="submit"></input>
        </form>
        </div>
    );
}