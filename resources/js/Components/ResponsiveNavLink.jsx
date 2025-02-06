import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`rounded-md bg-red-500 px-6 py-2 font-semibold uppercase text-white hover:bg-red-400`}
        >
            {children}
        </Link>
    );
}
