'use client';

import { useTranslations } from 'next-intl';

export default function Index() {
    const t = useTranslations('Index');
    return <p>Not found</p>;
}
