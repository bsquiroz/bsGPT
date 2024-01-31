import { NavLink } from "react-router-dom";

interface Props {
  to: string;
  icon: string;
  title: string;
  description: string;
}

export const SidebarMenuItem = ({ description, icon, title, to }: Props) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "flex justify-center items-center bg-gray-800 rounded-md p-2 transition-colors"
          : "flex justify-center items-center hover:bg-gray-800 rounded-md p-2 transition-colors"
      }
    >
      <i className={`text-2xl mr-4 text-indigo-400 ${icon}`}></i>
      <div className="flex flex-col flex-grow">
        <span className="text-white text-lg font-semibold">{title}</span>
        <span className="text-gray-400 text-xs">{description}</span>
      </div>
    </NavLink>
  );
};
