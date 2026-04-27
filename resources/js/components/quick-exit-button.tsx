// custom

import { useStepperFormStore } from '@/hooks/store/use-stepper-form-store';
import { ShieldAlert } from 'lucide-react';

const QuickExitButton = () => {
    const resetForm = useStepperFormStore((state) => state.resetForm);

    const handleQuickExit = () => {
        resetForm();
        window.location.replace(
            'https://www.google.com/search?q=current+weather',
        );
    };
    return (
        <button
            onClick={handleQuickExit}
            className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-[#ef4444] px-5 py-2.5 text-[10px] font-black tracking-widest text-[#f8fafc] shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all hover:bg-[#f8fafc] hover:text-[#020617] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] active:scale-95"
        >
            <div className="absolute inset-0 bg-[#f8fafc]/10 transition-colors group-hover:bg-transparent" />
            <ShieldAlert
                size={14}
                className="relative z-10 animate-pulse text-[#f8fafc] group-hover:text-[#ef4444]"
            />
            <span className="relative z-10">QUICK EXIT</span>
        </button>
    );
};

export default QuickExitButton;
