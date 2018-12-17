import React from 'react' 
import '../../../assets/css/restList.scss'
// import { queryRestList } from "../../../api/restaurants"

class RestList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  queryTableList = () => {
    return [];
  }

  render() {
    let tableHeaders = [];
    let headerInfo = ['#', 'Name', 'Address', 'Zipcode', 'Type', 'Open Time', 'Manager']
    for (let i = 0; i < 7; i++) {
      tableHeaders.push(<th key={headerInfo[i]}>{headerInfo[i]}</th>);
    }
    let tableContents = this.queryTableList();
    return (
      <div className="rest-list">
        <h1> Welcome to Search List </h1>
        <table className="ui celled table">
          <thead>
            <tr>
              {tableHeaders}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>No Name Specified</td>
              <td>Unknown</td>
              <td className="negative">None</td>
            </tr>
            <tr className="positive">
              <td>Jimmy</td>
              <td><i className="icon checkmark"></i> Approved</td>
              <td>None</td>
            </tr>
            {tableContents}
          </tbody>
        </table>
      </div>
    );
  }
}

export default RestList