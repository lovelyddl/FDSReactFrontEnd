import React from 'react'
import '../../assets/css/index.scss';
import background from '../../assets/img/home.jpg';
import { connect } from "react-redux";
import { Dropdown,  Button} from 'semantic-ui-react'

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchOptions: [
        { key: "restName", value: "restName", text: 'Restaurants Name' },
        { key: "restAddr", value: "restAddr", text: 'Restaurants Address'},
        { key: "zipcode", value: "zipcode", text: 'Zipcode'},
        { key: "restType", value: "restType", text: 'Restaurants Type'}
      ],
      searchQuery: '',
      searchType: ''
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  handleChange = (e) => {
    this.setState({
      searchQuery: e.target.value
    })
  }
  getSearchWay = (value, text) => {
    this.setState({
      searchType: text.value
    }, () => { console.log(this.state.searchType); })
  }

  handleSearch = () => {
    console.log("search " + this.state.searchQuery + " through " + this.state.searchType)
    this.props.history.push('/rest/list')
  }

  render() {
    const { searchOptions, searchQuery } = this.state;
    return (
      <div>
        <div className="ui input search-box">
          <Dropdown onChange={this.getSearchWay} options={searchOptions} button placeholder="Choose search method" ></Dropdown>
          <input value={searchQuery} type="text" name="searchQuery" onChange={this.handleChange}/>
          <Button className="index-search-button" icon='search' onClick={this.handleSearch}/>
        </div>
        <div className="home-header">
          <img className="home-img" src={background} alt=""/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state.userInfo;
}

export default connect(mapStateToProps)(Index);