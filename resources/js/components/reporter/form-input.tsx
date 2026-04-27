interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    spanFull?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({ label, error, spanFull, ...props }) => {
    return (
        <div className={`min-w-0 ${spanFull ? 'md:col-span-2' : 'md:col-span-1'}`}>
            <label className="text-secondary mb-2 block text-[10px] font-black tracking-widest uppercase">{label}</label>

            <input
                {...props}
                className={`bg-input text-primary focus:bg-surface w-full min-w-0 rounded-xl border px-4 py-2.5 text-sm transition-all focus:outline-none ${
                    error
                        ? 'border-red-500 ring-2 ring-red-500/20'
                        : 'border-subtle focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/20'
                }`}
            />

            {error && <p className="mt-2 text-[10px] font-black tracking-widest text-red-500 uppercase">{error}</p>}
        </div>
    );
};
