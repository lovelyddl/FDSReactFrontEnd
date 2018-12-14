import React from 'react'
import '../../assets/css/home.scss';
import background from '../../assets/img/home.jpg';
import { connect } from "react-redux";
import { Dropdown } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'

class Index extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
          searchOptions: [
              {
                  key: "restName",
                  value: "restName",
                  text: 'Restaurants Name'
              },
              {
                  key: "restAddr",
                  value: "restAddr",
                  text: 'Restaurants Address'
              },
              {
                  key: "zipcode",
                  value: "zipcode",
                  text: 'Zipcode'
              },
              {
                  key: "restType",
                  value: "restType",
                  text: 'Restaurants Type'
              }
          ],
          searchQuery: ''
      }
  }

  handleChange = (e) => {
        this.setState({
            searchQuery: e.target.value
        }, () => {
            //console.log(this.state.searchQuery);
        })
  }

    handleClick = () => {
      console.log("search by " + this.state.searchQuery)
  }

  render() {
      const { searchOptions, searchQuery } = this.state;
    return (
      <div>
        <div className="ui input search-box">
              <Dropdown value={searchOptions.text} options={searchOptions} button placeholder="Choose search method" ></Dropdown>
              <input value={searchQuery} type="text" name="searchQuery" onChange={this.handleChange}/>
              <Button icon='search icon' onClick={this.handleClick}/>
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