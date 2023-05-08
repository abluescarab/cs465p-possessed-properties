import "./index.scss";
import Card from "@/components/Card";
import CardContent from "@/components/Card/CardContent.tsx";

const SearchBar = () => {
  return (
    <Card className={"search"}>
      <CardContent>
        <form>
          <input type={"text"} name={"search"} placeholder={"Search..."} />
          <button type={"submit"}>
            <span className={"material-symbols-rounded"}>search</span>
          </button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SearchBar;
