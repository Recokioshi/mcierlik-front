import { Results } from "../api/star-wars";

function StarWars({ data }: { data: Results[]}) {
  //create component for each character
  const rows = data.map((item, index) => {
    return (
      <div key={index}>
        <h3>{item.name}</h3>
        <p>{item.height}</p>
        <p>{item.mass}</p>
        <p>{item.hair_color}</p>
        <p>{item.gender}</p>
      </div>
    )
  });

  
  return (
    <div>
      <h1>Star Wars</h1>
      <div>
        {rows}
      </div>
    </div>
  );
}

// This gets called on every request
export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:3000/api/star-wars`);
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}

export default StarWars