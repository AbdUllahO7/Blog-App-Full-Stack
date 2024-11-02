import React, { useEffect, useState } from 'react';

function NavItemDown({ children, title, name, icon, activeNavName, setActiveNavName }) {

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (activeNavName !== name) {
      setIsChecked(false);
    }
  }, [activeNavName, name]);

  const handleCheckboxChange = () => {
    if (isChecked) {
      setActiveNavName(''); // Close the dropdown if already active
    } else {
      setActiveNavName(name); // Open the dropdown
    }
    setIsChecked(!isChecked);
  };

  return (
    <div className="d-collapse  bg-base-200 min-h-0 rounded-none py-2">
      <input
        type="checkbox"
        className="min-h-0 py-0"
        checked={name === activeNavName}
        onChange={handleCheckboxChange}
      />
      <div
        className={`d-collapse-title font-medium min-h-0 py-0 pl-0 flex items-center gap-x-2 text-lg ${
          name === activeNavName ? 'font-bold text-primary' : 'font-semibold text-[#a5a5a5]'
        }`}
      >
        {icon}
        {title}
      </div>
      <div className="d-collapse-content">
        <div className="mt-2 flex flex-col gap-y-2">
          {children}
        </div>
      </div>
    </div>
  );
}

export default NavItemDown;
