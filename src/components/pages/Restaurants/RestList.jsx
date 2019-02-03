import React from 'react' ;
import { Button, Card, Image, Dropdown } from 'semantic-ui-react'
import '../../../assets/css/restList.scss';
import { queryRestList } from "../../../api/restaurants"

class RestList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchOptions: [
        { key: "restName", value: "restName", text: 'Restaurants Name' },
        { key: "restAddr", value: "restAddr", text: 'Restaurants Address'},
        { key: "zipcode", value: "zipcode", text: 'Restaurants Zipcode'},
        { key: "restType", value: "restType", text: 'Restaurants Type'}
      ],
      searchQuery: '',
      searchType: '',
      restList: []
    }
    this.queryTableList();
  }

  handleChange = (e) => {
    this.setState({
      searchQuery: e.target.value
    })
  }

  handleSearch = () => {
    console.log("search " + this.state.searchQuery + " through " + this.state.searchType)
    this.queryTableList();
  }

  getSearchWay = (value, text) => {
    this.setState({
      searchType: text.value
    })
  }

  queryTableList = async () => {
    if (this.state.searchQuery !== '' && this.state.searchType === '') {
      alert('Please select search type')
    } else {
      try {
        let res = await queryRestList(this.state.searchType, this.state.searchQuery);
        if (res.data.code === 0) {
          let tableData = res.data.data;
          this.setState({
            restList: tableData
          })
        } else {
          console.log(res.data.error);
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  goDetail = (id) => {
    this.props.history.push({
      pathname: `/rest/detail/${id}`
    })      
  }

  getList = () => {
    let result = []
    for (let i = 0; i < this.state.restList.length; i++) {
      let item = this.state.restList[i];
      result.push(
        <div key={i} className="ui card">
          <div className="ui content">
            <Image floated='right' size='mini' src='' />
            <div className="header">{item.rname}</div>
            <Card.Description>
              <div>Open Time: {item.opentime}</div>
              <div>Restaurants Type: {item.restype}</div>
            </Card.Description>
            <Card.Content extra>
              <div className="view-button">
                <Button basic onClick={() => this.goDetail(item.rid)} color='blue'>View</Button>
              </div>
            </Card.Content>
          </div>
        </div>
      )
    }
    return result;
  }

  render() {
    const { searchOptions, searchQuery } = this.state;
    let tableHeaders = [];
    let headerInfo = ['#', 'Name', 'Address', 'Zipcode', 'Type', 'Open Time', 'Manager']
    for (let i = 0; i < 7; i++) {
      tableHeaders.push(<th key={headerInfo[i]}>{headerInfo[i]}</th>);
    }
    let tableContents = this.getList();
    return (
      <div className="rest-list">
        <div className="search-box">
          <div className="ui input">
            <Dropdown onChange={this.getSearchWay} options={searchOptions} button placeholder="Search Restaurants" ></Dropdown>
            <input value={searchQuery} type="text" name="searchQuery" onChange={this.handleChange}/>
            <Button className="index-search-button" icon='search' onClick={this.handleSearch}/>
          </div>
        </div>
        <div className="cards-table">
          <Card.Group>
            {tableContents}
          </Card.Group>
        </div>
      </div>
    );
  }
}

export default RestList