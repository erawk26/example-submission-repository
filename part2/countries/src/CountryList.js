import Country from "./Country";
const List = ({ items, handleToUpdate }) => {
  const key =
    items.length === 0
      ? "empty"
      : items.length > 10
      ? "max"
      : items.length > 1
      ? "list"
      : "single";
  const template = {
    empty: <p>No Matches.</p>,
    max: <p>Too Many Matches.</p>,
    list: (
      <ul>
        {items.map((item) => (
          <Country
            key={item.name}
            item={item}
            size="teaser"
            handleToUpdate={handleToUpdate}
          />
        ))}
      </ul>
    ),
    single: <Country item={items[0]} size="full" />,
  };
  return template[key];
};
export default List;
