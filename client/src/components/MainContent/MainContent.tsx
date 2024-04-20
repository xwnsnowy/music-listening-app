import Header from "@/components/Header/Header";
import ListItem from "@/components/ListItem/ListItem";

const MainContent = () => {
  return (
    <main className="h-full flex-1 overflow-y-auto px-1 py-2">
      <div className="h-full w-full overflow-hidden overflow-y-auto rounded-lg bg-bgBase">
        <Header>
          <div className="mb-2">
            <h1 className="font-circular text-3xl font-semibold text-primaryColor">
              Welcome Back !
            </h1>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 text-primaryColor sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            <ListItem
              image="/images/liked.png"
              name="Liked Song"
              href="liked"
            />
          </div>
        </Header>
        <div className="mb-7 mt-2 px-6 font-circular text-2xl font-semibold text-primaryColor">
          <h1>Newest Songs</h1>
        </div>
        <div className="text-primaryColor">List of Songs</div>
      </div>
    </main>
  );
};

export default MainContent;
