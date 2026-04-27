interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    error?: string;
    options: { value: string; label: string }[];
    spanFull?: boolean;
}

// export const FormSelect: React.FC<FormSelectProps> = ({ label, error, options, spanFull, ...props }) => {
//     return (
//         <div className={`min-w-0 ${spanFull ? 'md:col-span-2' : 'md:col-span-1'}`}>
//             <label className="text-secondary mb-2 block text-[10px] font-black tracking-widest uppercase" htmlFor={props.id}>
//                 {label}
//             </label>
//             <select
//                 {...props}
//                 id={props.id}
//                 className={`bg-input text-primary w-full min-w-0 cursor-pointer appearance-none rounded-xl border px-4 py-2.5 text-sm transition-all focus:outline-none ${
//                     error
//                         ? 'border-red-500 ring-2 ring-red-500/20'
//                         : 'border-subtle focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/20'
//                 }`}
//             >
//                 <option value="" disabled hidden className="bg-input text-primary">
//                     Please select
//                 </option>
//                 {options.map((option) => (
//                     <option key={option.value} value={option.value} className="bg-input text-primary">
//                         {option.label}
//                     </option>
//                 ))}
//             </select>
//             {error && <p className="mt-2 text-[10px] font-black tracking-widest text-red-500 uppercase">{error}</p>}
//         </div>
//     );
// };

export const FormSelect: React.FC<FormSelectProps> = ({
    label,
    error,
    options,
    spanFull,
    ...props
}) => {
    return (
        <div
            className={`min-w-0 ${spanFull ? 'md:col-span-2' : 'md:col-span-1'}`}
        >
            <label
                className="mb-2 block text-[10px] font-black tracking-widest text-secondary uppercase"
                htmlFor={props.id}
            >
                {label}
            </label>
            <select
                {...props}
                id={props.id}
                className={`w-full min-w-0 cursor-pointer appearance-none rounded-xl border bg-input px-4 py-2.5 text-sm text-primary transition-all focus:outline-none ${
                    error
                        ? 'border-red-500 ring-2 ring-red-500/20'
                        : 'border-subtle focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/20'
                }`}
            >
                <option
                    value=""
                    disabled
                    hidden
                    className="bg-input text-primary"
                >
                    Please select
                </option>
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                        className="bg-surface text-primary"
                    >
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <p className="mt-2 text-[10px] font-black tracking-widest text-red-500 uppercase">
                    {error}
                </p>
            )}
        </div>
    );
};
