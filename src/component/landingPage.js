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
      dhctFax: '',
      clicked: [],
      currentItem: null
    }
    this.addProviderClick = this.addProviderClick.bind(this);
    this.saveClick = this.saveClick.bind(this);
    this.saveAndCloseClick = this.saveAndCloseClick.bind(this);
    this.deleteProviderClick = this.deleteProviderClick.bind(this);
    this.editProviderClick = this.editProviderClick.bind(this);
    this.handleActionOutsideClick = this.handleActionOutsideClick.bind(this);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleActionOutsideClick, false);
  }

  handleActionClick(index, e) {
    e.target.nextSibling.classList.toggle('show');
    this.state.dhctData && this.state.dhctData.map((value, selectedIndex) => {
      if (selectedIndex === index) {
        this.props.updateProviderID(value)
      }
    })
  }

  handleActionOutsideClick(event) {
    if (!event.target.classList.contains('btn')) {
      document.querySelectorAll('.dropdown-menu').forEach((item) => {
        if (item.classList) {
          item.classList.remove('show')
        }
      })
    }
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
    document.addEventListener('click', this.handleActionOutsideClick, false);
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
    } else if (!nextProps.initiate_fetch_provider_put && !nextProps.initiate_fetch_provider_put_complete && nextProps.initiate_fetch_provider_put_error) {
      console.log('put 1st error')
    }

    if (!nextProps.initiate_fetch_dhct && nextProps.initiate_fetch_dhct_complete && !nextProps.initiate_fetch_dhct_error) {
      if (nextProps.fetch_dhct_data.data !== 'Please provide DHCT Provider NPI CCM Number.') {
        this.setState({ dhctData: nextProps.fetch_dhct_data.data });
      } else {
        this.setState({ dhctData: [] });
      }
    } else if (!nextProps.initiate_fetch_dhct && !nextProps.initiate_fetch_dhct_complete && nextProps.initiate_fetch_dhct_error) {
      console.log('put 1st error')
    }
  }

  addProviderClick() {
    this.setState({ show: true });
    this.props.diplayPageView(ADD_PROVIDER_MODAL)
  }

  saveClick() {
  }

  saveAndCloseClick() {
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          {
            Object.keys(this.state.patientData).length === 0 ?
              (
                <div className="row sticky-top bg-light">
                  <div className="col-md-4 p-4">No Data Available</div>
                  <div className="col-md-3 offset-md-2 p-5">
                    <b>00:02:00</b>
                    <br />
                    <span>19:00/21:00 month(2:00 remaining)</span>
                  </div>
                  <div className="col-md-3 p-5">
                    <button type="button" className="btn btn-info" onClick={this.saveClick}>Save</button>
                    &nbsp;
                <button type="button" className="btn btn-info ml-2" onClick={this.saveAndCloseClick}>Save & Close</button>
                  </div>
                </div>
              ) :
              (
                <div className="row sticky-top bg-light">
                  <div className="col-md-4 p-4">
                    <span>
                      <b>
                        {this.state.patientData.patient_first_name + " "}
                        {this.state.patientData.patient_middle_initial}
                        {" " + this.state.patientData.patient_last_name}
                      </b>
                    </span>&nbsp;&nbsp;&nbsp;&nbsp;
                    DOB: {this.state.patientData.patient_date_of_birth.split("-")[1] + "-" + this.state.patientData.patient_date_of_birth.split("-")[2] + "-" + this.state.patientData.patient_date_of_birth.split("-")[0]}
                    <br />
                    Phone: <b>{this.state.patientHomePhone}</b>
                    <br />
                    CCM Provider: <b>{this.state.providerData.ccm_provider_first_name + " " + this.state.providerData.ccm_provider_middle + " " + this.state.providerData.ccm_provider_last_name}</b>
                    <br />
                    Speaking with: <b>Joseph Flowers (caregiver)</b>
                  </div>
                  <div className="col-md-3 offset-md-2 p-5">
                    <b>00:02:00</b>
                    <br />
                    <span>19:00/21:00 month(2:00 remaining)</span>
                  </div>
                  <div className="col-md-3 p-5">
                    <button type="button" className="btn btn-info" onClick={this.saveClick}>Save</button>&nbsp;
                <button type="button" className="btn btn-info ml-2" onClick={this.saveAndCloseClick}>Save & Close</button>
                  </div>
                </div>
              )
          }
          <div className="row mt-auto">
            <div className="col-md-3 position-fixed bg-white h-100">
              <div className="pl-5 pt-3">
                <span>VALIDATE</span> <br />
                <p>
                  <a href="#home">Contact Information</a>
                </p>
                <p>
                  <a className="active" href="#news"> Providers </a>
                </p>
                <p>
                  <a href="#contact">Insurance & Benefits</a>
                </p>
                <br />
                <span className=" ">REVIEW</span>
                <p>
                  <a href="#home">Hospitalizations & Surgeries</a>
                </p>
                <p>
                  <a href="#news">Medications & Vaccinations</a>
                </p>
                <p>
                  <a href="#contact">Devices</a>
                </p>
                <p>
                  <a href="#contact">Self Assessment</a>
                </p>
                <br />
                <span className="">CARE PLAN</span>
                <p>
                  <a href="#home">Conditions</a>
                </p>
                <p>
                  <a href="#news">Symptoms</a>
                </p>
                <p>
                  <a href="#contact">Goals</a>
                </p>
                <p>
                  <a href="#contact">Resources</a>
                </p>
              </div>
            </div>
            <div className="col-md-7 offset-md-3 pl-4">
              {
                Object.keys(this.state.providerData).length === 0 || this.state.providerData === "please provide valid ccm_patient_account_id" ?
                  (
                    <div className="row mt-3" style={{ minWidth: "600px" }}>
                      <div className="col-md-8">
                        No provider details available for the ccm patient id.
                  </div>
                    </div>
                  ) :
                  (
                    <div>
                      <div className="row mt-3">
                        <div className="col-md-8">PROVIDERS</div>
                        <div className="col-md-4">
                          <a href="#" onClick={this.addProviderClick} className="btn btn-info" data-toggle="modal" data-target="#exampleModalCenter">
                            <span className="glyphicon glyphicon-plus" aria-hidden="true" />Add Providers</a>
                        </div>
                      </div>
                      <div className="row mt-3" >
                        <div className="col-md-12">
                          <div>
                            <h4>
                              {this.state.providerData.ccm_provider_first_name + " " + this.state.providerData.ccm_provider_middle + " " + this.state.providerData.ccm_provider_last_name + " "}
                              <span className="badge badge-danger">CCM</span>
                            </h4>
                          </div>
                          <div>
                            <b>Physician Type:</b> {this.state.providerData.ccm_provider_type}
                          </div>
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-md-3">
                          <div className=""><b>Phone</b></div>
                          <div className="">
                            {
                              this.state.providerPhone ? this.state.providerPhone : "N/A"
                            }
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className=""><b> Fax </b></div>
                          <div className="">
                            {
                              this.state.providerFax ? this.state.providerFax : "N/A"
                            }
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className=""><b> Email </b></div>
                          <div className="">
                            {
                              this.state.providerData.ccm_provider_email ? this.state.providerData.ccm_provider_email : "N/A"
                            }
                          </div>
                        </div>
                      </div>
                      <div className="row providerinfo">
                        <div className="col-md-4">
                          <div className="">
                            <b>Appointment date of last visit</b>
                          </div>
                          <div className="">
                            {
                              this.state.providerData.ccm_patient_approximate_date_of_last_provider_visit.split("-")[1] + "-" + this.state.providerData.ccm_patient_approximate_date_of_last_provider_visit.split("-")[2] + "-" + this.state.providerData.ccm_patient_approximate_date_of_last_provider_visit.split("-")[0]
                            }
                          </div>
                        </div>
                        <div className="col-md-4" style={{ padding: '0px' }}>
                          <div className="">
                            <b>   Appointment date of next visit </b>
                          </div>
                          <div className="">
                            {
                              this.state.providerData.ccm_patient_approximate_date_of_next_provider_visit === '1111-11-11' ? '' :
                                this.state.providerData.ccm_patient_approximate_date_of_next_provider_visit.split(
                                  "-"
                                )[1] +
                                "-" +
                                this.state.providerData.ccm_patient_approximate_date_of_next_provider_visit.split(
                                  "-"
                                )[2] +
                                "-" +
                                this.state.providerData.ccm_patient_approximate_date_of_next_provider_visit.split(
                                  "-"
                                )[0]
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
              {
                this.state.dhctData.length !== 0 ?
                  (
                    this.state.dhctData.map((value, index) => {
                      return (
                        <div key={index}>
                          <div className="row mt-5">
                            <div className="col-md-8">
                              <div className="">
                                <h4>
                                  {value.dhct_provider_first_name + " "}
                                  {value.dhct_provider_middle === null ? '' : value.dhct_provider_middle}
                                  {" " + value.dhct_provider_last_name}
                                </h4>
                              </div>
                              <div className="">
                                <b> Physician Type:</b>{" "}
                                {value.dhct_physician_type}
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className={"dropdown" + " " + this.state.clicked[index]}>
                                <button className="btn btn-warning dropdown-toggle"
                                  type="button" id="dropdownMenuButton" data-toggle="dropdown"
                                  aria-haspopup="true" aria-expanded="false"
                                  onClick={this.handleActionClick.bind(this, index)} ref="refMenu">Actions</button>
                                <div
                                  className={
                                    "dropdown-menu" +
                                    " " +
                                    this.state.clicked[index]
                                  }
                                  aria-labelledby="dropdownMenuButton"
                                >
                                  <a
                                    className="dropdown-item"
                                    style={{ cursor: "pointer" }}
                                    onClick={this.editProviderClick}
                                  >
                                    Edit
                            </a>
                                  <a
                                    className="dropdown-item"
                                    style={{ cursor: "pointer" }}
                                    onClick={
                                      this.deleteProviderClick
                                    }
                                  >
                                    Delete
                            </a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row mt-4">
                            <div className="col-md-3">
                              <div className="">
                                {" "}
                                <b> Phone</b>
                              </div>
                              <div className="">
                                {
                                  value.dhct_provider_mobile_number
                                    ? !value.dhct_provider_mobile_number
                                      .replace(/\D/g, "")
                                      .match(
                                        /(\d{0,3})(\d{0,3})(\d{0,4})/
                                      )[2]
                                      ? value.dhct_provider_mobile_number
                                        .replace(/\D/g, "")
                                        .match(
                                          /(\d{0,3})(\d{0,3})(\d{0,4})/
                                        )[1]
                                      : `(${
                                      value.dhct_provider_mobile_number
                                        .replace(/\D/g, "")
                                        .match(
                                          /(\d{0,3})(\d{0,3})(\d{0,4})/
                                        )[1]
                                      }) ${
                                      value.dhct_provider_mobile_number
                                        .replace(/\D/g, "")
                                        .match(
                                          /(\d{0,3})(\d{0,3})(\d{0,4})/
                                        )[2]
                                      }${
                                      value.dhct_provider_mobile_number
                                        .replace(/\D/g, "")
                                        .match(
                                          /(\d{0,3})(\d{0,3})(\d{0,4})/
                                        )[3]
                                        ? `-${
                                        value.dhct_provider_mobile_number
                                          .replace(
                                            /\D/g,
                                            ""
                                          )
                                          .match(
                                            /(\d{0,3})(\d{0,3})(\d{0,4})/
                                          )[3]
                                        }`
                                        : ""
                                      }`
                                    : "N/A"
                                }
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="">
                                <b> Fax </b>
                              </div>
                              <div className="">
                                {
                                  value.dhct_provider_fax_number
                                    ? !value.dhct_provider_fax_number
                                      .replace(/\D/g, "")
                                      .match(
                                        /(\d{0,3})(\d{0,3})(\d{0,4})/
                                      )[2]
                                      ? value.dhct_provider_mobile_number
                                        .replace(/\D/g, "")
                                        .match(
                                          /(\d{0,3})(\d{0,3})(\d{0,4})/
                                        )[1]
                                      : `(${
                                      value.dhct_provider_fax_number
                                        .replace(/\D/g, "")
                                        .match(
                                          /(\d{0,3})(\d{0,3})(\d{0,4})/
                                        )[1]
                                      }) ${
                                      value.dhct_provider_fax_number
                                        .replace(/\D/g, "")
                                        .match(
                                          /(\d{0,3})(\d{0,3})(\d{0,4})/
                                        )[2]
                                      }${
                                      value.dhct_provider_fax_number
                                        .replace(/\D/g, "")
                                        .match(
                                          /(\d{0,3})(\d{0,3})(\d{0,4})/
                                        )[3]
                                        ? `-${
                                        value.dhct_provider_fax_number
                                          .replace(
                                            /\D/g,
                                            ""
                                          )
                                          .match(
                                            /(\d{0,3})(\d{0,3})(\d{0,4})/
                                          )[3]
                                        }`
                                        : ""
                                      }`
                                    : "N/A"
                                }
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="">
                                <b> Email</b>
                              </div>
                              <div className="">
                                {
                                  value.dhct_provider_email ? value.dhct_provider_email : "N/A"
                                }
                              </div>
                            </div>
                          </div>
                          <div className="row providerinfo">
                            <div className="col-md-4">
                              <div className="">
                                <b>Appointment date of last visit</b>
                              </div>
                              <div className="">
                                {
                                  value.dhct_patient_approximate_date_of_last_provider_visit.split("-")[1] + "-" + value.dhct_patient_approximate_date_of_last_provider_visit.split("-")[2] + "-" + value.dhct_patient_approximate_date_of_last_provider_visit.split("-")[0]
                                }
                              </div>
                            </div>
                            <div className="col-md-4" style={{ padding: '0px' }}>
                              <div className="">
                                <b> Appointment date of next visit </b>
                              </div>
                              <div className="">
                                {
                                  value.dhct_patient_approximate_date_of_next_provider_visit === '1111-11-11' ? '' : value.dhct_patient_approximate_date_of_next_provider_visit.split("-")[1] + "-" + value.dhct_patient_approximate_date_of_next_provider_visit.split("-")[2] + "-" + value.dhct_patient_approximate_date_of_next_provider_visit.split("-")[0]
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) :
                  (
                    <div className="col-md-7 offset-md-3 pl-4" style={{ marginLeft: '-25px', paddingTop: '20px' }}>
                      <div className="row mt-3">
                        <div className="col-md-8" style={{ minWidth: 'fit-content' }}>
                          <b>No dhct data available for this provider.</b>
                        </div>
                      </div>
                    </div>
                  )
              }
            </div>
          </div>
        </div>
      </div>
    );
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

