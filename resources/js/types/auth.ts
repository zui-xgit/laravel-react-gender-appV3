export type User = {
    uuid: string;
    username: string;
    first_name: string;
    last_name: string;
    full_name: string;
    email: string;
    phone: string;
    gender: 'male' | 'female';
    roles: string[];
    permissions: string[];
    [key: string]: unknown;
};

export type Auth = {
    user: User;
};

export type TwoFactorSetupData = {
    svg: string;
    url: string;
};

export type TwoFactorSecretKey = {
    secretKey: string;
};
