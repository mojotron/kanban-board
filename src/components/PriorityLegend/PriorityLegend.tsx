import './PriorityLegend.css';

const PriorityLegend = () => {
  return (
    <div className="PriorityLegend">
      <h4 className="PriorityLegend__heading">Priority</h4>
      <div className="PriorityLegend__wrapper">
        <span>low</span>
        <span className="PriorityLegend__mark priority--low"></span>
        <span>high</span>
        <span className="PriorityLegend__mark priority--high"></span>
        <span>very high</span>
        <span className="PriorityLegend__mark priority--very-high"></span>
      </div>
    </div>
  );
};

export default PriorityLegend;
