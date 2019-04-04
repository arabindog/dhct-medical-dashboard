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
        this.changepracticeName = this.changepracticeName.bind(this);
        this.clickFax = this.clickFax.bind(this);
        this.clickFirstName = this.clickFirstName.bind(this);
        this.clickPhone = this.clickPhone.bind(this);
        this.clickPhysicianType = this.clickPhysicianType.bind(this);
        this.saveClick = this.saveClick.bind(this);
        this.lastDateVisitedClick = this.lastDateVisitedClick.bind(this);
        this.nextVisitDateClick = this.nextVisitDateClick.bind(this);
        this.clickLastName = this.clickLastName.bind(this);
        this.clickpracticeName = this.clickpracticeName.bind(this);
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

    clickpracticeName() {
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
                physicianTypeErrorText: 'Physician Type cannot be blank.'
            })
            validationStatus = false
        }
        if (this.state.firstName.trim() === '') {
            this.setState({
                firstNameError: true,
                firstNameErrorText: 'First Name cannot be blank.'
            })
            validationStatus = false
        }
        if (this.state.lastName.trim() === '') {
            this.setState({
                lastNameError: true,
                lastNameErrorText: 'Last Name cannot be blank.'
            })
            validationStatus = false
        }
        if (this.state.practiceName.trim() === '') {
            this.setState({
                practiceNameError: true,
                practiceNameErrorText: 'Practice Name cannot be blank.'
            })
            validationStatus = false
        }
        // if (this.state.lastDateVisited === '') {
        //     this.setState({
        //         lastVisitedDateError: true,
        //         lastVisitedDateErrorText: 'Last date visited cannot be blank.'
        //     })
        //     validationStatus = false
        // }
        // if (this.state.nextVisitDate === '') {
        //     this.setState({
        //         nextVisitDateError: true,
        //         nextVisitDateErrorText: 'Next visit date cannot be blank.'
        //     })
        //     validationStatus = false
        // }
        if (this.state.lastDateVisited > this.state.currentDate && this.state.lastDateVisited !== '') {
            this.setState({
                lastVisitedDateError: true,
                lastVisitedDateErrorText: 'Last visited date cannot be a future date.'
            })
            validationStatus = false
        }
        if (this.state.nextVisitDate < this.state.currentDate && this.state.nextVisitDate !== '') {
            this.setState({
                nextVisitDateError: true,
                nextVisitDateErrorText: 'Next visit date cannot be a previous date.'
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
            provider_npi_dhct_number: this.props.fetch_provider_put_data.data.provider_npi_dhct_number,
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
            physicianTypeError: false,
            physicianTypeErrorText: ''
        })
    }

    changeEmail(event) {
        this.setState({
            emailError: false,
            emailErrorText: '',
            email: event.target.value
        })
    }

    changeFax(event) {
        const x = event.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        event.target.value = !x[2] ? x[1] : `(${x[1]}) ${x[2]}${x[3] ? `-${x[3]}` : ''}`;
        this.setState({
            faxError: false,
            faxErrorText: '',
            fax: event.target.value
        })
    }

    changeFirstName(event) {
        this.setState({
            firstNameError: false,
            firstNameErrorText: '',
            firstName: event.target.value
        })
    }

    changeLastName(event) {
        this.setState({
            lastNameError: false,
            lastNameErrorText: '',
            lastName: event.target.value
        })
    }

    changeLastVisitedDate(event) {
        this.setState({
            lastVisitedDateError: false,
            lastVisitedDateErrorText: '',
            lastDateVisited: event.target.value
        })
    }

    changeNextVisitDate(event) {
        this.setState({
            nextVisitDateError: false,
            nextVisitDateErrorText: '',
            nextVisitDate: event.target.value
        })
    }

    changePhone(event) {
        const x = event.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        event.target.value = !x[2] ? x[1] : `(${x[1]}) ${x[2]}${x[3] ? `-${x[3]}` : ''}`;
        this.setState({
            phoneError: false,
            phoneErrorText: '',
            phone: event.target.value
        })
    }

    changePhysicianType(event) {
        this.setState({
            physicianTypeError: false,
            physicianTypeErrorText: '',
            physicianType: event.target.value
        })
    }

    changepracticeName(event) {
        this.setState({
            practiceNameError: false,
            practiceNameErrorText: '',
            practiceName: event.target.value
        })
    }

    closeModal() {
        this.props.initiateFetchProvider();
        this.props.diplayPageView('')
    }

    render() {
        return (
            <div className="modal " id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-modal="true" style={{ display: 'block', paddingRight: '17px', backgroundColor: '#000000b5', overflowY: 'scroll' }}>
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header ">
                            <div className="modal-title text-center" id="exampleModalLongTitle" style={{ fontSize: '18px', fontWeight: '100', color: '#7d7d7d' }}>ADD A PROVIDER</div>
                            <button type="button" className="close " data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className="pl-5 pr-5">
                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <label htmlFor="firstname"><b>First Name</b></label>
                                        <input type="text" className="form-control" id="firstname" onChange={this.changeFirstName} onClick={this.clickFirstName} value={this.state.firstName} />
                                        {
                                            this.state.firstNameError &&
                                            <div className="col-md-4 tabhead" style={{ color: 'red', minWidth: '250px', padding: '0px' }}>{this.state.firstNameErrorText}</div>
                                        }
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="lastname"><b>Last Name</b></label>
                                        <input type="text" className="form-control" id="lastname" onClick={this.clickLastName} onChange={this.changeLastName} value={this.state.lastName} />
                                        {
                                            this.state.lastNameError &&
                                            <div className="col-md-4 tabhead" style={{ color: 'red', minWidth: '250px', padding: '0px' }}>{this.state.lastNameErrorText}</div>
                                        }
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="practicename"><b>Practice Name</b></label>
                                        <input type="text" className="form-control" id="practicename" onClick={this.clickpracticeName} onChange={this.changepracticeName} value={this.state.practiceName} />
                                        {
                                            this.state.practiceNameError &&
                                            <div className="col-md-4 tabhead" style={{ color: 'red', minWidth: '250px', padding: '0px' }}>{this.state.practiceNameErrorText}</div>
                                        }
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="physicianstype"><b>Physician Type</b></label>
                                        <select id="physicianstype" className="form-control" onChange={this.changePhysicianType} onClick={this.clickPhysicianType} value={this.state.physicianType}>
                                            <option value="">Please select a physician type</option>
                                            <option value="Endocrinology">Endocrinology</option>
                                            <option value="Cardiology">Cardiology</option>
                                            <option value="Opthalmology">Opthalmology</option>
                                        </select>

                                        {
                                            this.state.physicianTypeError &&
                                            <div className="col-md-3 tabhead" style={{ color: 'red', minWidth: '250px', padding: '0px' }}>{this.state.physicianTypeErrorText}</div>
                                        }
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="phone"><b>Phone</b></label>
                                        <input type="text" className="form-control" id="phone" onChange={this.changePhone} onClick={this.clickPhone} value={this.state.phone} maxLength='15' />

                                        {
                                            this.state.phoneError &&
                                            <div className="tabhead" style={{ color: 'red', minWidth: '250px' }}>{this.state.phoneErrorText}</div>
                                        }
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="fax"><b>Fax</b></label>
                                        <input type="text" className="form-control" id="fax" onChange={this.changeFax} onClick={this.clickFax} value={this.state.fax} maxLength='15' />

                                        {
                                            this.state.faxError &&
                                            <div className="tabhead" style={{ color: 'red', minWidth: '250px' }}>{this.state.faxErrorText}</div>
                                        }
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="email"><b>Email</b></label>
                                        <input type="email" className="form-control" id="email" onClick={this.emailClick} onChange={this.changeEmail} value={this.state.email} />
                                        {
                                            this.state.emailError &&
                                            <div className="col-md-4 tabhead" style={{ color: 'red', minWidth: '250px', padding: '0px' }}>{this.state.emailErrorText}</div>
                                        }
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="lastdate"><b>Approximate date last visited</b></label>
                                        <input type="date" className="form-control" id="lastdate" onChange={this.changeLastVisitedDate} value={this.state.lastDateVisited} onClick={this.lastDateVisitedClick} />
                                        {
                                            this.state.lastVisitedDateError &&
                                            <div className="tabhead" style={{ color: 'red', minWidth: '250px' }}>{this.state.lastVisitedDateErrorText}</div>
                                        }
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="nextdate"><b>Approximate next visit date</b></label>
                                        <input type="date" className="form-control" id="nextdate" onChange={this.changeNextVisitDate} value={this.state.nextVisitDate} onClick={this.nextVisitDateClick} />
                                        {
                                            this.state.nextVisitDateError &&
                                            <div className="tabhead" style={{ color: 'red', minWidth: '250px' }}>{this.state.nextVisitDateErrorText}</div>
                                        }
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer" style={{ borderTop: '0', paddingRight: '7%' }}>
                            {
                                this.state.addProviderError &&
                                <div style={{ color: 'red', fontSize: '13px', paddingRight: '10px' }}>Provider could not be added. Please try again later.</div>
                            }
                            <button type="button" className="btn btn btn-primary " data-dismiss="modal" onClick={this.closeModal}>Cancel</button>
                            <button type="button" className="btn btn-secondary" onClick={this.saveClick}>Save</button>
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
