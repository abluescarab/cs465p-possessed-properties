import "./SearchBar.scss";
import Card from "@/components/Card/Card.tsx";
import CardContent from "@/components/Card/CardContent.tsx";

const SearchBar = () => {
  return (
    <Card>
      <CardContent>
        <form className={"search"}>
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
