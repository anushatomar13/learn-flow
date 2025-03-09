import { useState } from "react";

const Dropdown = () => {
  const [selected, setSelected] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
  };

  return (
    <div className="flex flex-col items-center gap-2 p-4">
      <label htmlFor="options" className="text-lg font-medium">
        Select an option:
      </label>
      <select
        id="options"
        value={selected}
        onChange={handleChange}
        className="border rounded p-2"
      >
        <option value="">-- Choose an option --</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
      {selected && <p className="mt-2">You selected: {selected}</p>}
    </div>
  );
};

export default Dropdown;
