'use client';

interface SegmentedToggleProps<T extends string> {
    label: string;
    options: { value: T; label: string; icon?: React.ReactNode }[];
    value: T;
    onChange: (value: T) => void;
}

export default function SegmentedToggle<T extends string>({
    label,
    options,
    value,
    onChange,
}: SegmentedToggleProps<T>) {
    return (
        <div className="flex flex-col gap-2">
            <span className="mono-header text-xs">[{label}]</span>
            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.min(options.length, 4)}, 1fr)` }}>
                {options.map((option) => (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => onChange(option.value)}
                        className={`toggle-segment ${value === option.value ? 'active' : ''}`}
                    >
                        {option.icon && <span className="mr-1.5">{option.icon}</span>}
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
