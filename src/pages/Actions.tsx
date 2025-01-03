import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import UserTable from "@/components/Admin/UserTable";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import FileUpload from "@/service/file-upload";

export default function Actions() {
    return (
        <>
            <PageHeader>
                <PageHeaderHeading>Actions Page</PageHeaderHeading>
            </PageHeader>
            <Card>
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card description.</CardDescription>
                  
                    {/* <FileUpload /> */}
                </CardHeader>
          
            </Card>
            

        </>
    )
}


