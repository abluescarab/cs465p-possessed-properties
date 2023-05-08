import "./Navigation.scss";
import Card from "@/components/Card/Card.tsx";
import CardContent from "@/components/Card/CardContent.tsx";

const SearchBar = () => {
  return (
    <Card className={"search"}>
      <CardContent>
        <form>
          <input
            type={"text"}
            name={"search"}
            placeholder={"Search for listings..."}
          />
          <button type={"submit"}>
            <span className={"material-symbols-rounded dark"}>search</span>
          </button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SearchBar;
