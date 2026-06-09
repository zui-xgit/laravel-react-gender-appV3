const Suspended = () => {
    return (
        <>
            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
                <div className="rounded bg-white p-8 text-center shadow-md">
                    <h1 className="mb-4 text-2xl font-bold">
                        Account Suspended
                    </h1>
                    <p className="text-gray-600">
                        Your account has been suspended. Please contact support
                        for assistance.
                    </p>
                </div>
            </div>
        </>
    );
};

export default Suspended;
