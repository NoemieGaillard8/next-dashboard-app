import Table from '@/app/ui/customers/table';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { fetchCustomers } from '@/app/lib/data';
import { FormattedCustomersTable } from '@/app/lib/definitions';

export const metadata: Metadata = {
    title: 'Customers',
}


// handle customers list

export default async function CustomersPage() {
    const rawCustomers = await fetchCustomers();
    const formattedCustomers: FormattedCustomersTable[] = rawCustomers.map(c => ({
        id: c.id,
        name: c.name,
        email: c.email ?? 'No email', // Valeur par défaut
        image_url: c.image_url || '/default-avatar.png', // Image par défaut
        total_invoices: c.total_invoices ?? 0,
        total_pending: c.total_pending ?? 0,
        total_paid: c.total_paid ?? 0,
      }));

    return (
        <div className="w-full">
            <Suspense fallback={<InvoicesTableSkeleton />}>
                <Table customers={formattedCustomers} />
            </Suspense>
        </div>
    );
}
