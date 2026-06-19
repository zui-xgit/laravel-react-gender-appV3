// import {
//     AlertDialog,
//     AlertDialogAction,
//     AlertDialogCancel,
//     AlertDialogContent,
//     AlertDialogDescription,
//     AlertDialogFooter,
//     AlertDialogHeader,
//     AlertDialogTitle,
// } from '@/components/ui/alert-dialog';

// interface ConfirmationDialogProps {
//     isOpen: boolean;
//     onClose: () => void;
//     onConfirm: () => void;
//     title?: string;
//     description?: string;
//     confirmText?: string;
//     cancelText?: string;
//     variant?: 'default' | 'destructive' | 'success';
// }

// export default function ConfirmationDialog({
//     isOpen,
//     onClose,
//     onConfirm,
//     title = 'Are you absolutely sure?',
//     description = 'This action cannot be undone.',
//     confirmText = 'Confirm',
//     cancelText = 'Cancel',
//     variant = 'default',
// }: ConfirmationDialogProps) {
//     const buttonVariants = {
//         default: 'bg-primary hover:bg-primary/90 text-primary-foreground',
//         destructive:
//             'bg-destructive hover:bg-destructive/90 text-destructive-foreground',
//         success: 'bg-emerald-600 hover:bg-emerald-700 text-white',
//     };

//     return (
//         <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
//             <AlertDialogContent>
//                 <AlertDialogHeader>
//                     <AlertDialogTitle className="tracking-tight">
//                         {title}
//                     </AlertDialogTitle>
//                     <AlertDialogDescription className="text-sm text-muted-foreground">
//                         {description}
//                     </AlertDialogDescription>
//                 </AlertDialogHeader>
//                 <AlertDialogFooter>
//                     <AlertDialogCancel onClick={onClose}>
//                         {cancelText}
//                     </AlertDialogCancel>
//                     <AlertDialogAction
//                         onClick={onConfirm}
//                         className={buttonVariants[variant]}
//                     >
//                         {confirmText}
//                     </AlertDialogAction>
//                 </AlertDialogFooter>
//             </AlertDialogContent>
//         </AlertDialog>
//     );
// }

import { AlertTriangle, CheckCircle2, HelpCircle } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Spinner } from '../ui/spinner';

interface ConfirmationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'default' | 'destructive' | 'success';
}

export default function ConfirmationDialog({
    isOpen,
    onClose,
    onConfirm,
    title = 'Are you absolutely sure?',
    description = 'This action cannot be undone.',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'default',
}: ConfirmationDialogProps) {
    // 1. Map container layout configs based on the variant
    const variantConfigs = {
        default: {
            border: 'border-border',
            titleText: 'text-foreground',
            iconBg: 'bg-primary/10 text-primary',
            icon: <HelpCircle className="h-5 w-5" />,
            btn: 'bg-primary hover:bg-primary/90 text-primary-foreground focus:ring-primary',
        },
        destructive: {
            border: 'border-destructive/20',
            titleText: 'text-destructive',
            iconBg: 'bg-destructive/10 text-destructive animate-pulse',
            icon: <AlertTriangle className="h-5 w-5" />,
            btn: 'bg-destructive! hover:bg-destructive/90 text-destructive-foreground focus:ring-destructive',
        },
        success: {
            border: 'border-emerald-500/20',
            titleText: 'text-emerald-600 dark:text-emerald-500',
            iconBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-500',
            icon: <CheckCircle2 className="h-5 w-5" />,
            btn: 'bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-600',
        },
    };

    const currentStyle = variantConfigs[variant];

    return (
        <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            {/* The border color dynamically switches here */}
            <AlertDialogContent
                className={`max-w-md shadow-xl ${currentStyle.border}`}
            >
                <AlertDialogHeader>
                    {/* The title color dynamically switches here */}
                    <AlertDialogTitle
                        className={`flex items-center gap-2.5 text-xl font-semibold tracking-tight ${currentStyle.titleText}`}
                    >
                        {/* The wrapper ring background and matching icon adapt dynamically */}
                        <div
                            className={`rounded-full p-1.5 ${currentStyle.iconBg}`}
                        >
                            {currentStyle.icon}
                        </div>
                        {title}
                    </AlertDialogTitle>
                    <AlertDialogDescription className="pt-1 text-sm text-muted-foreground">
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={onClose}
                        className="cursor-pointer"
                    >
                        {cancelText}
                    </AlertDialogCancel>
                    {/* The action button style dynamically switches here */}
                    <AlertDialogAction
                        onClick={onConfirm}
                        className={`${currentStyle.btn} cursor-pointer`}
                    >
                        {confirmText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
