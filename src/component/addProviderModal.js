import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { diplayPageView } from "../action/actions";

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
            PhysicianType: 'endocrinology',
            PhysicianTypeError: false,
            PhysicianTypeErrorText: '',
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
        this.changePhysicianType = this.changePhysicianType.bind(this);
        this.changePracticeName = this.changePracticeName.bind(this);
        this.clickFax = this.clickFax.bind(this);
        this.clickFirstName = this.clickFirstName.bind(this);
        this.clickPhone = this.clickPhone.bind(this);
        this.clickPhysicianType = this.clickPhysicianType.bind(this);
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
            PhysicianTypeError: false,
            PhysicianTypeErrorText: ''
        })
    }
    changeEmail(event) {
        this.setState({
            email: event.target.value
        })
    }
    changeFax(event) {
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
        this.setState({
            phone: event.target.value
        })
    }
    changePhysicianType(event) {
        this.setState({
            PhysicianType: event.target.value
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
    render() {
        return (
            <div>
                <div className="modal fade show" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-modal="true" style={{ display: 'block', paddingRight: '17px', overflowY: 'scroll' }}>
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
                                    <div className="col-md-8" style={{ textAlign: 'right' }}>* REQUIRED</div>
                                </div>
                                <div className="row textfield">
                                    <div className="col-md-12"><input className="textbox" type="text" name="firstName" onChange={this.changeFirstName} onClick={this.clickFirstName} value={this.state.firstName} /></div>
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
                                        <select className="textbox" style={{ fontSize: '12px', color: '#4e4e4e' }} onChange={this.changePhysicianType} onClick={this.clickPhysicianType} value={this.state.PhysicianType}>
                                            <option value="endocrinology">Endocrinology</option>
                                            <option value="cardiology">Cardiology</option>
                                            <option value="opthalmology">Opthalmology</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row formfields">
                                    <div className="col-md-3 tabhead">Phone</div>
                                    <div className="col-md-3" style={{ textAlign: 'right' }}>* REQUIRED</div>
                                    <div className="col-md-3 tabhead">Fax</div>
                                    <div className="col-md-3" style={{ textAlign: 'right' }}>* REQUIRED</div>
                                </div>
                                <div className="row textfield">
                                    <div className="col-md-6"><input className="textbox" type="text" name="phone" onChange={this.changePhone} onClick={this.clickPhone} value={this.state.phone} /></div>

                                    <div className="col-md-6"><input className="textbox" type="text" name="fax" onChange={this.changeFax} onClick={this.clickFax} value={this.state.fax} /></div>
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
    data: state.data
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        diplayPageView
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddProviderModal);
