import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import {
  diplayPageView,
  ADD_PROVIDER_MODAL,
  DELETE_PROVIDER_MODAL,
  EDIT_PROVIDER_MODAL,
  initiateFetchProvider,
  updateProviderID,
  initiateDeleteProvider
} from "../action/actions";


class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drop: '',
      ccmProviderMobile: '',
      ccmProviderFax: '',
      providerData: {}
    }
    this.addProviderClick = this.addProviderClick.bind(this);
    this.saveClick = this.saveClick.bind(this);
    this.saveAndCloseClick = this.saveAndCloseClick.bind(this);
    this.actionClick = this.actionClick.bind(this);
    this.deleteProviderClick = this.deleteProviderClick.bind(this);
    this.editProviderClick = this.editProviderClick.bind(this);
  }
  editProviderClick() {
    this.props.diplayPageView(EDIT_PROVIDER_MODAL)
    this.setState({ shw: false });
  }
  deleteProviderClick() {
    this.props.diplayPageView(DELETE_PROVIDER_MODAL)
    this.setState({ shw: false });
  }
  componentWillMount() {
    this.props.initiateFetchProvider();
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.initiate_fetch_provider && nextProps.initiate_fetch_provider_complete && !nextProps.initiate_fetch_provider_error) {
      this.setState({ providerData: nextProps.fetch_provider_data });
    }
  }
  actionClick(index, e) {
    this.setState({ drop: e.target.value });
    this.state.providerData.dhct_providers && this.state.providerData.dhct_providers.map((value, selectedIndex) => {
      if (selectedIndex === index) {
        this.props.updateProviderID(value)
      }
    })
  }
  addProviderClick() {
    this.setState({ show: true });
    this.props.diplayPageView(ADD_PROVIDER_MODAL)
  };
  saveClick() {
  }
  saveAndCloseClick() {
  }
  componentDidUpdate() {
    if (this.state.drop === 'edit') {
      this.props.diplayPageView(EDIT_PROVIDER_MODAL)
      this.setState({ drop: '' });
    } else if (this.state.drop === 'delete') {
      this.props.diplayPageView(DELETE_PROVIDER_MODAL)
      this.setState({ drop: '' });
    }
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row fixed-top headerbar">
            <div className="col-md-3 profiledetails">
              <span style={{ fontSize: '16px' }}><b>{this.state.providerData.patient_first_name} {this.state.providerData.patient_middle_initial} {this.state.providerData.patient_last_name}</b></span>&nbsp;&nbsp;&nbsp;&nbsp;DOB: {this.state.providerData.patient_date_of_birth}<br />
              Phone: <b>{this.state.providerData.patient_home_phone_number}</b><br />
              CCM Provider: <b>{this.state.providerData.ccm_provider_first_name} {this.state.providerData.ccm_provider_middle}{this.state.providerData.ccm_provider_last_name}</b><br />
              Speaking with : <b>Joseph Flowers (caregiver)</b>
            </div>
            <div className="col-md-7 timer">
              <b>00:02:00</b><br />
              <span style={{ fontSize: '11px' }}>19:00/21:00 month(2:00 remaining)</span>
            </div>
            <div className="col-md-2 headerbuttons">
              <button type="button" className="btn btn-info" onClick={this.saveClick}>Save</button>&nbsp;
              <button type="button" className="btn btn-info" onClick={this.saveAndCloseClick}>Save & Close</button>
            </div>
          </div>

          <div className="row">
            <div className="col-md-3 col-md-offset-3 sidebar-outer" >
              <div className="fixed sidebar col-md-3">
                <span className="navcategory">VALIDATE</span>
                <a href="#home">Contact Information</a>
                <a className="active" href="#news">Providers</a>
                <a href="#contact">Insurance & Benefits</a>
                <br />
                <span className="navcategory">REVIEW</span>
                <a href="#home">Hospitalizations & Surgeries</a>
                <a href="#news">Medications & Vaccinations</a>
                <a href="#contact">Devices</a>
                <a href="#contact">Self Assessment</a>
                <br />
                <span className="navcategory">CARE PLAN</span>
                <a href="#home">Conditions</a>
                <a href="#news">Symptoms</a>
                <a href="#contact">Goals</a>
                <a href="#contact">Resources</a>
              </div>
            </div>
            <div className="col-md-7 content">

              <div className="row">
                <div className="col-md-8" style={{ fontSize: '18px', fontWeight: '100', color: '#7d7d7d' }}>PROVIDERS</div>
                <div className="col-md-4"><a href="#" onClick={this.addProviderClick} className="btn btn-info btn-sm" data-toggle="modal" data-target="#exampleModalCenter" style={{ backgroundColor: '#371565', borderColor: '#371565' }}>
                  <span><img alt='' className="addicon" src={require('../asset/images/plus.png')} /></span> Add Providers </a>
                </div>
              </div>


              <div className="row" style={{ marginTop: '5%' }}>
                <div className="col-md-12">
                  <div className="name">
                    {this.state.providerData.ccm_provider_first_name} {this.state.providerData.ccm_provider_middle} {this.state.providerData.ccm_provider_last_name} <span className="ccm">CCM</span>
                  </div>
                  <div className="physiciantype">Physician Type: Cardiologist</div>
                </div>
              </div>

              <div className="row providerinfo">
                <div className="col-md-3">
                  <div className="tabhead">Phone</div>
                  <div className="datafields">{this.state.providerData.ccm_provider_mobile_number ? this.state.providerData.ccm_provider_mobile_number : 'N/A'}</div>
                </div>
                <div className="col-md-3">
                  <div className="tabhead">Fax</div>
                  <div className="datafields">{this.state.providerData.ccm_provider_fax_number ? this.state.providerData.ccm_provider_fax_number : 'N/A'}</div>
                </div>
                <div className="col-md-3">
                  <div className="tabhead">Email</div>
                  <div className="datafields">{this.state.providerData.ccm_provider_email ? this.state.providerData.ccm_provider_email : 'N/A'}</div>
                </div>
              </div>
              <div className="row providerinfo">
                <div className="col-md-4">
                  <div className="tabhead">Appointment date of last visit</div>
                  <div className="datafields">{this.state.providerData.ccm_patient_approximate_date_of_last_provider_visit}</div>
                </div>
                <div className="col-md-4">
                  <div className="tabhead">Appointment date of next visit</div>
                  <div className="datafields">{this.state.providerData.ccm_patient_approximate_date_of_next_provider_visit}</div>
                </div>
              </div>


              {this.state.providerData.dhct_providers && this.state.providerData.dhct_providers.map((value, index) => {
                return <div key={index}>
                  <div className="row" style={{ marginTop: '5%' }}>
                    <div className="col-md-8">
                      <div className="name">
                        {value.dhct_provider_first_name} {value.dhct_provider_middle} {value.dhct_provider_last_name}
                      </div>
                      <div className="physiciantype">Physician Type: Psychriatrist</div>
                    </div>
                    <div className="col-md-3">
                      <div className="btn-group">
                        <select
                          onChange={(e) => this.actionClick(index, e)}
                          value={this.state.drop} >
                          <option value="">Actions</option>
                          <option value="edit">Edit</option>
                          <option value="delete">Delete</option>
                        </select>
                        {/* <div className="custom-select-dropdown" style={{ width: '122px' }}>
                          <select
                            onChange={(e) => this.actionClick(index, e)}
                            value={this.state.drop}>
                                <option value="0">Action</option>
                            <option value="1" style={{ color: 'black' }}>Edit</option>
                            <option value="2" style={{ color: 'black' }}>Delete</option>
                          </select>
                        </div> */}
                      </div>

                    </div>
                  </div>


                  <div className="row providerinfo">
                    <div className="col-md-3">
                      <div className="tabhead">Phone</div>
                      <div className="datafields">{value.dhct_provider_mobile_number ? value.dhct_provider_mobile_number : 'N/A'}</div>
                    </div>
                    <div className="col-md-3">
                      <div className="tabhead">Fax</div>
                      <div className="datafields">{value.dhct_provider_fax_number ? value.dhct_provider_fax_number : 'N/A'}</div>
                    </div>
                    <div className="col-md-3">
                      <div className="tabhead">Email</div>
                      <div className="datafields">{value.dhct_provider_email ? value.dhct_provider_email : 'N/A'}</div>
                    </div>
                  </div>
                  <div className="row providerinfo">
                    <div className="col-md-4">
                      <div className="tabhead">Appointment date of last visit</div>
                      <div className="datafields">{value.dhct_patient_approximate_date_of_last_provider_visit}</div>
                    </div>
                    <div className="col-md-4">
                      <div className="tabhead">Appointment date of next visit</div>
                      <div className="datafields">{value.dhct_patient_approximate_date_of_next_provider_visit}</div>
                    </div>
                  </div>
                </div>
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  initiate_fetch_provider: state.fetchReducer.initiate_fetch_provider,
  initiate_fetch_provider_complete: state.fetchReducer.initiate_fetch_provider_complete,
  initiate_fetch_provider_error: state.fetchReducer.initiate_fetch_provider_error,
  fetch_provider_data: state.fetchReducer.fetch_provider_data,
  fetch_provider_error_data: state.fetchReducer.fetch_provider_error_data,
  display_view_data: state.fetchReducer.display_view_data,

  post_provider_data: state.addProviderReducer.post_provider_data
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    diplayPageView,
    initiateFetchProvider,
    updateProviderID,
    initiateDeleteProvider
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);

