const ListPage = ({ searchResults }) => {
  const results = searchResults.map((song, id) => (
    <article key={id}>
      <h2>{song.name}</h2>
      <p>{song.artist}</p>
      <p>Description: {song.description}</p>
    </article>
  ));

  const content = results?.length ? (
    results
  ) : (
    <article>
      <p>No Matching Songs</p>
    </article>
  );

  return <main>{content}</main>;
};
export default ListPage;
