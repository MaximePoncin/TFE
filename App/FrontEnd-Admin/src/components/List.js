import React from 'react';
import { connect } from 'react-redux';
import { removeStay } from '../actions';

const mapStateToProps = state => {
  return {stays: state.stays};
};

const mapDispatchToProps = dispatch => {
  return {
    removeStay: id => dispatch(removeStay(id))
  };
};

// const removeArticle = id => {
//   this.props.removeArticle(id);
// }

class ConnectedList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className="list-group list-group-flush">
        {this.props.stays.map(el => (
          <li className="list-group-item" key={el.id}>
            {el.id}
            <button
              onClick={() => { this.props.removeStay(el.id) }}
            >
               -
           </button>
          </li>
        ))}
      </ul>
    )
  }
};

const List = connect(mapStateToProps, mapDispatchToProps)(ConnectedList);

export default List;
