import React, {Component} from 'react'
import SearchInput, {createFilter} from 'react-search-input'



const KEYS_TO_FILTERS = ['user.name', 'subject', 'dest.name'];

export default class Testing extends Component {
    constructor (props) {
        super(props)
        this.state = {
            searchTerm: ''
        };
        this.searchUpdated = this.searchUpdated.bind(this)
    }

    render () {


        return (
            <div>
                <SearchInput className="search-input" onChange={this.searchUpdated} />
            </div>
        )
    }

    searchUpdated (term) {
        this.setState({searchTerm: term})
    }
}