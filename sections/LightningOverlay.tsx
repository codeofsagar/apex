import './lightning.css';

export default function LightningOverlay() {
    return (
        <div className="ag-format-container">
            {/* Multiple lightning elements for randomness, no sparks */}
            <div className="ag-lightning-1"></div>
            <div className="ag-lightning-2"></div>
            <div className="ag-lightning-3"></div>
            <div className="ag-lightning-4"></div>
            <div className="ag-lightning-5"></div>
            <div className="ag-flash"></div>
        </div>
    );
}
