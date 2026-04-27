import { Portal } from '@headlessui/react';
import { PuffLoader } from 'react-spinners';

export const PortalLoader = () => {
    return (
        <Portal>
            <div className="fixed inset-0 z-100 flex items-center justify-center bg-gray-900/30 backdrop-blur-xs">
                <PuffLoader size={100} loading={true} color="#2563eb" />
            </div>
        </Portal>
    );
};
