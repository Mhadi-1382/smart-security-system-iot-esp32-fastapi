import PanelHeader from "@/components/ui/panel/PanelHeader";
import PanelBody from "@/components/ui/panel/PanelBody";

export const metadata = {
  title: "پنل مدیریت",
};

const panel = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-7 w-full">
        <PanelHeader />
        <PanelBody />
      </div>
    </div>
  );
};

export default panel;
