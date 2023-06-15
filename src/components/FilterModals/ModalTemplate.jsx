import "./ModalTemplate.css";

function ModalTemplate({ componentId, contentComponent, title }) {
    return (
        <div id={componentId} className="modal-container hidden">
            <div className="modal">
                <div className="modal-header">
                    <h3>{title}</h3>
                </div>
                <div className="modal-content">
                    {contentComponent}
                </div>
                <div className="modal-footer">
                    <button type="button">Close</button>
                </div>
            </div>
        </div>
    )
}

export default ModalTemplate