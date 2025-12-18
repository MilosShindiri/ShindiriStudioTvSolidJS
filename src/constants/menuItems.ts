const menuItems: MenuItem[] = [
  { label: "Home", path: "/" },
  { label: "Movies", path: "/movies" },
];

export default menuItems;

export type MenuItem = {
  label: string;
  path: string;
};
