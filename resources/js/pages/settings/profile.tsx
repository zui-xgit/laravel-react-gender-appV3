import { Form, Head, Link, useForm, usePage } from '@inertiajs/react';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import profile, { edit } from '@/routes/profile';
import { UsePageProps } from '@/types/types';
import { Spinner } from '@/components/ui/spinner';

export default function Profile({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail?: boolean;
    status?: string;
}) {
    const { auth } = usePage<UsePageProps>().props;

    const { data, setData, patch, processing, errors, reset } = useForm({
        username: auth.user.username,
        email: auth.user.email,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(profile.update().url);
    };

    return (
        <>
            <Head title="Profile settings" />
            <h1 className="tborder sr-only">Profile settings</h1>

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Profile information"
                    description="Update your name and email address"
                />

                <form onSubmit={submit} className="space-y-6">
                    {/* Username Field */}
                    <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>

                        <Input
                            id="username"
                            type="text"
                            className="mt-1 block w-full"
                            name="user_name"
                            value={data.username}
                            onChange={(e) =>
                                setData('username', e.target.value)
                            }
                            required
                        />

                        <InputError
                            className="mt-2"
                            message={errors.username}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>

                        <Input
                            id="email"
                            type="text"
                            className="mt-1 block w-full"
                            name="user_name"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />

                        <InputError className="mt-2" message={errors.email} />
                    </div>

                    {/* Submit Actions */}
                    <div className="flex items-center gap-4">
                        <Button
                            type="submit"
                            disabled={processing}
                            data-test="update-profile-button"
                            className="cursor-pointer"
                        >
                            {processing && <Spinner className="text-white" />}
                            Update
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

Profile.layout = {
    breadcrumbs: [
        {
            title: 'Profile settings',
            href: edit(),
        },
    ],
};
