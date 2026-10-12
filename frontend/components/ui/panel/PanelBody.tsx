import PanelBodyRightContainer from "./PanelBodyRightContainer/PanelBodyRightContainer";
import PanelBodyLeftContainer from "./PanelBodyLeftContainer/PanelBodyLeftContainer";

const PanelBody = () => {
  return (
    <div className="flex justify-between gap-8 w-full max-md:flex-wrap">
      <PanelBodyRightContainer />
      <PanelBodyLeftContainer />
    </div>
  );
};

export default PanelBody;
