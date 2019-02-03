import React from 'react'
import { Card, Button } from 'semantic-ui-react'
import { Link } from "react-router-dom";

import { resDetail } from "../../../api/restaurants"
import '../../../assets/css/restDetail.scss';

class RestDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      resid: props.match.params.id,
      food: []
    }
    console.log(props);
    this.queryTableList();
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  queryTableList = async () => {
    try {
      //console.log(this.state.resid)
      let resdetail = await resDetail(this.state.resid);
      if (resdetail.data.code !== undefined && resdetail.data.code === 0) {
        let tableData = resdetail.data.data;
        this.setState({
          food: tableData
        })
        // console.log(this.state.food)
      } else {
        console.log(this.resdetail.data.error);
      }
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
      tableContent.push(<div className="each-food" key={i}> <div className="food-name">{food[i].fname} : </div> <i className="cart plus icon" onClick={this.handleSearch}></i> <div className="food-price">{food[i].price}</div>
      </div>);
    }
    return (
      <div className="rest-detail">
        <Card.Group>
          <div className="ui card">
            <div className="ui content">
              <div className="header">Hello</div>
              <Card.Description>{tableContent}</Card.Description>
            </div>
          </div>
        </Card.Group>
        <div className="back-button"> <Link to="/rest"><Button primary type="submit">Back to List</Button></Link> </div>
      </div>
    );
  }
}

export default RestDetail