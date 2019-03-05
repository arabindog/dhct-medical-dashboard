import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import AddProviderModal from './addProviderModal'
import LandingPage from './landingPage'
import DeleteProviderModal from './deleteProviderModal'
import EditProviderModal from './editProviderModal'
import { ADD_PROVIDER_MODAL, DELETE_PROVIDER_MODAL, EDIT_PROVIDER_MODAL } from '../action/actions'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state
    this.state = {
      displayPage: ''
    }
  }
  componentWillMount() {
    if (Object.keys(this.props.display_view_data).length === 0) {
      this.setState({
        displayPage: 'landing'
      })
    }
  }
  render() {
    return (
      <div>
        {
          this.state.displayPage === 'landing' &&
          <LandingPage />
        }
        {
          this.props.display_view_data === ADD_PROVIDER_MODAL &&
          <AddProviderModal />
        }
        {
          this.props.display_view_data === DELETE_PROVIDER_MODAL &&
          <DeleteProviderModal />
        }
        {
          this.props.display_view_data === EDIT_PROVIDER_MODAL &&
          <EditProviderModal />
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  display_view_data: state.fetchReducer.display_view_data,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    //requestApiData 
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);

