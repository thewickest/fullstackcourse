const Form = (props) => {
  return(
    <form onSubmit={props.onSubmit}>
      <div>{props.textName} <input value={props.valueName} onChange={props.onChangeName}/></div>
      <div>{props.textNumber} <input value={props.valueNumber} onChange={props.onChangeNumber}/></div>
      <div><button type="submit">add</button></div>
    </form>
  )
  }

export default Form