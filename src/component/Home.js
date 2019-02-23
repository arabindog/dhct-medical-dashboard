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
    displayPage: ''
  }
  componentWillMount() {
    if (Object.keys(this.props.data).length === 0) {
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
          this.props.data === ADD_PROVIDER_MODAL &&
          <AddProviderModal />
        }
        {
          this.props.data === DELETE_PROVIDER_MODAL &&
          <DeleteProviderModal />
        }
        {
          this.props.data === EDIT_PROVIDER_MODAL &&
          <EditProviderModal />
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.data
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    //requestApiData 
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);

