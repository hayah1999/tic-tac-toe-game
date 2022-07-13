const Squares = ({onClick, value}) => {
  return (
    <button className="square" onClick={onClick}>
    {value}
    </button>
  )
}

export default Squares

//class Square extends React.Component {
//In JavaScript classes, you need to always call super when defining the constructor of a subclass.
//All React component classes that have a constructor should start with a super(props) call
//constructor(props){
// super(props);
// this.state = {
//  value: null,
//};
//}
// render() {
// return (
//  <button className="square" onClick={() => this.props.onClick()}>
// {this.props.value}
// </button>);}}