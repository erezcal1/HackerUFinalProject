import "./about.css";

const AboutPage = () => {
  return (
    <div className="about">
      <div className="image">
        <img
          src="https://images.pexels.com/photos/3693108/pexels-photo-3693108.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="music"
        />
      </div>
      <div className="text">
        <div className="who-are-we">Who are we?</div>
        <h1>Making The World A better Place With Music</h1>
        <p>
          In our platform you can find <strong>Songs, Lyrics, Artist</strong>{" "}
          and even search to find your favorite artist and his songs
        </p>
        <p>
          Our love to music is greater then the love of programmers to
          mechanical keyboards
        </p>
      </div>
    </div>
  );
};
export default AboutPage;
