import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { diplayPageView } from "../action/actions";

class DeleteProviderModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.closeModal = this.closeModal.bind(this);
        this.confirmDeleteProvider = this.confirmDeleteProvider.bind(this)
            ;
    }
    closeModal() {
        this.props.diplayPageView('')
    }
    confirmDeleteProvider() {
        this.props.diplayPageView('')
    }
    render() {
        return (
            <div>
                <div className="modal fade show" id="deleteRecord" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" aria-modal="true" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header custom-modal-header" style={{ paddingBottom: '0' }}>
                                <div className="modal-title" id="exampleModalLongTitle" style={{ fontSize: '18px', fontWeight: '100', color: '#7d7d7d' }}>DELETE PROVIDER</div>
                                <button type="button" className="close custom-modal-close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body" style={{ textAlign: 'center', fontSize: 'larger', color: 'currentColor' }}>
                                Sure you want to delete this record ?
                            </div>
                            <div className="modal-footer" style={{ borderTop: '0', paddingRight: '7%' }}>
                                <button type="button" className="btn btn-secondary btn-sm" data-dismiss="modal" style={{ backgroundColor: '#ff0076' }} onClick={this.closeModal}>Cancel</button>
                                <button type="button" className="btn btn-primary btn-sm" style={{ backgroundColor: '#371565' }} onClick={this.confirmDeleteProvider}>Yes</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(DeleteProviderModal);
