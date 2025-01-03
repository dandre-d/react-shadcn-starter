import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import UserTable from "@/components/Admin/UserTable";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ManageUser() {
    return (
        <>
            <PageHeader>
                <PageHeaderHeading>Manage MOnKEY </PageHeaderHeading>
            </PageHeader>
            <Card>
                <CardHeader>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Update and add Users to access the banana app.</CardDescription>
                    <UserTable>

                    </UserTable>
                </CardHeader>
          
            </Card>
            

        </>
    )
}


