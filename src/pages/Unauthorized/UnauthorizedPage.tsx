import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from 'react-router'

export default function UnauthorizedPage() {
    return (
        <div className='h-screen w-screen flex items-center justify-center'>
            <Card>
                <CardContent>
                    <h1>Muri kha</h1>
                    <Button><Link to={"/"}>Home</Link></Button>
                </CardContent>
            </Card>
        </div>

    )
}
