const Layout = ({ children }) => {
    return (
        <div data-theme="mytheme" className=" min-h-screen px-2">
            {children}
        </div>
    )
}

export default Layout;