interface DropdownListProps {
    options: string[];
    onSelect: (option: string) => void;
}

export default function DropdownList({ options, onSelect }: DropdownListProps) {
    return (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 max-h-60 overflow-y-auto">
            {options.map((option, index) => (
                <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => onSelect(option)}
                >
                    {option}
                </li>
            ))}
        </ul>
    );
}