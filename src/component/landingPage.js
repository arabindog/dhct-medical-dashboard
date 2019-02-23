import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import {
  diplayPageView,
  ADD_PROVIDER_MODAL,
  DELETE_PROVIDER_MODAL,
  EDIT_PROVIDER_MODAL
} from "../action/actions";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      btn: 'btn-group',
      drp: 'dropdown-menu',
      shw: false
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
    document.addEventListener("click", (evt) => {
      const flyoutElement = document.getElementById("flyout-example");
      let targetElement = evt.target;
      if (targetElement !== flyoutElement) {
        this.setState({ shw: false });
      }
      targetElement = targetElement.parentNode;
    });
  }
  actionClick() {
    this.setState({ shw: !this.state.shw });
  }
  addProviderClick() {
    this.setState({ show: true });
    this.props.diplayPageView(ADD_PROVIDER_MODAL)
  };
  saveClick() {
  }
  saveAndCloseClick() {
  }
  render() {
    let shw = ''
    if (this.state.shw === true) {
      shw = 'show'
    }
    return (
      <div>
        <div className="container-fluid">
          <div className="row fixed-top headerbar">
            <div className="col-md-3 profiledetails">
              <span style={{ fontSize: '16px' }}><b>Salvatore Camarada</b></span>&nbsp;&nbsp;&nbsp;&nbsp;DOB: 12/08/1976<br />
              Phone: <b>(708)369-8605</b><br />
              CCM Provider: <b>Dr. Daniel Caldwell</b><br />
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
                  <span><img className="addicon" src={require('../asset/images/plus.png')} /></span> Add Providers </a>
                </div>
              </div>


              <div className="row" style={{ marginTop: '5%' }}>
                <div className="col-md-12">
                  <div className="name">
                    Daniel Caldwell <span className="ccm">CCM</span>
                  </div>
                  <div className="physiciantype">Physician Type: Cardiologist</div>
                </div>
              </div>

              <div className="row providerinfo">
                <div className="col-md-3">
                  <div className="tabhead">Phone</div>
                  <div className="datafields">(708) 555-5555</div>
                </div>
                <div className="col-md-3">
                  <div className="tabhead">Fax</div>
                  <div className="datafields">(708) 555-5555</div>
                </div>
                <div className="col-md-3">
                  <div className="tabhead">Email</div>
                  <div className="datafields">mindlounge@yahoo.com</div>
                </div>
              </div>
              <div className="row providerinfo">
                <div className="col-md-4">
                  <div className="tabhead">Appointment date of last visit</div>
                  <div className="datafields">November 1, 2018</div>
                </div>
                <div className="col-md-4">
                  <div className="tabhead">Appointment date of next visit</div>
                  <div className="datafields">March 28, 2019</div>
                </div>
              </div>


              <div className="row" style={{ marginTop: '5%' }}>
                <div className="col-md-8">
                  <div className="name">
                    Joseph Flowers
                        </div>
                  <div className="physiciantype">Physician Type: Psychriatrist</div>
                </div>
                <div className="col-md-3">
                  <div className={`${this.state.btn} ${shw}`} >
                    <button id="flyout-example" type="button" onClick={this.actionClick} className="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ padding: '2px 30px', backgroundColor: '#ff0076' }}>Actions</button>
                    <div className={`${this.state.drp} ${shw}`}>
                      <a className="dropdown-item" href="#" onClick={this.editProviderClick}>Edit</a>
                      <div className="dropdown-divider"></div>
                      <a className="dropdown-item" data-toggle="modal" data-target="#deleteRecord" href="#" onClick={this.deleteProviderClick}>Delete</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row providerinfo">
                <div className="col-md-3">
                  <div className="tabhead">Phone</div>
                  <div className="datafields">(708) 555-5555</div>
                </div>
                <div className="col-md-3">
                  <div className="tabhead">Fax</div>
                  <div className="datafields">(708) 555-5555</div>
                </div>
                <div className="col-md-3">
                  <div className="tabhead">Email</div>
                  <div className="datafields">mindlounge@yahoo.com</div>
                </div>
              </div>
              <div className="row providerinfo">
                <div className="col-md-4">
                  <div className="tabhead">Appointment date of last visit</div>
                  <div className="datafields">November 1, 2018</div>
                </div>
                <div className="col-md-4">
                  <div className="tabhead">Appointment date of next visit</div>
                  <div className="datafields">March 28, 2019</div>
                </div>
              </div>


              {/* <div className="row" style={{ marginTop: '5%' }}>
                <div className="col-md-8">
                  <div className="name">
                    Mike Burroughs
                        </div>
                  <div className="physiciantype">Physician Type: Psychriatrist</div>
                </div>
                <div className="col-md-3">
                  <div className={`${this.state.btn} ${shw}`} >
                    <button id="flyout-example" type="button" onClick={this.actionClick} className="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ padding: '2px 30px', backgroundColor: '#ff0076' }}>Actions</button>
                    <div className={`${this.state.drp} ${shw}`}>
                      <a className="dropdown-item" href="#" onClick={this.editProviderClick}>Edit</a>
                      <div className="dropdown-divider"></div>
                      <a className="dropdown-item" data-toggle="modal" data-target="#deleteRecord" href="#" onClick={this.deleteProviderClick}>Delete</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row providerinfo">
                <div className="col-md-3">
                  <div className="tabhead">Phone</div>
                  <div className="datafields">(708) 555-5555</div>
                </div>
                <div className="col-md-3">
                  <div className="tabhead">Fax</div>
                  <div className="datafields">(708) 555-5555</div>
                </div>
                <div className="col-md-3">
                  <div className="tabhead">Email</div>
                  <div className="datafields">mindlounge@yahoo.com</div>
                </div>
              </div>
              <div className="row providerinfo">
                <div className="col-md-4">
                  <div className="tabhead">Appointment date of last visit</div>
                  <div className="datafields">November 1, 2018</div>
                </div>
                <div className="col-md-4">
                  <div className="tabhead">Appointment date of next visit</div>
                  <div className="datafields">March 28, 2019</div>
                </div>
              </div> */}


            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.data
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    diplayPageView
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);

