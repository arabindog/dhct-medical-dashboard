import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import moment from 'moment';

import {
    diplayPageView,
    initiatePostProvider,
    initiateFetchProvider,
    initiatePostProviderReset
} from "../action/actions";

class AddProviderModal extends React.Component {
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
            nextVisitDate: '',
            dateError: false,
            dateErrorText: '',
            emailError: false,
            emailErrorText: '',
            lastVisitedDateError: false,
            lastVisitedDateErrorText: '',
            nextVisitDateError: false,
            nextVisitDateErrorText: '',
            lastNameError: false,
            lastNameErrorText: '',
            practiceNameError: false,
            practiceNameErrorText: '',
            currentDate: moment().format('YYYY-MM-DD'),
            addProviderError: false
        }
        this.closeModal = this.closeModal.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changeFax = this.changeFax.bind(this);
        this.changeFirstName = this.changeFirstName.bind(this);
        this.changeLastName = this.changeLastName.bind(this);
        this.changeLastVisitedDate = this.changeLastVisitedDate.bind(this);
        this.changeNextVisitDate = this.changeNextVisitDate.bind(this);
        this.changePhone = this.changePhone.bind(this);
        this.changePhysicianType = this.changePhysicianType.bind(this);
        this.changePracticeName = this.changePracticeName.bind(this);
        this.clickFax = this.clickFax.bind(this);
        this.clickFirstName = this.clickFirstName.bind(this);
        this.clickPhone = this.clickPhone.bind(this);
        this.clickPhysicianType = this.clickPhysicianType.bind(this);
        this.saveClick = this.saveClick.bind(this);
        this.lastDateVisitedClick = this.lastDateVisitedClick.bind(this);
        this.nextVisitDateClick = this.nextVisitDateClick.bind(this);
        this.clickLastName = this.clickLastName.bind(this);
        this.clickPracticeName = this.clickPracticeName.bind(this);
        this.emailClick = this.emailClick.bind(this);
    }

    emailClick() {
        this.setState({
            emailError: false,
            emailErrorText: ''
        })
    }

    clickLastName() {
        this.setState({
            lastNameError: false,
            lastNameErrorText: ''
        })
    }

    clickPracticeName() {
        this.setState({
            practiceNameError: false,
            practiceNameErrorText: ''
        })
    }

    lastDateVisitedClick() {
        this.setState({
            dateError: false,
            dateErrorText: '',
            lastVisitedDateError: false,
            lastVisitedDateErrorText: ''
        })
    }

    nextVisitDateClick() {
        this.setState({
            dateError: false,
            dateErrorText: '',
            nextVisitDateError: false,
            nextVisitDateErrorText: ''
        })
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.initiate_post_provider && nextProps.initiate_post_provider_complete && !nextProps.initiate_post_provider_error) {
            if (nextProps.post_provider_data.data.length === 2) {
                this.props.initiateFetchProvider();
                this.props.diplayPageView('');
                this.props.initiatePostProviderReset();
            } else {
                this.setState({ addProviderError: true })
            }
        }
    }

    saveClick() {
        let validationStatus = true;
        if (this.state.fax.length < 14) {
            this.setState({
                faxError: true,
                faxErrorText: 'Fax should be 10 digit number.'
            })
            validationStatus = false
        }
        if (this.state.phone.length < 14) {
            this.setState({
                phoneError: true,
                phoneErrorText: 'Phone should be 10 digit number.'
            })
            validationStatus = false
        }
        if (this.state.physicianType === '') {
            this.setState({
                physicianTypeError: true,
                physicianTypeErrorText: 'Please select a Physician Type.'
            })
            validationStatus = false
        }
        if (this.state.firstName.trim() === '') {
            this.setState({
                firstNameError: true,
                firstNameErrorText: 'First Name can not be blank.'
            })
            validationStatus = false
        }
        if (this.state.lastName.trim() === '') {
            this.setState({
                lastNameError: true,
                lastNameErrorText: 'Last Name can not be blank.'
            })
            validationStatus = false
        }
        if (this.state.practiceName.trim() === '') {
            this.setState({
                practiceNameError: true,
                practiceNameErrorText: 'Practice Name can not be blank.'
            })
            validationStatus = false
        }
        if (this.state.lastDateVisited === '') {
            this.setState({
                lastVisitedDateError: true,
                lastVisitedDateErrorText: 'Last date visited can not be blank.'
            })
            validationStatus = false
        }
        if (this.state.nextVisitDate === '') {
            this.setState({
                nextVisitDateError: true,
                nextVisitDateErrorText: 'Next visit date can not be blank.'
            })
            validationStatus = false
        }
        if (this.state.lastDateVisited > this.state.currentDate && this.state.lastDateVisited !== '') {
            this.setState({
                lastVisitedDateError: true,
                lastVisitedDateErrorText: 'Last visited date can not after todays date.'
            })
            validationStatus = false
        }
        if (this.state.nextVisitDate < this.state.currentDate && this.state.nextVisitDate !== '') {
            this.setState({
                nextVisitDateError: true,
                nextVisitDateErrorText: 'Next visit date can not be older than todays date.'
            })
            validationStatus = false
        }
        if (!this.state.email.match(/^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/)) {
            this.setState({
                emailError: true,
                emailErrorText: 'Please provide a valid email id'
            })
            validationStatus = false
        }
        let body = {
            provider_npi_ccm_number: this.props.fetch_provider_put_data.data.provider_npi_ccm_number,
            ccm_patient_account_id: this.props.fetch_provider_put_data.data.ccm_patient_account_id,
            dhct_provider_type: this.state.physicianType,
            dhct_provider_practice_name: this.state.practiceName,
            dhct_provider_first_name: this.state.firstName,
            dhct_provider_last_name: this.state.lastName,
            dhct_provider_phone_number: this.state.phone.replace(/\D+/g, ""),
            dhct_provider_fax_number: this.state.fax.replace(/\D+/g, ""),
            dhct_provider_email: this.state.email,
            emr_patient_account_id: this.props.fetch_provider_put_data.data.emr_patient_account_id,
            provider_npi_dhct_number: (this.state.phone.replace(/\D+/g, "")).slice(0, 5),
            dhct_patient_approximate_date_of_last_provider_visit: this.state.lastDateVisited,
            dhct_patient_approximate_date_of_next_provider_visit: this.state.nextVisitDate
        }
        if (validationStatus) {
            this.props.initiatePostProvider(body);
        }
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

    clickPhysicianType() {
        this.setState({
            physicianTypeError: false
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

    changePhysicianType(event) {
        this.setState({
            physicianType: event.target.value
        })
    }

    changePracticeName(event) {
        this.setState({
            practiceName: event.target.value
        })
    }

    closeModal() {
        this.props.initiateFetchProvider();
        this.props.diplayPageView('')
    }

    render() {
        return (
            <div className="modal fade show" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-modal="true" style={{ display: 'block', paddingRight: '17px', backgroundColor: '#000000b5', overflowY: 'scroll' }}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header custom-modal-header">
                            <div className="modal-title" id="exampleModalLongTitle" style={{ fontSize: '18px', fontWeight: '100', color: '#7d7d7d' }}>ADD A PROVIDER</div>
                            <button type="button" className="close custom-modal-close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row formfields">
                                <div className="col-md-4 tabhead">First Name</div>
                                <div className="col-md-8" style={{ textAlign: 'right' }}></div>
                            </div>
                            <div className="row textfield">
                                <div className="col-md-12"><input className="textbox" type="text" name="firstName" onChange={this.changeFirstName} onClick={this.clickFirstName} value={this.state.firstName} /></div>
                                {
                                    this.state.firstNameError &&
                                    <div className="col-md-4 tabhead" style={{ color: 'red', minWidth: '250px' }}>{this.state.firstNameErrorText}</div>
                                }
                            </div>
                            <div className="row formfields">
                                <div className="col-md-4 tabhead">Last Name</div>
                            </div>
                            <div className="row textfield">
                                <div className="col-md-12"><input className="textbox" type="text" name="lastName" onClick={this.clickLastName} onChange={this.changeLastName} value={this.state.lastName} /></div>
                                {
                                    this.state.lastNameError &&
                                    <div className="col-md-4 tabhead" style={{ color: 'red', minWidth: '250px' }}>{this.state.lastNameErrorText}</div>
                                }
                            </div>
                            <div className="row formfields">
                                <div className="col-md-4 tabhead">Practice Name</div>
                            </div>
                            <div className="row textfield">
                                <div className="col-md-12"><input className="textbox" type="text" name="practiceName" onClick={this.clickPracticeName} onChange={this.changePracticeName} value={this.state.practiceName} /></div>
                                {
                                    this.state.practiceNameError &&
                                    <div className="col-md-4 tabhead" style={{ color: 'red', minWidth: '250px' }}>{this.state.practiceNameErrorText}</div>
                                }
                            </div>
                            <div className="row formfields">
                                <div className="col-md-4 tabhead">Physician Type</div>
                                <div className="col-md-8" style={{ textAlign: 'right' }}></div>
                            </div>
                            <div className="row textfield" style={{ paddingBottom: '4%' }}>
                                <div className="col-md-12">
                                    <select id="physicianDropdownAdd" className="textbox" style={{ fontSize: '12px', color: '#4e4e4e' }} onChange={this.changePhysicianType} onClick={this.clickPhysicianType} value={this.state.physicianType}>
                                        <option value="">Select Physician Type</option>
                                        <option value="endocrinology">Endocrinology</option>
                                        <option value="cardiology">Cardiology</option>
                                        <option value="opthalmology">Opthalmology</option>
                                    </select>
                                </div>
                                {
                                    this.state.physicianTypeError &&
                                    <div className="col-md-3 tabhead" style={{ color: 'red', minWidth: '250px' }}>{this.state.physicianTypeErrorText}</div>
                                }
                            </div>
                            <div className="row formfields">
                                <div className="col-md-3 tabhead">Phone</div>
                                <div className="col-md-3" style={{ textAlign: 'right' }}></div>
                                <div className="col-md-3 tabhead">Fax</div>
                                <div className="col-md-3" style={{ textAlign: 'right' }}></div>
                            </div>
                            <div className="row textfield" style={{ paddingBottom: '0px' }}>
                                <div className="col-md-6"><input className="textbox" type="text" name="phone" onChange={this.changePhone} onClick={this.clickPhone} value={this.state.phone} maxLength='15' /></div>
                                <div className="col-md-6"><input className="textbox" type="text" name="fax" onChange={this.changeFax} onClick={this.clickFax} value={this.state.fax} maxLength='15' /></div>
                            </div>
                            <div className="row formfields">
                                <div className="col-md-3 tabhead">
                                    {
                                        this.state.phoneError &&
                                        <div style={{ color: 'red', minWidth: '250px' }}>{this.state.phoneErrorText}</div>
                                    }
                                </div>
                                <div className="col-md-3" style={{ textAlign: 'right' }}></div>
                                <div className="col-md-3 tabhead">
                                    {
                                        this.state.faxError &&
                                        <div style={{ color: 'red', minWidth: '250px' }}>{this.state.faxErrorText}</div>
                                    }
                                </div>
                                <div className="col-md-3" style={{ textAlign: 'right' }}></div>
                            </div>
                            <div className="row formfields">
                                <div className="col-md-4 tabhead">Email</div>
                            </div>
                            <div className="row textfield">
                                <div className="col-md-12"><input className="textbox" type="text" name="email" onClick={this.emailClick} onChange={this.changeEmail} value={this.state.email} /></div>
                                {
                                    this.state.emailError &&
                                    <div className="col-md-4 tabhead" style={{ color: 'red', minWidth: '250px' }}>{this.state.emailErrorText}</div>
                                }</div>

                            <div className="row formfields">
                                <div className="col-md-6 tabhead">Approximate date last visited</div>
                                <div className="col-md-6 tabhead">Approximate next visit date</div>
                            </div>
                            <div className="row textfield">
                                <div className="col-md-6"><input className="textbox" type="date" name="lastvisit" style={{ fontSize: '12px', Color: '#333333' }} onChange={this.changeLastVisitedDate} value={this.state.lastDateVisited} onClick={this.lastDateVisitedClick} /></div>
                                <div className="col-md-6"><input className="textbox" type="date" name="nextvisit" style={{ fontSize: '12px', Color: '#333333' }} onChange={this.changeNextVisitDate} value={this.state.nextVisitDate} onClick={this.nextVisitDateClick} /></div>
                                <div className="col-md-3 tabhead">
                                    {
                                        this.state.lastVisitedDateError &&
                                        <div style={{ color: 'red', minWidth: '250px' }}>{this.state.lastVisitedDateErrorText}</div>
                                    }
                                </div>
                                <div className="col-md-3" style={{ textAlign: 'right' }}></div>
                                <div className="col-md-3 tabhead">
                                    {
                                        this.state.nextVisitDateError &&
                                        <div style={{ color: 'red', minWidth: '250px' }}>{this.state.nextVisitDateErrorText}</div>
                                    }
                                </div>
                                <div className="col-md-3" style={{ textAlign: 'right' }}></div>
                                {
                                    this.state.dateError &&
                                    <div className="col-md-4 tabhead" style={{ color: 'red', minWidth: '300px' }}>{this.state.dateErrorText}</div>
                                }
                            </div>
                        </div>
                        <div className="modal-footer" style={{ borderTop: '0', paddingRight: '7%' }}>
                            {
                                this.state.addProviderError &&
                                <div style={{ color: 'red', fontSize: '13px', paddingRight: '10px' }}>Provider could not be added. Please try again later.</div>
                            }
                            <button type="button" className="btn btn-secondary btn-sm" data-dismiss="modal" style={{ backgroundColor: '#ff0076' }} onClick={this.closeModal}>Cancel</button>
                            <button type="button" className="btn btn-primary btn-sm" style={{ backgroundColor: '#371565' }} onClick={this.saveClick}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    initiate_post_provider: state.addProviderReducer.initiate_post_provider,
    initiate_post_provider_complete: state.addProviderReducer.initiate_post_provider_complete,
    initiate_post_provider_error: state.addProviderReducer.initiate_post_provider_error,
    post_provider_data: state.addProviderReducer.post_provider_data,
    post_provider_error_data: state.addProviderReducer.post_provider_error_data,
    fetch_provider_data: state.fetchReducer.fetch_provider_data,

    fetch_provider_put_data: state.fetchReducer.fetch_provider_put_data,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        diplayPageView,
        initiatePostProvider,
        initiateFetchProvider,
        initiatePostProviderReset
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddProviderModal);
