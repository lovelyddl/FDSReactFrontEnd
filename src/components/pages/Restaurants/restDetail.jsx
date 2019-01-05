import React from 'react'
import { resDetail } from "../../../api/restaurants"
import '../../../assets/css/restDetail.scss';
import { Button, Card } from 'semantic-ui-react'


class RestDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      resid: this.props.location.state.resid,
      food: []
    }
    this.queryTableList();
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  queryTableList = async () => {
      try {
        //console.log(this.state.resid)
        let resdetail = await resDetail(this.state.resid);
        let tableData = resdetail.data.data;
        this.setState({
          food: tableData
        })
        console.log(this.state.food)
      } catch (error) {
        console.log(error)
      }
  }

  handleSearch = () => {
    console.log("add to cart")
  }

  render() {
    const { food } = this.state;
    let tableContent = [];
    for (let i = 0; i < food.length; i++) {
      tableContent.push(<div className="each-food">{food[i].fname} : {food[i].price}
      <i className="cart plus icon" onClick={this.handleSearch}></i></div>);
    }
    return (
      <div className="ui card">
      <div className="ui content">
        <div className="header">Hello</div>
        <Card.Description>
          {tableContent}
        </Card.Description>
      </div>
    </div>
    );
  }
}

export default RestDetail