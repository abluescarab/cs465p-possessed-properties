import "./Sidebar.scss";
import { ComponentBaseProps } from "@/components/ComponentBase.tsx";
import { ListingType } from "../../../types.ts";

interface SidebarProps extends ComponentBaseProps {
  listings: ListingType[];
}

const Sidebar = ({ id = "", className = "" }) => {
  return (
    <>
      <aside className={"sidebar"}></aside>
    </>
  );
};

export default Sidebar;
