import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { diplayPageView } from "../action/actions";

class EditProviderModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            firstNameError: false,
            firstNameErrorText: '',
            lastName: '',
            practiceName: '',
            phone: '',
            phoneError: false,
            phoneErrorText: '',
            fax: '',
            faxError: false,
            faxErrorText: '',
            email: '',
            physicianType: '',
            physicianTypeError: false,
            physicianTypeErrorText: '',
            lastDateVisited: '',
            nextVisitDate: ''
        }
        this.closeModal = this.closeModal.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changeFax = this.changeFax.bind(this);
        this.changeFirstName = this.changeFirstName.bind(this);
        this.changeLastName = this.changeLastName.bind(this);
        this.changeLastVisitedDate = this.changeLastVisitedDate.bind(this);
        this.changeNextVisitDate = this.changeNextVisitDate.bind(this);
        this.changePhone = this.changePhone.bind(this);
        this.changephysicianType = this.changephysicianType.bind(this);
        this.changePracticeName = this.changePracticeName.bind(this);
        this.clickFax = this.clickFax.bind(this);
        this.clickFirstName = this.clickFirstName.bind(this);
        this.clickPhone = this.clickPhone.bind(this);
        this.clickphysicianType = this.clickphysicianType.bind(this);
        this.phoneFormat = this.phoneFormat.bind(this);
    }

    phoneFormat() {
        const x = this.props.update_provider_id.dhct_provider_phone_number.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        const y = this.props.update_provider_id.dhct_provider_fax_number.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        let phone = !x[2] ? x[1] : `(${x[1]}) ${x[2]}${x[3] ? `-${x[3]}` : ''}`;
        let fax = !y[2] ? y[1] : `(${y[1]}) ${y[2]}${y[3] ? `-${y[3]}` : ''}`;
        this.setState({
            fax: fax,
            phone: phone
        })
    }

    clickFax() {
        this.setState({
            faxError: false,
            faxErrorText: ''
        })
    }

    clickFirstName() {
        this.setState({
            firstNameError: false,
            firstNameErrorText: ''
        })
    }

    clickPhone() {
        this.setState({
            phoneError: false,
            phoneErrorText: ''
        })
    }

    clickphysicianType() {
        this.setState({
            physicianTypeError: false,
            physicianTypeErrorText: ''
        })
    }

    changeEmail(event) {
        this.setState({
            email: event.target.value
        })
    }

    changeFax(event) {
        const x = event.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        event.target.value = !x[2] ? x[1] : `(${x[1]}) ${x[2]}${x[3] ? `-${x[3]}` : ''}`;
        this.setState({
            fax: event.target.value
        })
    }

    changeFirstName(event) {
        this.setState({
            firstName: event.target.value
        })
    }

    changeLastName(event) {
        this.setState({
            lastName: event.target.value
        })
    }

    changeLastVisitedDate(event) {
        this.setState({
            lastDateVisited: event.target.value
        })
    }

    changeNextVisitDate(event) {
        this.setState({
            nextVisitDate: event.target.value
        })
    }

    changePhone(event) {
        const x = event.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        event.target.value = !x[2] ? x[1] : `(${x[1]}) ${x[2]}${x[3] ? `-${x[3]}` : ''}`;
        this.setState({
            phone: event.target.value
        })
    }

    changephysicianType(event) {
        this.setState({
            physicianType: event.target.value
        })
    }

    changePracticeName(event) {
        this.setState({
            practiceNames: event.target.value
        })
    }

    closeModal() {
        this.props.diplayPageView('')
    }

    componentWillMount() {
        if (this.props.update_provider_id) {
            this.setState({
                firstName: this.props.update_provider_id.dhct_provider_first_name,
                lastName: this.props.update_provider_id.dhct_provider_last_name,
                phone: this.props.update_provider_id.dhct_provider_phone_number,
                email: this.props.update_provider_id.dhct_provider_email,
                fax: this.props.update_provider_id.dhct_provider_fax_number,
                nextVisitDate: this.props.update_provider_id.dhct_patient_approximate_date_of_next_provider_visit,
                lastDateVisited: this.props.update_provider_id.dhct_patient_approximate_date_of_last_provider_visit
            })
        }
        this.phoneFormat();
    }

    render() {
        return (
            <div>
                <div className="modal fade show" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-modal="true" style={{ display: 'block', paddingRight: '17px', overflowY: 'scroll', backgroundColor: '#000000b5' }}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header custom-modal-header">
                                <div className="modal-title" id="exampleModalLongTitle" style={{ fontSize: '18px', fontWeight: '100', color: '#7d7d7d' }}>EDIT PROVIDER</div>
                                <button type="button" className="close custom-modal-close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row formfields">
                                    <div className="col-md-4 tabhead">First Name</div>
                                    <div className="col-md-8" style={{ textAlign: 'right' }}>* REQUIRED</div>
                                </div>
                                <div className="row textfield">
                                    <div className="col-md-12"><input className="textbox" type="text" name="firstName" onChange={this.changeFirstName} onClick={this.clickFirstName} value={this.state.firstName} /></div>
                                    {
                                        this.state.firstNameError &&
                                        <div className="col-md-4 tabhead" style={{ color: 'red' }}>{this.state.firstNameErrorText}</div>
                                    }
                                </div>
                                <div className="row formfields">
                                    <div className="col-md-4 tabhead">Last Name</div>
                                </div>
                                <div className="row textfield">
                                    <div className="col-md-12"><input className="textbox" type="text" name="lastName" onChange={this.changeLastName} value={this.state.lastName} /></div>
                                </div>
                                <div className="row formfields">
                                    <div className="col-md-4 tabhead">Practice Name</div>
                                </div>
                                <div className="row textfield">
                                    <div className="col-md-12"><input className="textbox" type="text" name="practiceName" onChange={this.changePracticeName} value={this.state.practiceName} /></div>
                                </div>
                                <div className="row formfields">
                                    <div className="col-md-4 tabhead">Physician Type</div>
                                    <div className="col-md-8" style={{ textAlign: 'right' }}>* REQUIRED</div>
                                </div>
                                <div className="row textfield" style={{ paddingBottom: '4%' }}>
                                    <div className="col-md-12">
                                        <select id="physicianDropdownEdit" className="textbox" style={{ fontSize: '12px', color: '#4e4e4e' }} onChange={this.changephysicianType} onClick={this.clickphysicianType} value={this.state.physicianType}>
                                            <option value="">Select Physician Type</option>
                                            <option value="endocrinology">Endocrinology</option>
                                            <option value="cardiology">Cardiology</option>
                                            <option value="opthalmology">Opthalmology</option>
                                        </select>
                                    </div>
                                    {
                                        this.state.physicianTypeError &&
                                        <div className="col-md-3 tabhead" style={{ color: 'red' }}>this.state.physicianTypeErrorText</div>
                                    }
                                </div>
                                <div className="row formfields">
                                    <div className="col-md-3 tabhead">Phone</div>
                                    <div className="col-md-3" style={{ textAlign: 'right' }}>* REQUIRED</div>
                                    <div className="col-md-3 tabhead">Fax</div>
                                    <div className="col-md-3" style={{ textAlign: 'right' }}>* REQUIRED</div>
                                </div>
                                <div className="row textfield">
                                    <div className="col-md-6"><input className="textbox" type="text" name="phone" onChange={this.changePhone} onClick={this.clickPhone} value={this.state.phone} maxLength='14' /></div>
                                    <div className="col-md-6"><input className="textbox" type="text" name="fax" onChange={this.changeFax} onClick={this.clickFax} value={this.state.fax} maxLength='14' /></div>
                                </div>
                                <div className="row formfields">
                                    <div className="col-md-3 tabhead">
                                        {
                                            this.state.phoneError &&
                                            <div style={{ color: 'red' }}>{this.state.phoneErrorText}</div>
                                        }
                                    </div>
                                    <div className="col-md-3" style={{ textAlign: 'right' }}></div>
                                    <div className="col-md-3 tabhead">
                                        {
                                            this.state.faxError &&
                                            <div style={{ color: 'red' }}>{this.state.faxErrorText}</div>
                                        }
                                    </div>
                                    <div className="col-md-3" style={{ textAlign: 'right' }}></div>
                                </div>
                                <div className="row formfields">
                                    <div className="col-md-4 tabhead">Email</div>
                                </div>
                                <div className="row textfield">
                                    <div className="col-md-12"><input className="textbox" type="text" name="email" onChange={this.changeEmail} value={this.state.email} /></div>
                                </div>
                                <div className="row formfields">
                                    <div className="col-md-6 tabhead">Approximate date last visited</div>
                                    <div className="col-md-6 tabhead">Approximate next visit date</div>
                                </div>
                                <div className="row textfield">
                                    <div className="col-md-6"><input className="textbox" type="date" name="lastvisit" style={{ fontSize: '12px', Color: '#333333' }} onChange={this.changeLastVisitedDate} value={this.state.lastDateVisited} /></div>
                                    <div className="col-md-6"><input className="textbox" type="date" name="nextvisit" style={{ fontSize: '12px', Color: '#333333' }} onChange={this.changeNextVisitDate} value={this.state.nextVisitDate} /></div>
                                </div>
                            </div>
                            <div className="modal-footer" style={{ borderTop: '0', paddingRight: '7%' }}>
                                <button type="button" className="btn btn-secondary btn-sm" data-dismiss="modal" style={{ backgroundColor: '#ff0076' }} onClick={this.closeModal}>Cancel</button>
                                <button type="button" className="btn btn-primary btn-sm" style={{ backgroundColor: '#371565' }}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    update_provider_id: state.addProviderReducer.update_provider_id,
    fetch_provider_put_data: state.fetchReducer.fetch_provider_put_data,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        diplayPageView
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditProviderModal);
