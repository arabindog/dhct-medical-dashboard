import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import {
  diplayPageView,
  ADD_PROVIDER_MODAL,
  DELETE_PROVIDER_MODAL,
  EDIT_PROVIDER_MODAL,
  initiateFetchProvider,
  initiateFetchProviderReset,
  updateProviderID,
  initiateDeleteProvider,
  initiateFetchProviderPut,
  initiateFetchProviderPutReset,
  initiateFetchDhct,
  initiateFetchDhctReset
} from "../action/actions";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drop: '',
      ccmProviderMobile: '',
      ccmProviderFax: '',
      providerData: {},
      patientData: {},
      dhctData: [],
      cid: '',
      provider_npi_ccm_number: '',
      ccm_patient_account_id: '',
      patientHomePhone: '',
      providerPhone: '',
      providerFax: '',
      dhctPhone: '',
      dhctFax: ''
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
    var url = new URL(window.location.href);
    var cid = url.searchParams.get("cid");
    this.setState({ cid: cid });
    let body = {
      ccm_patient_account_id: cid
    }
    this.props.initiateFetchProvider();
    this.props.initiateFetchProviderPut(body)
  }

  componentWillReceiveProps(nextProps) {
    let provider_npi_ccm_number = '';
    let ccm_patient_account_id = '';
    if (!nextProps.initiate_fetch_provider && nextProps.initiate_fetch_provider_complete && !nextProps.initiate_fetch_provider_error) {
      nextProps.fetch_provider_data.map((grid, index) => {
        if (parseInt(this.state.cid) === grid.ccm_patient_account_id) {
          const x = grid.patient_home_phone_number.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
          let patientHomePhone = !x[2] ? x[1] : `(${x[1]}) ${x[2]}${x[3] ? `-${x[3]}` : ''}`;
          this.setState({
            patientHomePhone: patientHomePhone,
          })
          this.setState({
            patientData: grid,
            provider_npi_ccm_number: grid.provider_npi_ccm_number,
            ccm_patient_account_id: grid.ccm_patient_account_id
          });
          provider_npi_ccm_number = grid.provider_npi_ccm_number;
          ccm_patient_account_id = grid.ccm_patient_account_id;
          if (grid && grid.provider_npi_ccm_number) {
            this.setState({
              provider_npi_ccm_number: grid.provider_npi_ccm_number,
            });
          }
        }
      })
      console.log('fetch 1st success')
      let dhctBody = {
        provider_npi_ccm_number: provider_npi_ccm_number,
        ccm_patient_account_id: ccm_patient_account_id
      }
      this.props.initiateFetchProviderReset();
      this.props.initiateFetchDhct(dhctBody);

    } else if (!nextProps.initiate_fetch_provider && !nextProps.initiate_fetch_provider_complete && nextProps.initiate_fetch_provider_error) {
      console.log('fetch 1st error')
    }

    if (!nextProps.initiate_fetch_provider_put && nextProps.initiate_fetch_provider_put_complete && !nextProps.initiate_fetch_provider_put_error) {
      this.setState({ providerData: nextProps.fetch_provider_put_data.data });
      const x = nextProps.fetch_provider_put_data.data.ccm_provider_mobile_number.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      const y = nextProps.fetch_provider_put_data.data.ccm_provider_fax_number.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      let providerPhone = !x[2] ? x[1] : `(${x[1]}) ${x[2]}${x[3] ? `-${x[3]}` : ''}`;
      let providerFax = !y[2] ? y[1] : `(${y[1]}) ${y[2]}${y[3] ? `-${y[3]}` : ''}`;
      this.setState({
        providerPhone: providerPhone,
        providerFax: providerFax
      })
      console.log('put 1st ccomplete')
    } else if (!nextProps.initiate_fetch_provider_put && !nextProps.initiate_fetch_provider_put_complete && nextProps.initiate_fetch_provider_put_error) {
      console.log('put 1st error')
    }

    if (!nextProps.initiate_fetch_dhct && nextProps.initiate_fetch_dhct_complete && !nextProps.initiate_fetch_dhct_error) {
      if (nextProps.fetch_dhct_data.data !== 'Please provide DHCT Provider NPI CCM Number.') {
        this.setState({ dhctData: nextProps.fetch_dhct_data.data });
      } else {
        this.setState({ dhctData: [] });
      }
      console.log('put 1st ccomplete')
    } else if (!nextProps.initiate_fetch_dhct && !nextProps.initiate_fetch_dhct_complete && nextProps.initiate_fetch_dhct_error) {
      console.log('put 1st error')
    }
  }
  actionClick(index, e) {
    this.setState({ drop: e.target.value });
    this.state.dhctData && this.state.dhctData.map((value, selectedIndex) => {
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
    console.log('updated-' + this.props.update_provider_id)
    console.log(this.state)
    return (
      <div>
        <div className="container-fluid">
          {
            Object.keys(this.state.patientData).length === 0
              ?
              <div className="row fixed-top headerbar">
                <div className="col-md-3 profiledetails" style={{ fontSize: '16px' }}>No Data Available</div>
                <div className="col-md-7 timer">
                  <b>00:02:00</b><br />
                  <span style={{ fontSize: '11px' }}>19:00/21:00 month(2:00 remaining)</span>
                </div>
                <div className="col-md-2 headerbuttons">
                  <button type="button" className="btn btn-info" onClick={this.saveClick}>Save</button>&nbsp;
              <button type="button" className="btn btn-info" onClick={this.saveAndCloseClick}>Save & Close</button>
                </div>
              </div> :
              <div className="row fixed-top headerbar">
                <div className="col-md-3 profiledetails">
                  <span style={{ fontSize: '16px' }}><b>{this.state.patientData.patient_first_name} {this.state.patientData.patient_middle_initial} {this.state.patientData.patient_last_name}</b></span>&nbsp;&nbsp;&nbsp;&nbsp;DOB: {this.state.patientData.patient_date_of_birth}<br />
                  Phone: <b>{this.state.patientHomePhone}</b><br />
                  CCM Provider: <b>{this.state.patientData.ccm_provider_first_name} {this.state.patientData.ccm_provider_middle}{this.state.patientData.ccm_provider_last_name}</b><br />
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
          }
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
              {Object.keys(this.state.providerData).length === 0 || this.state.providerData === 'please provide valid ccm_patient_account_id' ?
                // <div>No provider details available for the ccm patient id.</div>

                <div className="row" style={{ minWidth: '600px' }}>
                  <div className="col-md-8" style={{ fontSize: '18px', fontWeight: '100', color: '#7d7d7d' }}>No provider details available for the ccm patient id.</div>
                </div> :
                <div>
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
                      <div className="datafields">{this.state.providerPhone ? this.state.providerPhone : 'N/A'}</div>
                    </div>
                    <div className="col-md-3">
                      <div className="tabhead">Fax</div>
                      <div className="datafields">{this.state.providerFax ? this.state.providerFax : 'N/A'}</div>
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
                </div>
              }
              {
                this.state.dhctData.length !== 0 ?
                  this.state.dhctData.map((value, index) => {
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
                            <div className="custom">
                              <select
                                id="actiondropdown"
                                onChange={(e) => this.actionClick(index, e)}
                                value={this.state.drop}
                                style={{
                                  color: '#ffffff',
                                  backgroundColor: '#ff0076',
                                  padding: '4px 16px',
                                  border: '1px solid transparent',
                                  borderColor: 'transparent transparent rgba(0, 0, 0, 0.1) transparent',
                                  borderRadius: '5px',
                                  cursor: 'pointer',
                                  userSelect: 'none'
                                }}>
                                <option value="">Actions</option>
                                <option value="edit" style={{ backgroundColor: '#cac4c4' }}>Edit</option>
                                <option value="delete" style={{ backgroundColor: '#cac4c4' }}>Delete</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row providerinfo">
                        <div className="col-md-3">
                          <div className="tabhead">Phone</div>
                          <div className="datafields">
                            {value.dhct_provider_mobile_number ? !value.dhct_provider_mobile_number.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/)[2] ? value.dhct_provider_mobile_number.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/)[1] : `(${value.dhct_provider_mobile_number.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/)[1]}) ${value.dhct_provider_mobile_number.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/)[2]}${value.dhct_provider_mobile_number.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/)[3] ? `-${value.dhct_provider_mobile_number.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/)[3]}` : ''}` : 'N/A'}
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="tabhead">Fax</div>
                          <div className="datafields">
                            {value.dhct_provider_fax_number ? !value.dhct_provider_fax_number.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/)[2] ? value.dhct_provider_mobile_number.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/)[1] : `(${value.dhct_provider_fax_number.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/)[1]}) ${value.dhct_provider_fax_number.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/)[2]}${value.dhct_provider_fax_number.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/)[3] ? `-${value.dhct_provider_fax_number.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/)[3]}` : ''}` : 'N/A'}
                          </div>
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
                  }) :
                  <div className="col-md-7 content">
                    <div className="row" style={{ minWidth: '600px' }}>
                      <div className="col-md-8" style={{ fontSize: '18px', fontWeight: '100', color: '#7d7d7d', paddingLeft: '0px' }}>No dhct data available for this provider.</div>
                    </div>
                  </div>
              }
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

  initiate_fetch_provider_put: state.fetchReducer.initiate_fetch_provider_put,
  initiate_fetch_provider_put_complete: state.fetchReducer.initiate_fetch_provider_put_complete,
  initiate_fetch_provider_put_error: state.fetchReducer.initiate_fetch_provider_put_error,
  fetch_provider_put_data: state.fetchReducer.fetch_provider_put_data,
  fetch_provider_put_error_data: state.fetchReducer.fetch_provider_put_error_data,

  initiate_fetch_dhct: state.fetchReducer.initiate_fetch_dhct,
  initiate_fetch_dhct_complete: state.fetchReducer.initiate_fetch_dhct_complete,
  initiate_fetch_dhct_error: state.fetchReducer.initiate_fetch_dhct_error,
  fetch_dhct_data: state.fetchReducer.fetch_dhct_data,
  fetch_dhct_error_data: state.fetchReducer.fetch_dhct_error_data,

  post_provider_data: state.addProviderReducer.post_provider_data,

  update_provider_id: state.addProviderReducer.update_provider_id,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    diplayPageView,
    initiateFetchProvider,
    updateProviderID,
    initiateDeleteProvider,
    initiateFetchProviderReset,
    initiateFetchProviderPut,
    initiateFetchProviderPutReset,
    initiateFetchDhct,
    initiateFetchDhctReset
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);

