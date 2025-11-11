const MainContent = ({ children }) => {
    return (
        <main
            className="flex-grow-1 p-4"
            style={{ minHeight: "100vh" }}
        >
            {children}
        </main>
    );
};

export default MainContent;
