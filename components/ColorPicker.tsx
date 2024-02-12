import React, { useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";

const ColorVariant = ({
  variantIndex,
  formData,
  setFormData,
  handleRemoveVariant,
}: any) => {
  const { color, colorCode } = formData.variant[variantIndex];
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleColorNameChange = (event: any) => {
    const updatedVariants = [...formData.variant];
    updatedVariants[variantIndex] = {
      ...updatedVariants[variantIndex],
      color: event.target.value,
    };
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      variant: updatedVariants,
    }));
  };

  const handleColorChange = (newColor: any) => {
    const updatedVariants = [...formData.variant];
    updatedVariants[variantIndex] = {
      ...updatedVariants[variantIndex],
      colorCode: newColor,
    };
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      variant: updatedVariants,
    }));
  };

  const handleToggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  return (
    <div className="flex gap-2 items-center mt-1 flex-wrap" key={variantIndex}>
      {/* Color name input */}
      <div className="flex items-center w-max">
        <div className="border border-gray-400 bg-gray-100 rounded-sm p-[10px] text-sm text-gray-500 font-medium">
          Color
        </div>
        <input
          className="rounded-e-lg p-2 border border-gray-400 focus:outline-none text-gray-500"
          name="color"
          type="text"
          required
          placeholder="Enter Color Name"
          value={formData.variant[variantIndex].color}
          onChange={(event) => handleColorNameChange(event)}
        />
      </div>

      {/* Color code input */}
      <div className="w-max rounded-md flex items-center border border-gray-300 p-2 gap-1 relative">
        <button
          type="button"
          className="w-6 h-6 rounded-full border border-gray-300"
          style={{ backgroundColor: colorCode }}
          onClick={handleToggleColorPicker}
        />
        <HexColorInput
          color={colorCode}
          onChange={handleColorChange}
          prefixed
          className="bg-transparent outline-none w-[80px]"
        />
        {showColorPicker && (
          <div className="absolute top-full mt-3 z-50">
            {/* Your color picker component here */}
            <HexColorPicker color={colorCode} onChange={handleColorChange} />
          </div>
        )}
      </div>

      {/* Remove button */}
      {variantIndex !== 0 && (
        <button
          type="button"
          className="w-5 h-5 rounded-full border border-sky-400 text-sky-400 flex justify-center items-center"
          onClick={() => handleRemoveVariant(variantIndex)}
        >
          -
        </button>
      )}
    </div>
  );
};

export default ColorVariant;

// import useToggle from "@/hooks/useToogle";
// import { useState } from "react";
// import { HexColorPicker, HexColorInput } from "react-colorful";

// function ColorPicker() {
//   const {
//     node,
//     toggle: showColorPicker,
//     setToggle: setShowColorPicker,
//   } = useToggle();

//   const [color, setColor] = useState("#820000");

//   return (
//     <div ref={node} className="inline relative">
//       <div className="inline-flex items-center gap-3 p-2 rounded-r-md border border-gray-400">
//         <button
//           type="button"
//           className="w-6 h-6 rounded-full"
//           style={{ backgroundColor: color }}
//           onClick={() => setShowColorPicker(!showColorPicker)}
//         ></button>

//         <HexColorInput
//           color={color}
//           onChange={setColor}
//           prefixed
//           className="bg-transparent outline-none w-[80px]"
//         />
//       </div>
//       {showColorPicker && (
//         <div className="absolute mt-3">
//           <HexColorPicker color={color} onChange={setColor} />
//         </div>
//       )}
//     </div>
//   );
// }

// export default ColorPicker;
