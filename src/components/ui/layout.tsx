import {PropsWithChildren} from 'react'

export default function Layout({children}: PropsWithChildren) {
    return (
        <div className="bg-gradient-to-br from-background to-muted">
            header
            {children}
            footer
        </div>
    )
}