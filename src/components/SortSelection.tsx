import React, { useState } from "react";
import { Selection, SelectItem } from "./Selection";

interface SortSelctionProps {
  sortOrder: string;
  onSortChange: (order: string) => void;
}
const SortSelction: React.FC<SortSelctionProps> = ({
  sortOrder,
  onSortChange,
}) => {
  const options: SelectItem[] = [
    { label: "Ascending", value: "asc" },
    { label: "Descanding", value: "desc" },
  ];
  const [selcted, setSelected] = useState<SelectItem>(
    options.find((ele) => ele.value === sortOrder) ?? options[0]
  );

  const handleSelctionChange = (item: SelectItem) => {
    const val: SelectItem =
      options.find((ele) => ele.value === item.value) ?? options[0];
    setSelected(val);
    onSortChange(item.value);
  };
  return (
    <Selection
      value={selcted}
      options={options}
      onChange={handleSelctionChange}
      className="border p-2 mb-4 w-fit"
    />
  );
};

export default SortSelction;
